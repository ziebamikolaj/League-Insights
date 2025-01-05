import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { HealthcheckModule } from "./healthcheck/healthcheck.module";
import { ConfigModule } from "@nestjs/config";
import { DbModule } from "src/db/db.module";
import { AppLoggerMiddleware } from "src/middlewares/app-logger-middleware";
import { ScanModule } from "./scan/scan.module";
import { StatisticsModule } from "./statistics/statistics.module";
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    HealthcheckModule,
    ScanModule,
    StatisticsModule,
    ConfigModule.forRoot({ isGlobal: true }),
    DbModule.forRoot(),
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(AppLoggerMiddleware).forRoutes("*");
  }
}
