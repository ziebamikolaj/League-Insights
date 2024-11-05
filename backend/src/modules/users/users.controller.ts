import { Controller, Get } from "@nestjs/common";
import { Authorization } from "../auth/decorators/auth.decorator";
import { ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import { UserInfo } from "src/db/schema";
import { User } from "./decorators/user.decorator";
import { GetMeDto } from "./dto/get-me.dto";
import { UsersService } from "./users.service";

@ApiTags("users")
@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({
    summary: "Get current user info",
  })
  @ApiOkResponse({
    type: GetMeDto,
  })
  @Authorization()
  @Get("me")
  getProfile(@User() user: UserInfo): Promise<GetMeDto> {
    return this.usersService.getMe(user);
  }
}
