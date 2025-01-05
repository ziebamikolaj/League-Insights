import {
  Controller,
  Get,
  Param,
  Query,
  ParseIntPipe,
  NotFoundException,
  BadRequestException,
} from "@nestjs/common";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
} from "@nestjs/swagger";
import { StatisticsService } from "./statistics.service";

@ApiTags("statistics")
@Controller("statistics")
export class StatisticsController {
  constructor(private readonly statisticsService: StatisticsService) {}

  @Get("champion/:championId")
  @ApiOperation({ summary: "Get champion statistics" })
  @ApiParam({ name: "championId", type: "number" })
  @ApiResponse({
    status: 200,
    description: "Champion statistics retrieved successfully",
  })
  @ApiResponse({ status: 404, description: "Champion not found" })
  async getChampionStats(
    @Param("championId", ParseIntPipe) championId: number,
  ) {
    try {
      return await this.statisticsService.getChampionStats(championId);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException("Failed to retrieve champion statistics");
    }
  }

  @Get("champion/:championId/game-length/:gameLength")
  @ApiOperation({ summary: "Get champion statistics by game length" })
  @ApiParam({ name: "championId", type: "number" })
  @ApiParam({ name: "gameLength", type: "string" })
  @ApiResponse({
    status: 200,
    description: "Champion statistics by game length retrieved successfully",
  })
  @ApiResponse({ status: 404, description: "Statistics not found" })
  async getChampionStatsByGameLength(
    @Param("championId", ParseIntPipe) championId: number,
    @Param("gameLength") gameLength: string,
  ) {
    try {
      return await this.statisticsService.getChampionStatsByGameLength(
        championId,
        gameLength,
      );
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException(
        "Failed to retrieve champion statistics by game length",
      );
    }
  }

  @Get("champion/:championId/items")
  @ApiOperation({ summary: "Get item statistics for a champion" })
  @ApiParam({ name: "championId", type: "number" })
  @ApiResponse({
    status: 200,
    description: "Item statistics retrieved successfully",
  })
  @ApiResponse({ status: 404, description: "Item statistics not found" })
  async getItemStatsByChampion(
    @Param("championId", ParseIntPipe) championId: number,
  ) {
    try {
      return await this.statisticsService.getItemStatsByChampion(championId);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException(
        "Failed to retrieve item statistics for champion",
      );
    }
  }

  @Get("champions/overall")
  @ApiOperation({ summary: "Get overall champion statistics" })
  @ApiResponse({
    status: 200,
    description: "Overall champion statistics retrieved successfully",
  })
  async getOverallChampionStats() {
    try {
      return await this.statisticsService.getOverallChampionStats();
    } catch (error) {
      throw new BadRequestException(
        "Failed to retrieve overall champion statistics",
      );
    }
  }

  @Get("champions/top")
  @ApiOperation({ summary: "Get top champions by category" })
  @ApiQuery({ name: "category", enum: ["winRate", "pickRate"] })
  @ApiQuery({ name: "limit", type: "number", required: false })
  @ApiResponse({
    status: 200,
    description: "Top champions retrieved successfully",
  })
  @ApiResponse({ status: 400, description: "Invalid category" })
  async getTopChampions(
    @Query("category") category: string,
    @Query("limit", ParseIntPipe) limit: number = 10,
  ) {
    try {
      return await this.statisticsService.getTopChampions(category, limit);
    } catch (error: unknown) {
      if (
        error instanceof Error &&
        error.message.includes("Invalid category")
      ) {
        throw new BadRequestException(error.message);
      }
      throw new BadRequestException("Failed to retrieve top champions");
    }
  }
}

