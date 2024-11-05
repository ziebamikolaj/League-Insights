import { Injectable } from "@nestjs/common";
import { eq } from "drizzle-orm";
import { DbService } from "src/db/db.service";
import { UserInfo, users } from "src/db/schema";
import { GetMeDto } from "./dto/get-me.dto";

@Injectable()
export class UsersService {
  constructor(private readonly dbService: DbService) {}

  async getUserByEmail(email: string) {
    return await this.dbService.client
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1)
      .then((row) => row.at(0));
  }

  async createUser(email: string, password: string) {
    return await this.dbService.client
      .insert(users)
      .values({ email, password });
  }

  async getMe({ email }: UserInfo): Promise<GetMeDto> {
    return {
      email,
    };
  }
}
