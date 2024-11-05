import { applyDecorators, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { AuthGuard } from "../auth.guard";
import { errorMessages } from "src/modules/utils/error-messages";

export function Authorization() {
  return applyDecorators(
    UseGuards(AuthGuard),
    ApiBearerAuth(),
    ApiUnauthorizedResponse({ description: errorMessages.UNAUTHORIZED }),
  );
}
