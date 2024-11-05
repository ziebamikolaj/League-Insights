import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { HealthcheckModule } from "./healthcheck/healthcheck.module";
import { UsersModule } from "./users/users.module";
import { AuthModule } from "./auth/auth.module";
import { ConfigModule } from "@nestjs/config";
import { DbModule } from "src/db/db.module";
import { AppLoggerMiddleware } from "src/middlewares/app-logger-middleware";

@Module({
  imports: [
    HealthcheckModule,
    UsersModule,
    AuthModule,
    ConfigModule.forRoot({ isGlobal: true }),
    DbModule.forRoot(),
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(AppLoggerMiddleware).forRoutes("*");
  }
}
