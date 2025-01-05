import { forwardRef, Inject, Injectable, Logger } from "@nestjs/common";
import Bottleneck from "bottleneck";
import { and, eq, inArray } from "drizzle-orm";
import { playersTable } from "src/db/schema";
import { PlayerByRegion } from "../../../common/types/player-by-region";
import { ApiService } from "./api.service";
import { DbService } from "src/db/db.service";
import { transformPlayerData } from "src/common/utils/transform-player";
import { MatchService } from "./match.service";
import { ParticipantDto } from "src/common/types/participant.dto";
import {
  formatError,
  ErrorMessages,
} from "src/common/constants/error-messages";
import { InternalServerError } from "src/common/constants/http-errors";

@Injectable()
export class PlayerService {
  private readonly logger = new Logger(PlayerService.name);
  private readonly maxGlobalConcurrentTasks = 100000;
  private readonly globalLimiter = new Bottleneck({
    maxConcurrent: this.maxGlobalConcurrentTasks,
  });

  constructor(
    private readonly dbService: DbService,
    private readonly apiService: ApiService,
    @Inject(forwardRef(() => MatchService))
    private readonly matchService: MatchService,
  ) {}

  async fetchAndProcessPlayers(
    queue: string,
    tier: string,
    division: string,
    region: string,
    page: number,
  ) {
    try {
      const players = await this.apiService.fetchPlayers(
        queue,
        tier,
        division,
        region,
        page.toString(),
        10,
      );
      if (players.length === 0) {
        return players;
      }
      const playersToUpdate = await this.filterPlayersToUpdate(players, region);
      const playerTasks = playersToUpdate.map((player) =>
        this.globalLimiter
          .schedule(() => this.updatePlayerData(player, region))
          .catch((error) => {
            this.logger.error(
              formatError(
                ErrorMessages.player.update.failed(player.summonerId, region),
                error.stack,
              ),
            );
            throw new InternalServerError(
              ErrorMessages.player.update.failed(player.summonerId, region),
            );
          }),
      );
      await Promise.all(playerTasks);
      return players;
    } catch (error: any) {
      this.logger.error(
        formatError(
          ErrorMessages.player.fetch.failed(tier + division, region),
          error.stack,
        ),
      );
      throw error;
    }
  }

  private async filterPlayersToUpdate(
    players: PlayerByRegion[],
    region: string,
  ): Promise<PlayerByRegion[]> {
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const summonerIds = players.map((player) => player.summonerId);
    const existingPlayers = await this.dbService.client
      .select({
        summonerId: playersTable.summonerId,
        analyzedOn: playersTable.analyzedOn,
      })
      .from(playersTable)
      .where(
        and(
          inArray(playersTable.summonerId, summonerIds),
          eq(playersTable.region, region as any),
        ),
      );
    const existingPlayersMap = new Map(
      existingPlayers.map((p) => [p.summonerId, p.analyzedOn]),
    );
    return players.filter((player) => {
      const analyzedOn = existingPlayersMap.get(player.summonerId) as Date;
      return !analyzedOn || new Date(analyzedOn) < oneDayAgo;
    });
  }

  private async updatePlayerData(player: PlayerByRegion, region: string) {
    try {
      const [playerRanksInfo, playerAccountInfo] = await Promise.all([
        this.apiService.fetchPlayerRanksInfo(region, player.summonerId, 10),
        this.apiService.fetchPlayerAccountInfo(region, player.summonerId, 10),
      ]);
      const transformedPlayer = transformPlayerData(
        player.summonerId,
        playerRanksInfo,
        playerAccountInfo,
        region,
      );
      await this.dbService.client
        .insert(playersTable)
        .values(transformedPlayer)
        .onConflictDoUpdate({
          target: playersTable.puuid,
          set: transformedPlayer,
        });
      this.logger.log(
        `Updated player data for ${playerAccountInfo.puuid} in ${region}`,
      );
      await this.matchService.processPlayerMatches(
        playerAccountInfo.puuid,
        region,
      );
    } catch (error: any) {
      this.logger.error(
        formatError(
          ErrorMessages.player.update.failed(player.summonerId, region),
          error.stack,
        ),
      );
      throw new InternalServerError(
        ErrorMessages.player.update.failed(player.summonerId, region),
      );
    }
  }

  async ensurePlayerExists(participant: ParticipantDto, region: string) {
    try {
      const existingPlayer = await this.dbService.client
        .select({ puuid: playersTable.puuid })
        .from(playersTable)
        .where(eq(playersTable.puuid, participant.puuid));

      if (existingPlayer.length === 0) {
        const playerAccountInfo = await this.apiService.fetchPlayerAccountInfo(
          region,
          participant.summonerId,
          10,
        );
        if (!playerAccountInfo) {
          this.logger.warn(
            `Player account info not found for summonerId ${participant.summonerId} in region ${region}`,
          );
          return;
        }
        const playerRanksInfo = await this.apiService.fetchPlayerRanksInfo(
          region,
          participant.summonerId,
          10,
        );
        const transformedPlayer = transformPlayerData(
          participant.summonerId,
          playerRanksInfo,
          playerAccountInfo,
          region,
        );
        await this.dbService.client
          .insert(playersTable)
          .values(transformedPlayer)
          .onConflictDoUpdate({
            target: playersTable.puuid,
            set: transformedPlayer,
          });
        this.logger.log(
          `Inserted player ${participant.summonerName} (puuid: ${participant.puuid}) into 'players' table.`,
        );
      }
    } catch (error: any) {
      this.logger.error(
        formatError(
          ErrorMessages.player.process.failed(participant.puuid),
          error.stack,
        ),
      );
      throw new InternalServerError(
        ErrorMessages.player.process.failed(participant.puuid),
      );
    }
  }
}
