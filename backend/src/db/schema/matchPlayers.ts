import { pgTable, text, integer, bigserial, json } from "drizzle-orm/pg-core";
import { InferSelectModel } from "drizzle-orm";
import { matchesTable } from "./matches";
import { playersTable } from "./players";

export const matchPlayersTable = pgTable("match_players", {
  matchPlayerId: bigserial("match_player_id", { mode: "number" }).primaryKey(),
  matchId: text("match_id")
    .references(() => matchesTable.matchId)
    .notNull(),
  puuid: text("puuid")
    .references(() => playersTable.puuid)
    .notNull(),
  summonerId: text("summoner_id"),
  team: text("team"),
  kills: integer("kills"),
  deaths: integer("deaths"),
  assists: integer("assists"),
  damageDealt: integer("damage_dealt"),
  level: integer("level"),
  csCount: integer("cs_count"),
  killParticipation: integer("kill_participation"),
  skillshotsDodged: integer("skillshots_dodged"),
  skillshotsHit: integer("skillshots_hit"),
  soloKills: integer("solo_kills"),
  stealthWardsPlaced: integer("stealth_wards_placed"),
  firstTurret: integer("first_turret"),
  takedowns: integer("takedowns"),
  teamBaronKills: integer("team_baron_kills"),
  teamRiftHeraldKills: integer("team_rift_herald_kills"),
  teamElderDragonKills: integer("team_elder_dragon_kills"),
  teamDragonKills: integer("team_dragon_kills"),
  percentTeamDamageDealt: integer("percent_team_damage_dealt"),
  percentTeamDamageTaken: integer("percent_team_damage_taken"),
  wardTakedownsBefore20Mins: integer("ward_takedowns_before_20_mins"),
  killingSprees: integer("killing_sprees"),
  longestTimeSpentLiving: integer("longest_time_spent_living"),
  largestCritStrike: integer("largest_critical_strike"),
  largestKillingSpree: integer("largest_killing_spree"),
  largestMultikill: integer("largest_multikill"),
  timeCcingOthers: integer("time_ccing_others"),
  spell1Casts: integer("spell_1_casts"), // Q casts
  spell2Casts: integer("spell_2_casts"), // W casts
  spell3Casts: integer("spell_3_casts"), // E casts
  spell4Casts: integer("spell_4_casts"), // R casts
  totalTimeSpentDead: integer("total_time_spent_dead"),
  timePlayed: integer("time_played"),
  controlWardsPlaced: integer("control_wards_placed"),
  controlWardsTimeCoverage: integer("control_wards_time_coverage"),
  firstDragonTime: integer("first_dragon_time"),
  earlyGoldAdvantage: integer("early_gold_advantage"),
  earlyExpAdvantage: integer("early_exp_advantage"),
  killsNearEnemyTurret: integer("kills_near_enemy_turret"),
  killsUnderOwnTurret: integer("kills_under_own_turret"),
  csFirst10Mins: integer("cs_first_10_mins"),
  maxCsAdvantageOnLaneOpponent: integer("max_cs_advantage_on_lane_opponent"),
  maxLevelLeadOnLaneOpponent: integer("max_level_lead_on_lane_opponent"),
  killsWhileOutnumbered: integer("kills_while_outnumbered"),
  soloBaronKills: integer("solo_baron_kills"),
  championLevelEnd: integer("champion_level_end"),
  goldSpent: integer("gold_spent"),
  goldEarned: integer("gold_earned"),
  perks: json("perks"),
  styles: json("styles"),
  killsAfterHiddenWithAlly: integer("kills_after_hidden_with_ally"),
  skillshotsHitEarlyGame: integer("skillshots_hit_early_game"),
  turretsTakenBefore10Mins: integer("turrets_taken_before_10_mins"),
  firstAce: integer("first_ace"),
  gameEndedSurrender: integer("game_ended_surrender"),
  gameEndedEarlySurrender: integer("game_ended_early_surrender"),
  enemyChampionImmobilizations: integer("enemy_champion_immobilizations"),
});

export type MatchPlayersInfo = InferSelectModel<typeof matchPlayersTable>;
