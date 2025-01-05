import { Injectable, Logger } from "@nestjs/common";
import { and, eq } from "drizzle-orm";
import {
  championStatsTable,
  championStatsByTimeBucketTable,
  ChampionStatsInfo,
  ChampionStatsByTimeBucketInfo,
} from "src/db/schema";
import { DbService } from "src/db/db.service";
import { ParticipantDto } from "../../../common/types/participant.dto";
import {
  formatError,
  ErrorMessages,
} from "src/common/constants/error-messages";
import { InternalServerError } from "src/common/constants/http-errors";

@Injectable()
export class ChampionStatsService {
  private readonly logger = new Logger(ChampionStatsService.name);

  constructor(private readonly dbService: DbService) {}

  async updateChampionStats(
    participant: ParticipantDto,
    matchDuration: number,
  ) {
    try {
      const championId = participant.championId;
      const existingStats = await this.dbService.client
        .select()
        .from(championStatsTable)
        .where(eq(championStatsTable.championId, BigInt(championId)));
      const totalMinutesInMatch = matchDuration / 60;
      const totalCreepScore =
        (participant.totalMinionsKilled ?? 0) +
        (participant.neutralMinionsKilled ?? 0);

      if (existingStats.length > 0) {
        await this.updateExistingChampionStats(
          existingStats[0] as ChampionStatsInfo,
          participant,
          totalMinutesInMatch,
          totalCreepScore,
        );
      } else {
        await this.createNewChampionStats(
          championId,
          participant,
          totalMinutesInMatch,
          totalCreepScore,
        );
      }
    } catch (error: any) {
      this.logger.error(
        formatError(
          ErrorMessages.stats.champion.update.failed(
            participant.championId.toString(),
          ),
          error.stack,
        ),
      );
      throw new InternalServerError(
        ErrorMessages.stats.champion.update.failed(
          participant.championId.toString(),
        ),
      );
    }
  }

  private async updateExistingChampionStats(
    stats: ChampionStatsInfo,
    participant: ParticipantDto,
    totalMinutesInMatch: number,
    totalCreepScore: number,
  ) {
    const updatedStats = {
      totalMinutesInMatches:
        BigInt(stats.totalMinutesInMatches ?? 0) +
        BigInt(Math.floor(totalMinutesInMatch)),
      totalWins: BigInt(stats.totalWins ?? 0) + BigInt(participant.win ? 1 : 0),
      totalLosses:
        BigInt(stats.totalLosses ?? 0) + BigInt(participant.win ? 0 : 1),
      totalKills:
        BigInt(stats.totalKills ?? 0) + BigInt(participant.kills ?? 0),
      totalDeaths:
        BigInt(stats.totalDeaths ?? 0) + BigInt(participant.deaths ?? 0),
      totalAssists:
        BigInt(stats.totalAssists ?? 0) + BigInt(participant.assists ?? 0),
      totalGoldEarned:
        BigInt(stats.totalGoldEarned ?? 0) +
        BigInt(participant.goldEarned ?? 0),
      totalGoldSpent:
        BigInt(stats.totalGoldSpent ?? 0) + BigInt(participant.goldSpent ?? 0),
      totalDamageDealt:
        BigInt(stats.totalDamageDealt ?? 0) +
        BigInt(participant.totalDamageDealtToChampions ?? 0),
      totalDamageTaken:
        BigInt(stats.totalDamageTaken ?? 0) +
        BigInt(participant.totalDamageTaken ?? 0),
      totalHealingDone:
        BigInt(stats.totalHealingDone ?? 0) +
        BigInt(participant.totalHeal ?? 0),
      totalShieldingDone:
        BigInt(stats.totalShieldingDone ?? 0) +
        BigInt(participant.totalHealsOnTeammates ?? 0),
      totalCreepScore:
        BigInt(stats.totalCreepScore ?? 0) + BigInt(totalCreepScore),
      totalVisionScore:
        BigInt(stats.totalVisionScore ?? 0) +
        BigInt(participant.visionScore ?? 0),
      totalWardsPlaced:
        BigInt(stats.totalWardsPlaced ?? 0) +
        BigInt(participant.wardsPlaced ?? 0),
      totalWardsDestroyed:
        BigInt(stats.totalWardsDestroyed ?? 0) +
        BigInt(participant.wardsKilled ?? 0),
      totalCrowdControlScore:
        BigInt(stats.totalCrowdControlScore ?? 0) +
        BigInt(participant.timeCCingOthers ?? 0),
    };
    await this.dbService.client
      .update(championStatsTable)
      .set(updatedStats)
      .where(eq(championStatsTable.championId, BigInt(participant.championId)));
  }

  private async createNewChampionStats(
    championId: number,
    participant: ParticipantDto,
    totalMinutesInMatch: number,
    totalCreepScore: number,
  ) {
    const newStats = {
      championId: BigInt(championId),
      totalMinutesInMatches: BigInt(Math.floor(totalMinutesInMatch)),
      totalWins: BigInt(participant.win ? 1 : 0),
      totalLosses: BigInt(participant.win ? 0 : 1),
      totalKills: BigInt(participant.kills ?? 0),
      totalDeaths: BigInt(participant.deaths ?? 0),
      totalAssists: BigInt(participant.assists ?? 0),
      totalGoldEarned: BigInt(participant.goldEarned ?? 0),
      totalGoldSpent: BigInt(participant.goldSpent ?? 0),
      totalDamageDealt: BigInt(participant.totalDamageDealtToChampions ?? 0),
      totalDamageTaken: BigInt(participant.totalDamageTaken ?? 0),
      totalHealingDone: BigInt(participant.totalHeal ?? 0),
      totalShieldingDone: BigInt(participant.totalHealsOnTeammates ?? 0),
      totalCreepScore: BigInt(totalCreepScore),
      totalVisionScore: BigInt(participant.visionScore ?? 0),
      totalWardsPlaced: BigInt(participant.wardsPlaced ?? 0),
      totalWardsDestroyed: BigInt(participant.wardsKilled ?? 0),
      totalCrowdControlScore: BigInt(participant.timeCCingOthers ?? 0),
    };
    await this.dbService.client.insert(championStatsTable).values(newStats);
  }

  async updateChampionStatsByTimeBucket(
    participant: ParticipantDto,
    matchDuration: number,
  ) {
    try {
      const championId = participant.championId;
      const timeBucket = this.getTimeBucket(matchDuration);
      const existingStats = await this.dbService.client
        .select()
        .from(championStatsByTimeBucketTable)
        .where(
          and(
            eq(
              championStatsByTimeBucketTable.championId,
              championId.toString(),
            ),
            eq(championStatsByTimeBucketTable.timeBucket, timeBucket),
          ),
        );

      const winIncrement = participant.win ? 1 : 0;
      const lossIncrement = participant.win ? 0 : 1;

      if (existingStats.length > 0) {
        const stats = existingStats[0] as ChampionStatsByTimeBucketInfo;
        const updatedStats = {
          wins: (stats.wins ?? 0) + BigInt(winIncrement),
          losses: (stats.losses ?? 0) + BigInt(lossIncrement),
        };
        await this.dbService.client
          .update(championStatsByTimeBucketTable)
          .set(updatedStats)
          .where(
            and(
              eq(
                championStatsByTimeBucketTable.championId,
                championId.toString(),
              ),
              eq(championStatsByTimeBucketTable.timeBucket, timeBucket),
            ),
          );
      } else {
        const newStats = {
          championId: championId.toString(),
          timeBucket,
          wins: BigInt(winIncrement),
          losses: BigInt(lossIncrement),
        };
        await this.dbService.client
          .insert(championStatsByTimeBucketTable)
          .values(newStats);
      }
    } catch (error: any) {
      this.logger.error(
        formatError(
          ErrorMessages.stats.champion.timeBucket.failed(
            participant.championId.toString(),
            this.getTimeBucket(matchDuration),
          ),
          error.stack,
        ),
      );
      throw new InternalServerError(
        ErrorMessages.stats.champion.timeBucket.failed(
          participant.championId.toString(),
          this.getTimeBucket(matchDuration),
        ),
      );
    }
  }

  private getTimeBucket(matchDuration: number): string {
    if (matchDuration < 600) return "0-10";
    else if (matchDuration < 1200) return "10-20";
    else if (matchDuration < 1800) return "20-30";
    else if (matchDuration < 2400) return "30-40";
    else if (matchDuration < 3000) return "40-50";
    else return "50+";
  }
}
