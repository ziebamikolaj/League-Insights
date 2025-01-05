import { Injectable, Logger } from "@nestjs/common";
import {
  RegionEnum,
  TierEnum,
  RankEnum,
  RegionEnumType,
  TierEnumType,
  RankEnumType,
} from "src/db/schema";
import { PlayerService } from "./player.service";
import {
  formatError,
  ErrorMessages,
} from "src/common/constants/error-messages";
import { BadRequestError } from "src/common/constants/http-errors";

@Injectable()
export class ScanService {
  private readonly logger = new Logger(ScanService.name);

  constructor(private readonly playerService: PlayerService) {}

  async getScanAndAnalyzeAllRegionsAndRanks() {
    const regions = RegionEnum.enumValues;
    const tiers = TierEnum.enumValues.reverse();
    const divisions = RankEnum.enumValues;
    const queue = "RANKED_SOLO_5x5";
    try {
      const regionTasks = regions.map((region) =>
        this.scanRegion(region, queue, tiers, divisions).catch((error) => {
          this.logger.error(
            formatError(ErrorMessages.api.region.invalid(region), error.stack),
          );
        }),
      );
      await Promise.all(regionTasks);
      this.logger.log("Completed scanning all regions.");
    } catch (error: any) {
      this.logger.error(
        formatError(
          ErrorMessages.general.unexpected(error.message),
          error.stack,
        ),
      );
      throw error;
    }
  }

  private async scanRegion(
    region: RegionEnumType,
    queue: string,
    tiers: TierEnumType[],
    divisions: RankEnumType[],
  ) {
    if (!RegionEnum.enumValues.includes(region)) {
      throw new BadRequestError(ErrorMessages.api.region.invalid(region));
    }

    this.logger.log(`Scanning region: ${region}`);
    for (const tier of tiers) {
      await this.processTier(region, queue, tier, divisions);
    }
  }

  private async processTier(
    region: string,
    queue: string,
    tier: TierEnumType,
    divisions: RankEnumType[],
  ) {
    if (!TierEnum.enumValues.includes(tier)) {
      throw new BadRequestError(
        ErrorMessages.general.validation.invalid("tier"),
      );
    }

    if (["MASTER", "GRANDMASTER", "CHALLENGER"].includes(tier)) {
      await this.processScan(queue, tier, "I", region);
    } else {
      for (const division of divisions) {
        if (!RankEnum.enumValues.includes(division)) {
          throw new BadRequestError(
            ErrorMessages.general.validation.invalid("division"),
          );
        }
        await this.processScan(queue, tier, division, region);
      }
    }
  }

  private async processScan(
    queue: string,
    tier: string,
    division: string,
    region: string,
  ) {
    let page = 1;
    let hasMorePages = true;
    while (hasMorePages) {
      try {
        this.logger.log(
          `Fetching players for ${queue} ${tier} ${division} in ${region}, page ${page}`,
        );
        const players = await this.playerService.fetchAndProcessPlayers(
          queue,
          tier,
          division,
          region,
          page,
        );
        if (players.length === 0) {
          hasMorePages = false;
        } else {
          page++;
        }
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
  }
}
