import {
  pgTable,
  text,
  integer,
  bigserial,
  json,
  numeric,
  boolean,
} from "drizzle-orm/pg-core";
import { InferSelectModel } from "drizzle-orm";
import { matchesTable } from "./matches";
import { playersTable } from "./players";
import { RoleEnum } from "./types/enums";

export const matchPlayersTable = pgTable("match_players", {
  matchPlayerId: bigserial("match_player_id", { mode: "number" }).primaryKey(),
  matchId: text("match_id")
    .references(() => matchesTable.matchId)
    .notNull(),
  puuid: text("puuid")
    .references(() => playersTable.puuid)
    .notNull(),
  summonerId: text("summoner_id"),
  summonerName: text("summoner_name"),
  team: text("team"),
  championId: integer("champion_id"),
  championName: text("champion_name"),
  teamPosition: RoleEnum("team_position"),

  win: boolean("win"),

  kills: integer("kills"),
  deaths: integer("deaths"),
  assists: integer("assists"),

  magicDamageDealt: integer("magic_damage_dealt"),
  magicDamageDealtToChampions: integer("magic_damage_dealt_to_champions"),
  magicDamageTaken: integer("magic_damage_taken"),

  physicalDamageDealt: integer("physical_damage_dealt"),
  physicalDamageDealtToChampions: integer("physical_damage_dealt_to_champions"),
  physicalDamageTaken: integer("physical_damage_taken"),

  trueDamageDealt: integer("true_damage_dealt"),
  trueDamageDealtToChampions: integer("true_damage_dealt_to_champions"),
  trueDamageTaken: integer("true_damage_taken"),

  damageDealtToBuildings: integer("damage_dealt_to_buildings"),
  damageDealtToObjectives: integer("damage_dealt_to_objectives"),
  damageDealtToTurrets: integer("damage_dealt_to_turrets"),

  totalDamageDealt: integer("total_damage_dealt"),
  totalDamageDealtToChampions: integer("total_damage_dealt_to_champions"),
  totalDamageTaken: integer("total_damage_taken"),
  damageSelfMitigated: integer("damage_self_mitigated"),

  champLevel: integer("champ_level"),
  neutralMinionsKilled: integer("neutral_minions_killed"),
  totalMinionsKilled: integer("total_minions_killed"),

  killParticipation: numeric("kill_participation", { precision: 3, scale: 2 }),
  skillshotsDodged: integer("skillshots_dodged"),
  skillshotsHit: integer("skillshots_hit"),
  soloKills: integer("solo_kills"),
  stealthWardsPlaced: integer("stealth_wards_placed"),
  firstTurretKilled: integer("first_turret_killed"),

  takedowns: integer("takedowns"),
  teamBaronKills: integer("team_baron_kills"),
  teamRiftHeraldKills: integer("team_rift_herald_kills"),
  teamElderDragonKills: integer("team_elder_dragon_kills"),

  wardTakedownsBefore20M: integer("ward_takedowns_before_20_m"),
  killingSprees: integer("killing_sprees"),
  longestTimeSpentLiving: integer("longest_time_spent_living"),
  largestCriticalStrike: integer("largest_critical_strike"),
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
  killsNearEnemyTurret: integer("kills_near_enemy_turret"),
  killsUnderOwnTurret: integer("kills_under_own_turret"),
  laneMinionsFirst10Minutes: integer("lane_minions_first_10_minutes"),
  mmaxCsAdvantageOnLaneOpponent: numeric("max_cs_advantage_on_lane_opponent", {
    precision: 10,
    scale: 2,
  }),
  maxLevelLeadLaneOpponent: integer("max_level_lead_lane_opponent"),
  outnumberedKills: integer("outnumbered_kills"),
  soloBaronKills: integer("solo_baron_kills"),
  goldSpent: integer("gold_spent"),
  goldEarned: integer("gold_earned"),
  perks: json("perks"),
  styles: json("styles"),
  killAfterHiddenWithAlly: integer("kill_after_hidden_with_ally"),
  gameEndedInSurrender: boolean("game_ended_in_surrender"),
  gameEndedInEarlySurrender: boolean("game_ended_in_early_surrender"),
  enemyChampionImmobilizations: integer("enemy_champion_immobilizations"),

  doubleKills: integer("double_kills"),
  tripleKills: integer("triple_kills"),
  quadraKills: integer("quadra_kills"),
  pentaKills: integer("penta_kills"),
});

export type MatchPlayersInfo = InferSelectModel<typeof matchPlayersTable>;
