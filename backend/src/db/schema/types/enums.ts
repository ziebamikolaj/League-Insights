import { pgEnum } from "drizzle-orm/pg-core";

export const TeamEnum = pgEnum("team_enum", ["Blue", "Red"]);
export const RankEnum = pgEnum("rank_enum", ["I", "II", "III", "IV"]);
export const TierEnum = pgEnum("tier_enum", [
  "Iron",
  "Bronze",
  "Silver",
  "Gold",
  "Platinum",
  "Diamond",
  "Master",
  "Grandmaster",
  "Challenger",
]);
export const RegionEnum = pgEnum("region_enum", [
  "NA",
  "EUW",
  "EUNE",
  "KR",
  "JP",
  "BR",
  "LAN",
  "LAS",
  "OCE",
  "RU",
  "TR",
]);
