import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class AccessTokenDto {
  @ApiProperty({ description: "User JWT access token" })
  @IsString()
  accessToken: string;

  constructor(accessToken: string) {
    this.accessToken = accessToken;
  }
}
