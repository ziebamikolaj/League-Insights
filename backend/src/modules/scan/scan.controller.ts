import { Controller, Get } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { Authorization } from "../auth/decorators/auth.decorator";
import { ScanService } from "./scan.service";

@ApiTags("scan")
@Controller("scan")
export class ScanController {
  constructor(private readonly scanService: ScanService) {}

  @ApiOperation({ summary: "Start scanning matches and analyze them" })
  @Authorization()
  @Get("scan-and-analyze")
  getScanAndAnalyze(): Promise<any> {
    return this.scanService.getScanAndAnalyze();
  }
}
