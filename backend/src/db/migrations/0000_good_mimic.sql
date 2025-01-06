DO $$ BEGIN
 CREATE TYPE "public"."rank_enum" AS ENUM('I', 'II', 'III', 'IV');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."region_enum" AS ENUM('BR1', 'EUN1', 'EUW1', 'JP1', 'KR', 'LA1', 'LA2', 'ME1', 'NA1', 'OC1', 'PH2', 'RU', 'SG2', 'TH2', 'TR1', 'TW2', 'VN2');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."role_enum" AS ENUM('TOP', 'JUNGLE', 'MIDDLE', 'BOTTOM', 'UTILITY', 'Invalid', '');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."team_enum" AS ENUM('BLUE', 'RED');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."tier_enum" AS ENUM('IRON', 'BRONZE', 'SILVER', 'GOLD', 'PLATINUM', 'EMERALD', 'DIAMOND', 'MASTER', 'GRANDMASTER', 'CHALLENGER');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "champion_stats" (
	"champion_id" bigint PRIMARY KEY NOT NULL,
	"total_minutes_in_matches" bigint,
	"total_wins" bigint,
	"total_losses" bigint,
	"total_kills" bigint,
	"total_deaths" bigint,
	"total_assists" bigint,
	"total_gold_earned" bigint,
	"total_gold_spent" bigint,
	"total_damage_dealt" bigint,
	"total_damage_taken" bigint,
	"total_healing_done" bigint,
	"total_shielding_done" bigint,
	"total_creep_score" bigint,
	"total_vision_score" bigint,
	"total_wards_placed" bigint,
	"total_wards_destroyed" bigint,
	"total_crowd_control_score" bigint,
	"total_kill_participation" numeric(10, 2),
	"total_damage_percent" numeric(10, 4),
	"total_gold_per_minute" numeric(10, 2),
	"total_cs_per_minute" numeric(10, 2)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "champion_stats_by_time_bucket" (
	"champion_id" text NOT NULL,
	"time_bucket" text NOT NULL,
	"wins" bigint NOT NULL,
	"losses" bigint NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "items_by_champion" (
	"id" serial PRIMARY KEY NOT NULL,
	"champion_id" text NOT NULL,
	"item_id" integer NOT NULL,
	"wins" integer DEFAULT 0 NOT NULL,
	"losses" integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "matches" (
	"match_id" text PRIMARY KEY NOT NULL,
	"match_date" timestamp,
	"winning_team" "team_enum",
	"blue_team_gold" integer,
	"red_team_gold" integer,
	"blue_team_kills" integer,
	"red_team_kills" integer,
	"game_duration" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "match_players" (
	"match_player_id" bigserial PRIMARY KEY NOT NULL,
	"match_id" text NOT NULL,
	"puuid" text NOT NULL,
	"summoner_id" text,
	"summoner_name" text,
	"team" text,
	"champion_id" integer,
	"champion_name" text,
	"team_position" "role_enum",
	"win" boolean,
	"kills" integer,
	"deaths" integer,
	"assists" integer,
	"magic_damage_dealt" integer,
	"magic_damage_dealt_to_champions" integer,
	"magic_damage_taken" integer,
	"physical_damage_dealt" integer,
	"physical_damage_dealt_to_champions" integer,
	"physical_damage_taken" integer,
	"true_damage_dealt" integer,
	"true_damage_dealt_to_champions" integer,
	"true_damage_taken" integer,
	"damage_dealt_to_buildings" integer,
	"damage_dealt_to_objectives" integer,
	"damage_dealt_to_turrets" integer,
	"total_damage_dealt" integer,
	"total_damage_dealt_to_champions" integer,
	"total_damage_taken" integer,
	"damage_self_mitigated" integer,
	"champ_level" integer,
	"neutral_minions_killed" integer,
	"total_minions_killed" integer,
	"kill_participation" numeric(3, 2),
	"skillshots_dodged" integer,
	"skillshots_hit" integer,
	"solo_kills" integer,
	"stealth_wards_placed" integer,
	"first_turret_killed" integer,
	"takedowns" integer,
	"team_baron_kills" integer,
	"team_rift_herald_kills" integer,
	"team_elder_dragon_kills" integer,
	"ward_takedowns_before_20_m" integer,
	"killing_sprees" integer,
	"longest_time_spent_living" integer,
	"largest_critical_strike" integer,
	"largest_killing_spree" integer,
	"largest_multikill" integer,
	"time_ccing_others" integer,
	"spell_1_casts" integer,
	"spell_2_casts" integer,
	"spell_3_casts" integer,
	"spell_4_casts" integer,
	"total_time_spent_dead" integer,
	"time_played" integer,
	"control_wards_placed" integer,
	"kills_near_enemy_turret" integer,
	"kills_under_own_turret" integer,
	"lane_minions_first_10_minutes" integer,
	"max_cs_advantage_on_lane_opponent" numeric(10, 2),
	"max_level_lead_lane_opponent" integer,
	"outnumbered_kills" integer,
	"solo_baron_kills" integer,
	"gold_spent" integer,
	"gold_earned" integer,
	"perks" json,
	"styles" json,
	"kill_after_hidden_with_ally" integer,
	"game_ended_in_surrender" boolean,
	"game_ended_in_early_surrender" boolean,
	"enemy_champion_immobilizations" integer,
	"double_kills" integer,
	"triple_kills" integer,
	"quadra_kills" integer,
	"penta_kills" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "player_items" (
	"player_item_id" serial PRIMARY KEY NOT NULL,
	"match_player_id" bigint NOT NULL,
	"item_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "players" (
	"puuid" text PRIMARY KEY NOT NULL,
	"summoner_id" text,
	"region" "region_enum" NOT NULL,
	"profile_icon_id" integer,
	"summoner_level" integer,
	"analyzed_on" timestamp DEFAULT now(),
	"solo_queue_tier" "tier_enum",
	"solo_queue_rank" "rank_enum",
	"solo_queue_league_points" integer,
	"solo_queue_wins" integer,
	"solo_queue_loses" integer,
	"solo_queue_inactive" boolean,
	"solo_queue_fresh_blood" boolean,
	"solo_queue_hot_streak" boolean,
	"flex_queue_tier" "tier_enum",
	"flex_queue_rank" "rank_enum",
	"flex_queue_league_points" integer,
	"flex_queue_wins" integer,
	"flex_queue_loses" integer,
	"flex_queue_inactive" boolean,
	"flex_queue_fresh_blood" boolean,
	"flex_queue_hot_streak" boolean,
	CONSTRAINT "players_puuid_unique" UNIQUE("puuid")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" text NOT NULL,
	"password" text NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "match_players" ADD CONSTRAINT "match_players_match_id_matches_match_id_fk" FOREIGN KEY ("match_id") REFERENCES "public"."matches"("match_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "match_players" ADD CONSTRAINT "match_players_puuid_players_puuid_fk" FOREIGN KEY ("puuid") REFERENCES "public"."players"("puuid") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "player_items" ADD CONSTRAINT "player_items_match_player_id_match_players_match_player_id_fk" FOREIGN KEY ("match_player_id") REFERENCES "public"."match_players"("match_player_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
