import ChampionMatchupCard from "./championMatchupCard";

const bestMatchupsData = [
  { championName: "Aatrox", winRatio: 60.55, matches: 1200 },
  { championName: "Ahri", winRatio: 58.78, matches: 1850 },
  { championName: "Akali", winRatio: 57.92, matches: 980 },
  { championName: "Alistar", winRatio: 57.33, matches: 760 },
  { championName: "Ashe", winRatio: 56.8, matches: 2100 },
  { championName: "Jinx", winRatio: 56.12, matches: 1540 },
  { championName: "Zed", winRatio: 55.45, matches: 1320 },
  { championName: "Master Yi", winRatio: 54.98, matches: 680 },
];

export default function BestMatchups() {
  const sortedMatchups = bestMatchupsData.sort(
    (a, b) => b.winRatio - a.winRatio,
  );

  return (
    <div className="w-full p-4">
      <p className="mb-4 text-lg font-medium text-white">Best Matchups</p>
      <div className="flex flex-nowrap justify-between gap-4 overflow-x-auto">
        {" "}
        {sortedMatchups.map((matchup) => (
          <ChampionMatchupCard
            key={matchup.championName}
            championName={matchup.championName}
            winRatio={matchup.winRatio}
            matches={matchup.matches}
          />
        ))}
      </div>
    </div>
  );
}
