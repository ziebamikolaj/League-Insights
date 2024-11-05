import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { UsersService } from "../users/users.service";
import { JwtService } from "@nestjs/jwt";
import { AccessTokenDto } from "./dto/access-token.dto";
import { errorMessages } from "../utils/error-messages";
import * as bcrypt from "bcrypt";

const SALT_OR_ROUNDS = 12;

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async hashPassword(password: string) {
    return await bcrypt.hash(password, SALT_OR_ROUNDS);
  }

  private async comparePassword(databaseHash: string, password: string) {
    return await bcrypt.compare(password, databaseHash);
  }

  async signIn(email: string, password: string): Promise<AccessTokenDto> {
    const user = await this.usersService.getUserByEmail(email);

    if (!user || !(await this.comparePassword(user.password, password))) {
      throw new UnauthorizedException(errorMessages.UNAUTHORIZED);
    }

    const payload = { sub: user.id, email: user.email };
    return {
      accessToken: await this.jwtService.signAsync(payload),
    };
  }

  async signUp(email: string, password: string): Promise<AccessTokenDto> {
    const user = await this.usersService.getUserByEmail(email);

    if (user) {
      throw new ConflictException(errorMessages.USER_EXIST);
    }

    const passwordHash = await this.hashPassword(password);

    await this.usersService.createUser(email, passwordHash);

    return await this.signIn(email, password);
  }
}
