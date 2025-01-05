import Image from "next/image";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import runesData from "@/data/champions/runesReforged.json";
import { useState } from "react";

interface Rune {
  id: number;
  key: string;
  icon: string;
  name: string;
  shortDesc: string;
  longDesc: string;
}

interface RunePath {
  id: number;
  key: string;
  icon: string;
  name: string;
  slots: { runes: Rune[] }[];
}

interface RunesReforged extends Array<RunePath> {}

const basicStatsRunes = [
  { name: "+9 Adaptive Force", icon: "StatModsAdaptiveForceIcon.png" },
  { name: "+10% Attack Speed", icon: "StatModsAttackSpeedIcon.png" },
  { name: "+8 Ability Haste", icon: "StatModsCDRScalingIcon.png" },
  { name: "+9 Adaptive Force", icon: "StatModsAdaptiveForceIcon.png" },
  { name: "2% Move Speed", icon: "StatModsMovementSpeedIcon.png" },
  { name: "+10-180 Health", icon: "StatModsHealthPlusIcon.png" },
  { name: "+65 Health", icon: "StatModsHealthScalingIcon.png" },
  { name: "+10% Tenacity and Slow Resist", icon: "StatModsTenacityIcon.png" },
  { name: "+10-180 Health", icon: "StatModsHealthPlusIcon.png" },
];

// Test Data (replace with your actual data structure)
const testChampionRunes = {
  primaryPath: "Domination",
  primaryRunes: [
    "Electrocute",
    "SuddenImpact",
    "EyeballCollection",
    "RelentlessHunter",
  ],
  secondaryPath: "Sorcery",
  secondaryRunes: ["NimbusCloak", "Transcendence"],
  selectedStats: [
    { id: "stat1", name: "+9 Adaptive Force" },
    { id: "stat2", name: "+10% Attack Speed" },
    { id: "stat3", name: "+8 Ability Haste" },
  ],
};

function findPath(
  runes: RunesReforged,
  pathName: string,
): RunePath | undefined {
  return runes.find((p) => p.key === pathName);
}

function ChampionRunes() {
  const [runes] = useState<RunesReforged>(runesData);
  const [championRuneSet] = useState<any>(testChampionRunes); // Using hardcoded data

  const primaryPath = findPath(runes, championRuneSet?.primaryPath);
  const secondaryPath = findPath(runes, championRuneSet?.secondaryPath);

  const selectedPrimaryRunes = new Set(championRuneSet?.primaryRunes);
  const selectedSecondaryRunes = new Set(championRuneSet?.secondaryRunes);
  const selectedStats = new Set(
    championRuneSet?.selectedStats.map((stat: any) => stat.id),
  ); // Using IDs for unique selection

  return (
    <section className="mt-8">
      <h2 className="mb-4 text-2xl font-bold text-white">Runes</h2>
      <TooltipProvider>
        <div className="flex max-w-3xl space-x-8">
          {/* Primary Path */}
          <div className="w-1/2 rounded-lg bg-gray-800 bg-opacity-40 p-4 pb-6">
            <div className="mb-4 flex items-center bg-gray-900 bg-opacity-50 p-2">
              <Image
                src={`/images/runes/${primaryPath?.icon}`}
                alt={primaryPath?.name || ""}
                width={40}
                height={40}
                className="mr-3"
              />
              <h3 className="text-xl font-bold text-white">
                {primaryPath?.name}
              </h3>
            </div>
            <div className="mt-6 grid grid-cols-3 gap-y-8">
              {primaryPath?.slots.flatMap((slot) =>
                slot.runes.map((rune) => {
                  const isSelected = selectedPrimaryRunes.has(rune.key);
                  return (
                    <Tooltip key={rune.id}>
                      <TooltipTrigger asChild>
                        <div
                          className={`text-center ${
                            isSelected ? "" : "opacity-30 grayscale"
                          }`}
                        >
                          <Image
                            src={`/images/runes/${rune.icon}`}
                            alt={rune.name}
                            width={36}
                            height={36}
                            className="mx-auto"
                          />
                          <h4 className="mt-2 text-sm font-semibold text-white">
                            {rune.name}
                          </h4>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="text-xs text-gray-400">
                          {rune.shortDesc}
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  );
                }),
              )}
            </div>
          </div>
          <div className="flex w-1/2 flex-col space-y-6">
            {/* Secondary Path */}
            <div className="rounded-lg bg-gray-800 bg-opacity-40 p-4">
              <div className="mb-4 flex items-center bg-gray-900 bg-opacity-50 p-2">
                <Image
                  src={`/images/runes/${secondaryPath?.icon}`}
                  alt={secondaryPath?.name || ""}
                  width={40}
                  height={40}
                  className="mr-3"
                />
                <h3 className="text-xl font-bold text-white">
                  {secondaryPath?.name}
                </h3>
              </div>
              <div className="grid grid-cols-3 gap-y-8">
                {secondaryPath?.slots.slice(1).flatMap((slot) =>
                  slot.runes.map((rune) => {
                    const isSelected = selectedSecondaryRunes.has(rune.key);
                    return (
                      <Tooltip key={rune.id}>
                        <TooltipTrigger asChild>
                          <div
                            className={`text-center ${
                              isSelected ? "" : "opacity-30 grayscale"
                            }`}
                          >
                            <Image
                              src={`/images/runes/${rune.icon}`}
                              alt={rune.name}
                              width={32}
                              height={32}
                              className="mx-auto"
                            />
                            <h4 className="mt-2 text-xs font-semibold text-white">
                              {rune.name}
                            </h4>
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="text-xs text-gray-400">
                            {rune.shortDesc}
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    );
                  }),
                )}
              </div>
            </div>
            {/* Basic Stats */}
            <div className="rounded-lg bg-gray-800 bg-opacity-40 p-4">
              <div className="grid grid-cols-3 gap-y-6">
                {basicStatsRunes.map((stat, index) => {
                  const statId =
                    championRuneSet.selectedStats.find(
                      (selectedStat: any) => selectedStat.name === stat.name,
                    )?.id || `stat-${index}`; // Find unique ID
                  const isSelected = selectedStats.has(statId);

                  return (
                    <Tooltip key={statId}>
                      <TooltipTrigger asChild>
                        <div
                          className={`relative text-center ${
                            isSelected ? "" : "opacity-30 grayscale"
                          }`}
                        >
                          {/* Circular Ring */}
                          {isSelected && (
                            <div className="absolute inset-0 m-auto flex h-8 w-8 items-center justify-center rounded-full ring-2 ring-amber-400" />
                          )}
                          {/* Stat Icon */}
                          <Image
                            src={`/images/runes/perk-images/StatMods/${stat.icon}`}
                            alt={stat.name}
                            width={26}
                            height={26}
                            className="z-10 mx-auto"
                          />
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="text-xs text-gray-400">{stat.name}</p>
                      </TooltipContent>
                    </Tooltip>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </TooltipProvider>
    </section>
  );
}

export default ChampionRunes;
