import { Injectable, Logger } from "@nestjs/common";
import { and, eq } from "drizzle-orm";
import {
  formatError,
  ErrorMessages,
} from "src/common/constants/error-messages";
import { InternalServerError } from "src/common/constants/http-errors";
import { ParticipantDto } from "src/common/types/participant.dto";
import { DbService } from "src/db/db.service";
import {
  playerItemsTable,
  itemsByChampionTable,
  ItemsByChampionInfo,
} from "src/db/schema";

@Injectable()
export class ItemStatsService {
  private readonly logger = new Logger(ItemStatsService.name);

  constructor(private readonly dbService: DbService) {}

  async processPlayerItems(participant: ParticipantDto, matchPlayerId: number) {
    try {
      const itemIds = [
        participant.item0,
        participant.item1,
        participant.item2,
        participant.item3,
        participant.item4,
        participant.item5,
        participant.item6,
      ].filter((itemId) => itemId && itemId > 0);

      if (itemIds.length === 0) {
        return;
      }

      const playerItems = itemIds.map((itemId) => ({
        matchPlayerId: BigInt(matchPlayerId),
        itemId,
      }));
      await this.dbService.client.insert(playerItemsTable).values(playerItems);
    } catch (error: any) {
      this.logger.error(
        formatError(
          ErrorMessages.stats.item.update.failed(
            participant.championId.toString(),
            participant.item0?.toString() || "unknown",
          ),
          error.stack,
        ),
      );
      throw new InternalServerError(
        ErrorMessages.stats.item.update.failed(
          participant.championId.toString(),
          participant.item0?.toString() || "unknown",
        ),
      );
    }
  }

  async updateItemsByChampion(participant: ParticipantDto) {
    try {
      const championId = participant.championId;
      const winIncrement = participant.win ? 1 : 0;
      const lossIncrement = participant.win ? 0 : 1;
      const itemIds = [
        participant.item0,
        participant.item1,
        participant.item2,
        participant.item3,
        participant.item4,
        participant.item5,
        participant.item6,
      ].filter((itemId) => itemId && itemId > 0);

      for (const itemId of itemIds) {
        const existingRecord = await this.dbService.client
          .select()
          .from(itemsByChampionTable)
          .where(
            and(
              eq(itemsByChampionTable.championId, championId.toString()),
              eq(itemsByChampionTable.itemId, itemId),
            ),
          );

        if (existingRecord.length > 0) {
          await this.updateExistingItemStats(
            existingRecord[0] as ItemsByChampionInfo,
            winIncrement,
            lossIncrement,
          );
        } else {
          await this.createNewItemStats(
            championId,
            itemId,
            winIncrement,
            lossIncrement,
          );
        }
      }
    } catch (error: any) {
      this.logger.error(
        formatError(
          ErrorMessages.stats.item.update.failed(
            participant.championId.toString(),
            participant.item0?.toString() || "unknown",
          ),
          error.stack,
        ),
      );
      throw new InternalServerError(
        ErrorMessages.stats.item.update.failed(
          participant.championId.toString(),
          participant.item0?.toString() || "unknown",
        ),
      );
    }
  }

  private async updateExistingItemStats(
    record: ItemsByChampionInfo,
    winIncrement: number,
    lossIncrement: number,
  ) {
    const updatedRecord = {
      wins: Number((record.wins ?? 0) + winIncrement),
      losses: Number((record.losses ?? 0) + lossIncrement),
    };
    await this.dbService.client
      .update(itemsByChampionTable)
      .set(updatedRecord)
      .where(eq(itemsByChampionTable.id, record.id));
  }

  private async createNewItemStats(
    championId: number,
    itemId: number,
    winIncrement: number,
    lossIncrement: number,
  ) {
    const newRecord = {
      championId: championId.toString(),
      itemId,
      wins: winIncrement,
      losses: lossIncrement,
    };
    await this.dbService.client.insert(itemsByChampionTable).values(newRecord);
  }
}
