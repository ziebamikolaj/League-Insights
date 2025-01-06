"use client";

import { useParams } from "next/navigation";
import { championsDetailedStats } from "@/data/champions/championStatsTest";
import ChampionHeader from "@/components/championsPage/championHeader";
import ChampionPerformance from "@/components/championsPage/championPerformance";
import ChampionFarmingAndEconomy from "@/components/championsPage/championFarming";
import ChampionCombatStats from "@/components/championsPage/championCombatStats";
import ChampionObjectives from "@/components/championsPage/championObjectives";
import ChampionRunes from "@/components/championsPage/championRunes";
import ChampionNavigation from "@/components/championsPage/championNavbar";
import ChampionNavbarFilter from "@/components/championsPage/championNavbarFilter";
import BestMatchups from "@/components/championsPage/championBestMatchups";
import WorstMatchups from "@/components/championsPage/championsWorstMatchups";

const ChampionBackground = ({ championName }: { championName: string }) => {
  const splashArtPath = `/images/championSplashArts/${championName}_0.jpg`;

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div className="relative h-full w-full">
        <img
          src={splashArtPath}
          alt={`${championName} splash art`}
          className="h-full w-full scale-105 object-cover object-center opacity-20 transition-opacity duration-1000"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-900/70 to-transparent" />
        <div className="absolute inset-0 backdrop-blur-[1px]" />

        <div className="absolute inset-0 bg-gray-900/40" />
      </div>
    </div>
  );
};

export default function ChampionPage() {
  const { championName } = useParams();
  const champion = championsDetailedStats.find(
    (champ) => champ.name === championName,
  );

  if (!champion) {
    return <div className="text-center text-white">Champion not found</div>;
  }

  return (
    <>
      <ChampionBackground championName={championName as string} />

      <div className="relative min-h-screen w-full px-4 py-8 text-gray-100">
        <div className="mx-auto max-w-6xl lg:max-w-6xl xl:max-w-6xl">
          <ChampionHeader champion={champion} />
          <ChampionNavigation />
          <ChampionNavbarFilter />
          <div className="mx-auto mt-8 w-full max-w-3xl">
            <ChampionRunes champion={champion} />
          </div>
          <div className="mt-8 w-full">
            <BestMatchups />
            <WorstMatchups />
          </div>
          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2">
            <ChampionPerformance champion={champion} />
            <ChampionFarmingAndEconomy champion={champion} />
            <ChampionCombatStats champion={champion} />
            <ChampionObjectives champion={champion} />
          </div>
        </div>
      </div>
    </>
  );
}
