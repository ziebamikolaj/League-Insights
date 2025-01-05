import { Injectable, Logger } from "@nestjs/common";
import fetch from "node-fetch";
import { RateLimiterService } from "./rate-limiter.service";
import { z } from "zod";
import { MatchDto, matchDtoSchema } from "../../../common/types/match.dto";
import {
  PlayerAccountInfo,
  playerAccountInfoSchema,
} from "../../../common/types/player-account-info";
import {
  PlayerByRegion,
  playersByRegionSchema,
} from "../../../common/types/player-by-region";
import {
  PlayerRankInfo,
  playersRanksInfoSchema,
} from "../../../common/types/player-ranks-info";
import { matchRegionMap } from "../../../common/types/match-regions";
import { HttpErrorMessages } from "src/common/constants/error-messages";
import {
  InternalServerError,
  NotFoundError,
  TooManyRequestsError,
} from "src/common/constants/http-errors";

@Injectable()
export class ApiService {
  private readonly logger = new Logger(ApiService.name);

  constructor(private readonly rateLimiterService: RateLimiterService) {}

  private async fetchWithRateLimit<T>(
    url: string,
    schema: z.ZodType<T>,
    region: string,
    priority: number,
  ): Promise<T> {
    const limiter = this.rateLimiterService.getLimiterForRegion(region);
    return limiter.schedule({ priority }, async () => {
      try {
        const response = await fetch(url, {
          headers: {
            "X-Riot-Token": process.env.RIOT_API_KEY as string,
          },
        });
        if (response.status === 429) {
          const retryAfter = response.headers.get("Retry-After");
          const delay = (retryAfter ? parseInt(retryAfter, 10) : 1) * 1000;
          throw new TooManyRequestsError(
            HttpErrorMessages.tooManyRequests.default(delay / 1000),
          );
        }

        if (response.status === 404) {
          throw new NotFoundError(HttpErrorMessages.notFound.resource(url));
        }

        if (!response.ok) {
          throw new InternalServerError(
            HttpErrorMessages.internal.external("Riot API"),
          );
        }
        const data = await response.json();
        return schema.parse(data);
      } catch (error: any) {
        this.logger.error(
          `Error fetching data from ${url} for region ${region}: ${error.message}`,
          error.stack,
        );
        throw error;
      }
    });
  }

  async fetchPlayers(
    queue: string,
    tier: string,
    division: string,
    region: string,
    page: string = "1",
    priority: number = 5,
  ): Promise<PlayerByRegion[]> {
    const url = `https://${region}.api.riotgames.com/lol/league-exp/v4/entries/${queue}/${tier}/${division}?page=${page}`;
    return this.fetchWithRateLimit<PlayerByRegion[]>(
      url,
      playersByRegionSchema,
      region,
      priority,
    );
  }

  async fetchPlayerRanksInfo(
    region: string,
    summonerId: string,
    priority: number = 5,
  ): Promise<PlayerRankInfo[]> {
    const url = `https://${region}.api.riotgames.com/lol/league/v4/entries/by-summoner/${summonerId}`;
    return this.fetchWithRateLimit<PlayerRankInfo[]>(
      url,
      playersRanksInfoSchema,
      region,
      priority,
    );
  }

  async fetchPlayerAccountInfo(
    region: string,
    summonerId: string,
    priority: number = 5,
  ): Promise<PlayerAccountInfo> {
    const url = `https://${region}.api.riotgames.com/lol/summoner/v4/summoners/${summonerId}`;
    return this.fetchWithRateLimit<PlayerAccountInfo>(
      url,
      playerAccountInfoSchema,
      region,
      priority,
    );
  }

  async fetchMatchIdsByPuuid(
    puuid: string,
    region: string,
    start: number = 0,
    count: number = 100,
    priority: number = 5,
  ): Promise<string[]> {
    const matchRegion = this.getMatchRegion(region);
    if (!matchRegion) {
      throw new Error(`No match region mapping found for region: ${region}`);
    }
    const url = `https://${matchRegion}.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=${start}&count=${count}`;
    return this.fetchWithRateLimit<string[]>(
      url,
      z.array(z.string()),
      region,
      priority,
    );
  }

  async fetchMatchById(
    matchId: string,
    matchRegion: string,
    region: string,
    priority: number = 5,
  ): Promise<MatchDto> {
    const url = `https://${matchRegion}.api.riotgames.com/lol/match/v5/matches/${matchId}`;
    return this.fetchWithRateLimit<MatchDto>(
      url,
      matchDtoSchema,
      region,
      priority,
    );
  }

  getMatchRegion(region: string): string | undefined {
    return matchRegionMap[region];
  }
}
