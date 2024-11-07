import { Controller, Get, Query } from "@nestjs/common";
import { ApiOperation, ApiQuery, ApiTags } from "@nestjs/swagger";
// import { Authorization } from "../auth/decorators/auth.decorator";
import { ScanService } from "./scan.service";
import { TierEnum, RankEnum, RegionEnum } from "src/db/schema";
import { QueueEnum } from "./types/riotApiTypes";

@ApiTags("scan")
@Controller("scan")
export class ScanController {
  constructor(private readonly scanService: ScanService) {}

  @ApiOperation({ summary: "Start scanning matches and analyze them" })
  @ApiQuery({
    name: "queue",
    enum: QueueEnum.enumValues,
    required: true,
    description: "Queue type",
  })
  @ApiQuery({
    name: "tier",
    enum: TierEnum.enumValues,
    required: true,
    description: "Select the tier",
  })
  @ApiQuery({
    name: "division",
    enum: RankEnum.enumValues,
    required: true,
    description: "Select the division",
  })
  @ApiQuery({
    name: "region",
    enum: RegionEnum.enumValues,
    required: true,
    description: "Select the region",
  })
  @Get("scan-and-analyze")
  getScanAndAnalyze(
    @Query("queue") queue: string,
    @Query("tier") tier: string,
    @Query("division") division: string,
    @Query("region") region: string,
  ): Promise<any> {
    console.log(queue);
    console.log(region);
    console.log(tier);
    console.log(division);
    return this.scanService.getScanAndAnalyze(queue, tier, division, region);
  }
}
