import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class DefaultApiResponseDto {
  @ApiProperty({ description: "Default api response" })
  @IsString()
  message: string;

  constructor(message: string) {
    this.message = message;
  }
}
