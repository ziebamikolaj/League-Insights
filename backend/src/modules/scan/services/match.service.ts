import { forwardRef, Inject, Injectable, Logger } from "@nestjs/common";
import Bottleneck from "bottleneck";
import { inArray } from "drizzle-orm";
import { matchesTable, matchPlayersTable } from "src/db/schema";
import { ApiService } from "./api.service";
import { DbService } from "src/db/db.service";
import { transformMatchData } from "src/common/utils/transform-match";
import { transformParticipantData } from "src/common/utils/transform-participant";
import { PlayerService } from "./player.service";
import { ChampionStatsService } from "./champion-stats.service";
import { ItemStatsService } from "./item-stats.service";
import { ParticipantDto } from "src/common/types/participant.dto";
import {
  formatError,
  ErrorMessages,
} from "src/common/constants/error-messages";
import {
  BadRequestError,
  InternalServerError,
} from "src/common/constants/http-errors";

@Injectable()
export class MatchService {
  private readonly logger = new Logger(MatchService.name);
  private readonly maxGlobalConcurrentTasks = 100000;
  private readonly globalLimiter = new Bottleneck({
    maxConcurrent: this.maxGlobalConcurrentTasks,
  });

  constructor(
    private readonly dbService: DbService,
    private readonly apiService: ApiService,
    @Inject(forwardRef(() => PlayerService))
    private readonly playerService: PlayerService,
    private readonly championStatsService: ChampionStatsService,
    private readonly itemStatsService: ItemStatsService,
  ) {}

  async processPlayerMatches(puuid: string, region: string) {
    try {
      this.logger.log(`Fetching matches for player ${puuid} in ${region}`);
      const matchIds = await this.apiService.fetchMatchIdsByPuuid(
        puuid,
        region,
        0,
        100,
        10,
      );
      const unprocessedMatchIds = await this.filterUnprocessedMatches(matchIds);
      const matchTasks = unprocessedMatchIds.map((matchId) =>
        this.globalLimiter
          .schedule(() => this.processMatch(matchId, region))
          .catch((error) => {
            this.logger.error(
              formatError(
                ErrorMessages.match.process.failed(matchId),
                error.stack,
              ),
            );
            throw new InternalServerError(
              ErrorMessages.match.process.failed(matchId),
            );
          }),
      );
      await Promise.all(matchTasks);
    } catch (error: any) {
      this.logger.error(
        formatError(ErrorMessages.match.process.failed(puuid), error.stack),
      );
      throw error;
    }
  }

  private async filterUnprocessedMatches(
    matchIds: string[],
  ): Promise<string[]> {
    const existingMatches = await this.dbService.client
      .select({ matchId: matchesTable.matchId })
      .from(matchesTable)
      .where(inArray(matchesTable.matchId, matchIds));
    const existingMatchIds = new Set(existingMatches.map((m) => m.matchId));
    return matchIds.filter((matchId) => !existingMatchIds.has(matchId));
  }

  private async processMatch(matchId: string, region: string) {
    try {
      const matchRegion = this.apiService.getMatchRegion(region);
      if (!matchRegion) {
        throw new BadRequestError(ErrorMessages.api.region.noMapping(region));
      }

      this.logger.log(`Processing match ${matchId} in ${region}`);
      const matchData = await this.apiService.fetchMatchById(
        matchId,
        matchRegion,
        region,
        10,
      );

      const transformedMatch = transformMatchData(matchData);
      await this.dbService.client.insert(matchesTable).values(transformedMatch);

      const participantTasks = matchData.info.participants.map((participant) =>
        this.globalLimiter
          .schedule(() =>
            this.processParticipantData(
              participant,
              matchId,
              region,
              matchData.info.gameDuration,
            ),
          )
          .catch((error) => {
            this.logger.error(
              formatError(
                ErrorMessages.match.process.participant(
                  participant.summonerName,
                  matchId,
                ),
                error.stack,
              ),
            );
            throw new InternalServerError(
              ErrorMessages.match.process.participant(
                participant.summonerName,
                matchId,
              ),
            );
          }),
      );
      await Promise.all(participantTasks);
      this.logger.log(`Processed match ${matchId} in ${region}`);
    } catch (error: any) {
      this.logger.error(
        formatError(ErrorMessages.match.process.failed(matchId), error.stack),
      );
      throw error;
    }
  }

  private async processParticipantData(
    participant: ParticipantDto,
    matchId: string,
    region: string,
    matchDuration: number,
  ) {
    try {
      await this.playerService.ensurePlayerExists(participant, region);
      const matchPlayerData = transformParticipantData(participant, matchId);
      const result = await this.dbService.client
        .insert(matchPlayersTable)
        .values(matchPlayerData)
        .returning({ matchPlayerId: matchPlayersTable.matchPlayerId });
      const matchPlayerId = result[0].matchPlayerId;

      await this.itemStatsService.processPlayerItems(
        participant,
        matchPlayerId,
      );
      await this.championStatsService.updateChampionStats(
        participant,
        matchDuration,
      );
      await this.itemStatsService.updateItemsByChampion(participant);
      await this.championStatsService.updateChampionStatsByTimeBucket(
        participant,
        matchDuration,
      );

      this.logger.log(
        `Processed participant ${participant.summonerName} in match ${matchId}`,
      );
    } catch (error: any) {
      this.logger.error(
        formatError(
          ErrorMessages.match.process.participant(
            participant.summonerName,
            matchId,
          ),
          error.stack,
        ),
      );
      throw new InternalServerError(
        ErrorMessages.match.process.participant(
          participant.summonerName,
          matchId,
        ),
      );
    }
  }
}
