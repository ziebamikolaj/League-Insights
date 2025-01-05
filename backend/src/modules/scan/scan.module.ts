import { Module } from "@nestjs/common";
import { ScanService } from "./services/scan.service";
import { PlayerService } from "./services/player.service";
import { MatchService } from "./services/match.service";
import { ChampionStatsService } from "./services/champion-stats.service";
import { ItemStatsService } from "./services/item-stats.service";
import { ApiService } from "./services/api.service";
import { RateLimiterService } from "./services/rate-limiter.service";
import { DbModule } from "src/db/db.module";
import { ScanController } from "./scan.controller";

@Module({
  controllers: [ScanController],
  imports: [DbModule],
  providers: [
    ScanService,
    PlayerService,
    MatchService,
    ChampionStatsService,
    ItemStatsService,
    ApiService,
    RateLimiterService,
  ],
})
export class ScanModule {}
