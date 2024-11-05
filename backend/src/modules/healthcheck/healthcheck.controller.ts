import { Controller, Get } from "@nestjs/common";
import { ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";

@ApiTags("healthcheck")
@Controller("healthcheck")
export class HealthcheckController {
  @ApiOperation({
    summary: "Api healthcheck",
  })
  @ApiOkResponse({
    description: "Return true when api is live",
    type: Boolean,
  })
  @Get("")
  healthcheck() {
    return true;
  }
}
