import { Controller, Get } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { ScanService } from "./services/scan.service";

@ApiTags("scan")
@Controller("scan")
export class ScanController {
  constructor(private readonly scanService: ScanService) {}

  @ApiOperation({
    summary:
      "Start scanning matches and analyze them for all regions and ranks",
  })
  @Get("scan-all-regions-and-ranks")
  async getScanAndAnalyzeAllRegionsAndRanks(): Promise<any> {
    await this.scanService.getScanAndAnalyzeAllRegionsAndRanks();
    return { message: "Scanning initiated for all regions and ranks." };
  }
}
