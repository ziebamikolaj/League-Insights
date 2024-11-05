import { Test, TestingModule } from "@nestjs/testing";
import { AuthService } from "./auth.service";
import { UsersService } from "../users/users.service";
import { JwtModule } from "@nestjs/jwt";
import { DbService } from "src/db/db.service";
import { randomBytes } from "crypto";
import { ConflictException, UnauthorizedException } from "@nestjs/common";
import { JWT_AGE_IN_DAYS } from "./constants";

const randomEmail = () => {
  return `test+${randomBytes(16).toString("hex")}@test.com`;
};

describe("AuthService", () => {
  let authService: AuthService;
  let usersService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService, UsersService, DbService],
      imports: [
        JwtModule.register({
          global: true,
          secret: process.env.JWT_SECRET,
          signOptions: { expiresIn: `${JWT_AGE_IN_DAYS}d` },
        }),
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    usersService = module.get<UsersService>(UsersService);
  });

  it("should be defined", () => {
    expect(authService).toBeDefined();
  });

  describe("signIn", () => {
    const TESTING_USER_EMAIL = randomEmail();
    const TESTING_USER_PASSWORD = "password123";
    const INVALID_PASSWORD = "password124";

    beforeAll(async () => {
      // Arrange
      const passwordHash = await authService.hashPassword(
        TESTING_USER_PASSWORD,
      );
      await usersService.createUser(TESTING_USER_EMAIL, passwordHash);
    });

    it("should return an access token for existing user", async () => {
      // Act
      const result = await authService.signIn(
        TESTING_USER_EMAIL,
        TESTING_USER_PASSWORD,
      );

      // Assert
      expect(result).toBeDefined();
      expect(result.accessToken).toBeDefined();
    });

    it("should throw unauthorized exception if no user is found", async () => {
      // Act
      const result = authService.signIn(randomEmail(), TESTING_USER_PASSWORD);

      // Assert
      await expect(result).rejects.toThrow(UnauthorizedException);
    });

    it("should throw unauthorized exception when invalid password for existing user is provided", async () => {
      // Act
      const result = authService.signIn(TESTING_USER_EMAIL, INVALID_PASSWORD);

      // Assert
      await expect(result).rejects.toThrow(UnauthorizedException);
    });
  });

  describe("signUp", () => {
    // Arrange
    const newTestingUserEmail = randomEmail();
    const newTestingUserPassword = "password123";

    it("should create new user when correct email and password is provided and return his accessToken", async () => {
      // Act
      const result = await authService.signUp(
        newTestingUserEmail,
        newTestingUserPassword,
      );

      // Assert
      expect(result).toBeDefined();
      expect(result.accessToken).toBeDefined();
    });

    it("should throw conflict exception when creating new user with same credentials", async () => {
      // Act
      const result = authService.signUp(
        newTestingUserEmail,
        newTestingUserPassword,
      );

      // Assert
      await expect(result).rejects.toThrow(ConflictException);
    });
  });
});
