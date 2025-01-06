import ChampionMatchupCard from "./championMatchupCard";

const worstMatchupsData = [
  { championName: "Teemo", winRatio: 40.5, matches: 1350 },
  { championName: "Yasuo", winRatio: 42.2, matches: 2200 },
  { championName: "Illaoi", winRatio: 43.8, matches: 890 },
  { championName: "Darius", winRatio: 44.5, matches: 1760 },
  { championName: "Pantheon", winRatio: 45.1, matches: 950 },
  { championName: "Fiora", winRatio: 45.8, matches: 1480 },
  { championName: "Riven", winRatio: 46.3, matches: 1620 },
  { championName: "Garen", winRatio: 47.0, matches: 1100 },
];

export default function WorstMatchups() {
  const sortedMatchups = [...worstMatchupsData].toSorted(
    (a, b) => a.winRatio - b.winRatio,
  );

  return (
    <div className="w-full p-4">
      <h3 className="mb-4 text-lg font-medium text-white">Worst Matchups</h3>
      <div className="flex justify-between flex-nowrap gap-4 overflow-x-auto">
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
