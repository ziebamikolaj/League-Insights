import { Module } from "@nestjs/common";
import { StatisticsController } from "./statistics.controller";
import { StatisticsService } from "./statistics.service";
import { DbModule } from "../../db/db.module";

@Module({
  imports: [DbModule],
  controllers: [StatisticsController],
  providers: [StatisticsService],
})
export class StatisticsModule {}
