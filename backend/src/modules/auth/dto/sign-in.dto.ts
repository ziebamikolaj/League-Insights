import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, MaxLength } from "class-validator";
import { MAX_EMAIL_LENGTH, MAX_PASSWORD_LENGTH } from "../constants";

export class SignInDto {
  @ApiProperty({ description: "User email", maxLength: MAX_EMAIL_LENGTH })
  @IsEmail()
  @MaxLength(MAX_EMAIL_LENGTH)
  @IsString()
  email: string;

  @ApiProperty({ description: "User password", maxLength: MAX_PASSWORD_LENGTH })
  @MaxLength(MAX_PASSWORD_LENGTH)
  @IsString()
  password: string;

  constructor(email: string, password: string) {
    this.email = email;
    this.password = password;
  }
}
