import { pgEnum } from "drizzle-orm/pg-core";

export const TeamEnum = pgEnum("team_enum", ["BLUE", "RED"]);
export const RankEnum = pgEnum("rank_enum", ["I", "II", "III", "IV"]);
export const TierEnum = pgEnum("tier_enum", [
  "IRON",
  "BRONZE",
  "SILVER",
  "GOLD",
  "PLATINUM",
  "EMERALD",
  "DIAMOND",
  "MASTER",
  "GRANDMASTER",
  "CHALLENGER",
]);
export const RegionEnum = pgEnum("region_enum", [
  "BR1",
  "EUN1",
  "EUW1",
  "JP1",
  "KR",
  "LA1",
  "LA2",
  "ME1",
  "NA1",
  "OC1",
  "PH2",
  "RU",
  "SG2",
  "TH2",
  "TR1",
  "TW2",
  "VN2",
]);
export const RoleEnum = pgEnum("role_enum", [
  "TOP",
  "JUNGLE",
  "MIDDLE",
  "BOTTOM",
  "UTILITY",
  "Invalid",
  "",
]);

export type RankEnumType = (typeof RankEnum)["enumValues"][number];
export type TierEnumType = (typeof TierEnum)["enumValues"][number];
export type RegionEnumType = (typeof RegionEnum)["enumValues"][number];
