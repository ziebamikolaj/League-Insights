import { Injectable } from "@nestjs/common";
import { DbService } from "src/db/db.service";
import { PlayerByRegion, playersByRegionSchema } from "./types/playerByRegion";
import {
  PlayerInfo,
  playersTable,
  RankEnumType,
  RegionEnumType,
  TierEnumType,
} from "src/db/schema";
import { eq } from "drizzle-orm";
import {
  PlayerRankInfo,
  playersRanksInfoSchema,
} from "./types/playerRanksInfo";
import {
  PlayerAccountInfo,
  playerAccountInfoSchema,
} from "./types/playerAccountInfo";

@Injectable()
export class ScanService {
  constructor(private readonly dbService: DbService) {}

  async getScanAndAnalyze(
    queue: string,
    tier: string,
    division: string,
    region: string,
  ) {
    const players: Array<PlayerInfo> = [];

    const fetchedPlayersByRegion = await this.fetchPlayers(
      queue,
      tier,
      division,
      region,
      "1",
    );

    fetchedPlayersByRegion.forEach(async (player) => {
      const playerRanksInfo = await this.fetchPlayerRanksInfo(
        region,
        player.summonerId,
      );
      const playerAccountInfo = await this.fetchPlayerAccountInfo(
        region,
        player.summonerId,
      );
      this.addOrUpdatePlayer(
        player,
        playerRanksInfo,
        playerAccountInfo,
        region,
      );
    });

    return players;
  }

  async fetchPlayers(
    queue: string,
    tier: string,
    division: string,
    region: string,
    page: string = "1",
  ) {
    const res = await fetch(
      `https://${region}.api.riotgames.com/lol/league-exp/v4/entries/${queue}/${tier}/${division}?page=${page}&api_key=${process.env.RIOT_API_KEY}`,
    );

    if (!res.ok) throw new Error(res.statusText);

    const data = await res.json();
    console.log(data);

    try {
      return await playersByRegionSchema.parseAsync(data);
    } catch (err) {
      throw new Error(`Failed parsing response from fetchPlayers \n${err}`);
    }
  }

  async fetchPlayerRanksInfo(
    region: string,
    summonerId: string,
  ): Promise<PlayerRankInfo> {
    const res = await fetch(
      `https://${region}.api.riotgames.com/lol/league/v4/entries/by-summoner/${summonerId}?api_key=${process.env.RIOT_API_KEY}`,
    );
    if (!res.ok) throw new Error(res.statusText);
    const data = await res.json();

    try {
      const parsedData = await playersRanksInfoSchema.parseAsync(data);

      const transformedPlayer: PlayerRankInfo = {};

      parsedData.forEach((queue) => {
        const isSoloQueue = queue.queueType === "RANKED_SOLO_5x5";
        const isFlexQueue = queue.queueType === "RANKED_FLEX_SR";

        if (isSoloQueue) {
          transformedPlayer.soloQueueTier = queue.tier;
          transformedPlayer.soloQueueRank = queue.rank;
          transformedPlayer.soloQueueLeaguePoints = queue.leaguePoints;
          transformedPlayer.soloQueueWins = queue.wins;
          transformedPlayer.soloQueueLoses = queue.losses;
          transformedPlayer.soloQueueInActive = queue.inactive;
          transformedPlayer.soloQueueFreshBlood = queue.freshBlood;
          transformedPlayer.soloQueueHotStreak = queue.hotStreak;
        }

        if (isFlexQueue) {
          transformedPlayer.flexQueueTier = queue.tier;
          transformedPlayer.flexQueueRank = queue.rank;
          transformedPlayer.flexQueueLeaguePoints = queue.leaguePoints;
          transformedPlayer.flexQueueWins = queue.wins;
          transformedPlayer.flexQueueLoses = queue.losses;
          transformedPlayer.flexQueueInActive = queue.inactive;
          transformedPlayer.flexQueueFreshBlood = queue.freshBlood;
          transformedPlayer.flexQueueHotStreak = queue.hotStreak;
        }
      });

      return transformedPlayer;
    } catch (err) {
      throw new Error(
        `Failed parsing response from fetchPlayerRanksInfo \n${err}`,
      );
    }
  }

  async fetchPlayerAccountInfo(region: string, summonerId: string) {
    const res = await fetch(
      `https://${region}.api.riotgames.com/lol/summoner/v4/summoners/${summonerId}?api_key=${process.env.RIOT_API_KEY}`,
    );

    if (!res.ok) throw new Error(res.statusText);

    const data = await res.json();

    try {
      return await playerAccountInfoSchema.parseAsync(data);
    } catch (err) {
      throw new Error(
        `Failed parsing response from fetchPlayerAccountInfo \n${err}`,
      );
    }
  }

  async addOrUpdatePlayer(
    player: PlayerByRegion,
    playerRanksInfo: PlayerRankInfo,
    playerAccountInfo: PlayerAccountInfo,
    region: string,
  ) {
    const result = await this.dbService.client
      .select({
        puuid: playersTable.puuid,
      })
      .from(playersTable)
      .where(eq(playersTable.puuid, playerAccountInfo.puuid));

    const transformedPlayer = this.transformPlayerData(
      player,
      playerRanksInfo,
      playerAccountInfo,
      region,
    );

    // Check if the player already exists and update or insert accordingly
    if (result.length > 0) {
      await this.dbService.client
        .update(playersTable)
        .set(transformedPlayer)
        .where(eq(playersTable.puuid, playerAccountInfo.puuid));
    } else {
      await this.dbService.client
        .insert(playersTable)
        .values(transformedPlayer);
    }
  }

  private transformPlayerData(
    player: PlayerByRegion,
    playerRanksInfo: PlayerRankInfo,
    playerAccountInfo: PlayerAccountInfo,
    region: string,
  ): PlayerInfo {
    return {
      summonerId: player.summonerId,
      puuid: playerAccountInfo.puuid,
      region: region as RegionEnumType,
      profileIconId: playerAccountInfo.profileIconId,
      summonerLevel: playerAccountInfo.summonerLevel,
      analyzedOn: new Date(),
      soloQueueTier: (playerRanksInfo.soloQueueTier as TierEnumType) ?? null,
      soloQueueRank: (playerRanksInfo.soloQueueRank as RankEnumType) ?? null,
      soloQueueLeaguePoints: playerRanksInfo.soloQueueLeaguePoints ?? null,
      soloQueueWins: playerRanksInfo.soloQueueWins ?? null,
      soloQueueLoses: playerRanksInfo.soloQueueLoses ?? null,
      soloQueueInActive: playerRanksInfo.soloQueueInActive ?? false,
      soloQueueFreshBlood: playerRanksInfo.soloQueueFreshBlood ?? false,
      soloQueueHotStreak: playerRanksInfo.soloQueueHotStreak ?? false,
      flexQueueTier: (playerRanksInfo.flexQueueTier as TierEnumType) ?? null,
      flexQueueRank: (playerRanksInfo.flexQueueRank as RankEnumType) ?? null,
      flexQueueLeaguePoints: playerRanksInfo.flexQueueLeaguePoints ?? null,
      flexQueueWins: playerRanksInfo.flexQueueWins ?? null,
      flexQueueLoses: playerRanksInfo.flexQueueLoses ?? null,
      flexQueueInActive: playerRanksInfo.flexQueueInActive ?? false,
      flexQueueFreshBlood: playerRanksInfo.flexQueueFreshBlood ?? false,
      flexQueueHotStreak: playerRanksInfo.flexQueueHotStreak ?? false,
    };
  }
}
