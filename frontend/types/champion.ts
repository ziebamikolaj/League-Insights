export type Trend = "up" | "down" | "neutral";
export type Rank = "S+" | "S" | "A" | "B";

export interface Champion {
  name: string;
  winRate: number;
  pickRate: number;
  banRate: number;
  trend: Trend;
  image: string;
  rank: Rank;
  gamesAnalyzed: number;
}
