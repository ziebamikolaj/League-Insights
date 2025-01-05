import { Injectable, NotFoundException } from "@nestjs/common";
import { DbService } from "../../db/db.service";
import {
  championStatsTable,
  itemsByChampionTable,
  championStatsByTimeBucketTable,
} from "../../db/schema";
import { eq, and } from "drizzle-orm";

@Injectable()
export class StatisticsService {
  constructor(private readonly dbService: DbService) {}

  async getChampionStats(championId: number) {
    const stats = await this.dbService.client
      .select()
      .from(championStatsTable)
      .where(eq(championStatsTable.championId, BigInt(championId)))
      .execute();

    if (stats.length === 0) {
      throw new NotFoundException(`Champion with ID ${championId} not found`);
    }

    const championStats = stats[0];
    const totalGames =
      Number(championStats.totalWins ?? 0) +
      Number(championStats.totalLosses ?? 0);

    return {
      championId,
      winRate: Number(championStats.totalWins ?? 0) / totalGames,
      pickRate:
        (totalGames / Number(championStats.totalMinutesInMatches ?? 1)) * 60,
      averageKDA:
        (Number(championStats.totalKills ?? 0) +
          Number(championStats.totalAssists ?? 0)) /
        Math.max(Number(championStats.totalDeaths ?? 1), 1),
      averageGoldPerMinute:
        Number(championStats.totalGoldEarned ?? 0) /
        Number(championStats.totalMinutesInMatches ?? 1),
      averageDamageDealt:
        Number(championStats.totalDamageDealt ?? 0) / totalGames,
      averageDamageTaken:
        Number(championStats.totalDamageTaken ?? 0) / totalGames,
      averageVisionScore:
        Number(championStats.totalVisionScore ?? 0) / totalGames,
    };
  }

  async getChampionStatsByGameLength(championId: number, gameLength: string) {
    const stats = await this.dbService.client
      .select()
      .from(championStatsByTimeBucketTable)
      .where(
        and(
          eq(championStatsByTimeBucketTable.championId, championId.toString()),
          eq(championStatsByTimeBucketTable.timeBucket, gameLength),
        ),
      )
      .execute();

    if (stats.length === 0) {
      throw new NotFoundException(
        `Stats not found for champion ID ${championId} and game length ${gameLength}`,
      );
    }

    return stats[0];
  }

  async getItemStatsByChampion(championId: number) {
    const itemStats = await this.dbService.client
      .select()
      .from(itemsByChampionTable)
      .where(eq(itemsByChampionTable.championId, championId.toString()))
      .execute();

    if (itemStats.length === 0) {
      throw new NotFoundException(
        `Item stats not found for champion ID ${championId}`,
      );
    }

    return itemStats;
  }

  async getOverallChampionStats() {
    const allChampionStats = await this.dbService.client
      .select()
      .from(championStatsTable)
      .execute();

    const totalGames = allChampionStats.reduce(
      (sum, champ) =>
        sum + Number(champ.totalWins ?? 0) + Number(champ.totalLosses ?? 0),
      0,
    );

    return allChampionStats.map((champ) => {
      const champGames =
        Number(champ.totalWins ?? 0) + Number(champ.totalLosses ?? 0);
      return {
        championId: champ.championId,
        winRate: Number(champ.totalWins ?? 0) / champGames,
        pickRate: champGames / totalGames,
        banRate: 0, // Remove this line if totalBans doesn't exist in the schema
        averageKDA:
          (Number(champ.totalKills ?? 0) + Number(champ.totalAssists ?? 0)) /
          Math.max(Number(champ.totalDeaths ?? 1), 1),
      };
    });
  }

  async getTopChampions(category: string, limit: number = 10) {
    const allChampionStats = await this.dbService.client
      .select()
      .from(championStatsTable)
      .execute();

    const totalGames = allChampionStats.reduce(
      (sum, champ) =>
        sum + Number(champ.totalWins ?? 0) + Number(champ.totalLosses ?? 0),
      0,
    );

    let sortedChampions;
    switch (category) {
      case "winRate":
        sortedChampions = allChampionStats.sort(
          (a, b) =>
            Number(b.totalWins ?? 0) /
              (Number(b.totalWins ?? 0) + Number(b.totalLosses ?? 0)) -
            Number(a.totalWins ?? 0) /
              (Number(a.totalWins ?? 0) + Number(a.totalLosses ?? 0)),
        );
        break;
      case "pickRate":
        sortedChampions = allChampionStats.sort(
          (a, b) =>
            (Number(b.totalWins ?? 0) + Number(b.totalLosses ?? 0)) /
              totalGames -
            (Number(a.totalWins ?? 0) + Number(a.totalLosses ?? 0)) /
              totalGames,
        );
        break;
      case "banRate":
        throw new Error("banRate calculation is not implemented");
      default:
        throw new Error(`Invalid category: ${category}`);
    }

    return sortedChampions.slice(0, limit).map((champ) => ({
      championId: champ.championId,
      [category]:
        category === "winRate"
          ? Number(champ.totalWins ?? 0) /
            (Number(champ.totalWins ?? 0) + Number(champ.totalLosses ?? 0))
          : category === "pickRate"
            ? (Number(champ.totalWins ?? 0) + Number(champ.totalLosses ?? 0)) /
              totalGames
            : 0,
    }));
  }
}
