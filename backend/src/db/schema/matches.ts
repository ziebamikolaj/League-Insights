import { pgTable, text, integer, timestamp } from "drizzle-orm/pg-core";
import { InferSelectModel } from "drizzle-orm";
import { TeamEnum } from "./types/enums";

export const matches = pgTable("matches", {
  matchId: text("match_id").primaryKey(),
  matchDate: timestamp("match_date"),
  winningTeam: TeamEnum("winning_team"),
  blueTeamGold: integer("blue_team_gold"),
  redTeamGold: integer("red_team_gold"),
  blueTeamKills: integer("blue_team_kills"),
  redTeamKills: integer("red_team_kills"),
});

export type MatchInfo = InferSelectModel<typeof matches>;
