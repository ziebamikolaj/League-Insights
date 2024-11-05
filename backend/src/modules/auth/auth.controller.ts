import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { SignInDto } from "./dto/sign-in.dto";
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from "@nestjs/swagger";
import { AccessTokenDto } from "./dto/access-token.dto";
import { errorMessages } from "../utils/error-messages";
import { SignUpDto } from "./dto/sign-up.dto";

@ApiTags("auth")
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({
    summary: "Sign in user",
  })
  @ApiOkResponse({
    description: "User has been logged in",
    type: AccessTokenDto,
  })
  @ApiBadRequestResponse({
    description: errorMessages.BAD_REQUEST,
  })
  @ApiUnauthorizedResponse({
    description: errorMessages.UNAUTHORIZED,
  })
  @HttpCode(HttpStatus.OK)
  @Post("sign-in")
  async signIn(
    @Body() { email, password }: SignInDto,
  ): Promise<AccessTokenDto> {
    const accessToken = await this.authService.signIn(email, password);

    return accessToken;
  }

  @ApiOperation({
    summary: "Sign up user",
  })
  @ApiOkResponse({
    description: "User has been created",
    type: AccessTokenDto,
  })
  @ApiBadRequestResponse({
    description: errorMessages.BAD_REQUEST,
  })
  @ApiConflictResponse({
    description: errorMessages.USER_EXIST,
  })
  @Post("sign-up")
  async signUp(
    @Body() { email, password }: SignUpDto,
  ): Promise<AccessTokenDto> {
    const accessToken = await this.authService.signUp(email, password);

    return accessToken;
  }
}
