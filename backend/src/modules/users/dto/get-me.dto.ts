import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, MaxLength } from "class-validator";
import { MAX_EMAIL_LENGTH } from "src/modules/auth/constants";

export class GetMeDto {
  @ApiProperty({
    description: "Current user email",
    maxLength: MAX_EMAIL_LENGTH,
  })
  @IsEmail()
  @IsString()
  @MaxLength(MAX_EMAIL_LENGTH)
  email: string;

  constructor(email: string) {
    this.email = email;
  }
}
