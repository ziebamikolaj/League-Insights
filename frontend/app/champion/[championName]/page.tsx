"use client";
import { useParams } from "next/navigation";
// import championData from "@/data/champions/championsTestData";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import championAvatars from "@/data/champions/championAvatar";
import { getRankColor, getRankColorBorder } from "@/lib/utils/colorFunctions";
import { championsDetailedStats } from "@/data/champions/championStatsTest";
import { Stat } from "@/components/stat";
import { DamageTypeChart } from "@/components/damageType";

export default function ChampionPage() {
  const { championName } = useParams();

  // Find the champion data based on the name
  // const champion = Object.values(championData)
  //   .flat()
  //   .find((champ) => champ.name === championName);

  const champion = championsDetailedStats.find(
    (champ) => champ.name === championName,
  );

  if (!champion) {
    return <div className="text-center text-white">Champion not found</div>;
  }

  return (
    <div className="relative min-h-screen w-full bg-gray-900 p-8 text-white">
      <div className="flex flex-col items-start space-y-4 md:flex-row md:items-center md:space-x-8 md:space-y-0">
        <Image
          src={championAvatars[champion.name]}
          alt={champion.name}
          width={160}
          height={160}
          className={`rounded-lg ring-2 ${getRankColorBorder(champion.rank)}`}
        />
        <div>
          <h1 className="mb-2 text-4xl font-bold text-blue-400">
            {champion.name}
          </h1>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
            <Stat label="Win Rate" value={`${champion.winRatio}%`} />
            <Stat label="Pick Rate" value={`${champion.pickRate}%`} />
            <Stat label="Ban Rate" value={`${champion.banRate}%`} />
            <Stat label="KDA" value={champion.kdaRatio.toFixed(2)} />
            <Stat label="CS/min" value={champion.csPerMinute.toFixed(1)} />
            <Stat label="Gold/min" value={champion.gpm} />
          </div>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2">
        <Card className="border-gray-700 bg-gray-800">
          <CardHeader>
            <CardTitle className="text-blue-400">Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Stat
                label="Avg. Kills"
                value={champion.averageKills.toFixed(1)}
              />
              <Stat
                label="Avg. Deaths"
                value={champion.averageDeaths.toFixed(1)}
              />
              <Stat
                label="Avg. Assists"
                value={champion.averageAssists.toFixed(1)}
              />
              <Stat
                label="Kill Participation"
                value={`${champion.averageKillParticipation}%`}
              />
              <Stat
                label="First Blood Participation"
                value={`${champion.averageFirstBloodParticipation}%`}
              />
            </div>
          </CardContent>
        </Card>

        <Card className="border-gray-700 bg-gray-800">
          <CardHeader>
            <CardTitle className="text-blue-400">Farming & Economy</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Stat label="CS/Game" value={champion.csPerGame} />
              <Stat
                label="Gold/Game"
                value={champion.goldEarnedPerGame.toLocaleString()}
              />
              <Stat
                label="Avg. Game Duration"
                value={`${champion.averageGameDuration} min`}
              />
              <Stat
                label="Turret Plates Taken"
                value={champion.turretPlatesTaken}
              />
            </div>
          </CardContent>
        </Card>

        <Card className="border-gray-700 bg-gray-800">
          <CardHeader>
            <CardTitle className="text-blue-400">Combat Stats</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Stat
                label="Damage Dealt/Game"
                value={champion.damageDealtPerGame.toLocaleString()}
              />
              <Stat
                label="Damage Taken/Game"
                value={champion.damageTakenPerGame.toLocaleString()}
              />
              <Stat
                label="Healing Done/Game"
                value={champion.healingDonePerGame.toLocaleString()}
              />
              <Stat
                label="Shielding Done/Game"
                value={champion.shieldingDonePerGame.toLocaleString()}
              />
              <Stat label="CC Score/Game" value={champion.ccScorePerGame} />
            </div>
          </CardContent>
        </Card>

        <Card className="border-gray-700 bg-gray-800">
          <CardHeader>
            <CardTitle className="text-blue-400">Objectives</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Stat
                label="Dragon Kills"
                value={champion.dragonKills.toFixed(1)}
              />
              <Stat
                label="Baron Kills"
                value={champion.baronKills.toFixed(1)}
              />
              <Stat
                label="Rift Herald Kills"
                value={champion.riftHeraldKills.toFixed(1)}
              />
              <Stat
                label="Turret Takedowns"
                value={champion.turretsTakedowns}
              />
              <Stat label="Voidgrubs Taken" value={champion.voidgrubsTaken} />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-8 border-gray-700 bg-gray-800">
        <CardHeader>
          <CardTitle className="text-blue-400">Damage Distribution</CardTitle>
          <DamageTypeChart />
        </CardHeader>
      </Card>
    </div>
  );
}
