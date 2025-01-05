import { Injectable } from "@nestjs/common";
import { db } from "./database";
import {
  championStatsTable,
  championStatsByTimeBucketTable,
  itemsByChampionTable,
  playerItemsTable,
} from "./schema";
import { eq } from "drizzle-orm";

@Injectable()
export class DbService {
  readonly #client: typeof db;

  constructor() {
    this.#client = db;
  }

  get client(): typeof db {
    return this.#client;
  }

  async getChampionStats(championId: number) {
    return this.#client
      .select()
      .from(championStatsTable)
      .where(eq(championStatsTable.championId, BigInt(championId)))
      .execute();
  }

  async getChampionStatsByTimeBucket(championId: number, timeBucket: string) {
    return this.#client
      .select()
      .from(championStatsByTimeBucketTable)
      .where(
        eq(championStatsByTimeBucketTable.championId, championId.toString()) &&
          eq(championStatsByTimeBucketTable.timeBucket, timeBucket),
      )
      .execute();
  }

  async getItemsByChampion(championId: number) {
    return this.#client
      .select()
      .from(itemsByChampionTable)
      .where(eq(itemsByChampionTable.championId, championId.toString()))
      .execute();
  }

  async getPlayerItems(matchPlayerId: number) {
    return this.#client
      .select()
      .from(playerItemsTable)
      .where(eq(playerItemsTable.matchPlayerId, BigInt(matchPlayerId)))
      .execute();
  }
}
