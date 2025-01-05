"use client";

import { useParams } from "next/navigation";
import { championsDetailedStats } from "@/data/champions/championStatsTest";
import ChampionHeader from "@/components/championsPage/championHeader";
import ChampionPerformance from "@/components/championsPage/championPerformance";
import ChampionFarmingAndEconomy from "@/components/championsPage/championFarming";
import ChampionCombatStats from "@/components/championsPage/championCombatStats";
import ChampionObjectives from "@/components/championsPage/championObjectives";
import ChampionRunes from "@/components/championsPage/championRunes";

export default function ChampionPage() {
  const { championName } = useParams();
  const champion = championsDetailedStats.find(
    (champ) => champ.name === championName,
  );

  if (!champion) {
    return <div className="text-center text-white">Champion not found</div>;
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-900 to-gray-800 px-4 py-8 text-gray-100">
      <div className="mx-auto max-w-6xl lg:max-w-6xl xl:max-w-6xl">
        <ChampionHeader champion={champion} />

        {/* Centered Runes Section */}
        <div className="mx-auto mt-8 w-full max-w-3xl">
          <ChampionRunes champion={champion} />
        </div>

        {/* Two-Column Section Layout */}

        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2">
          <ChampionPerformance champion={champion} />
          <ChampionFarmingAndEconomy champion={champion} />
          <ChampionCombatStats champion={champion} />
          <ChampionObjectives champion={champion} />
        </div>
      </div>
    </div>
  );
}

function SectionHeader({
  title,
  description,
}: Readonly<{
  title: string;
  description?: string;
}>) {
  return (
    <div className="mb-4">
      <h2 className="text-2xl font-bold text-stone-100">{title}</h2>
      {description && <p className="text-sm text-gray-500">{description}</p>}
    </div>
  );
}
