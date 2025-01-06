import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { getRankColor, getRankColorBorder } from "@/lib/utils/colorFunctions";
import championAvatars from "@/data/champions/championAvatar";
import getChampionSkillImages from "@/lib/utils/championSkillsImages";
import championFull from "@/data/champions/championFull.json";

function replaceTooltipPlaceholders(tooltip: string) {
  if (!tooltip) return tooltip;
  // Replace any placeholders (e.g., {{ e1 }}, {{ a1 }}) with "?"
  let updatedTooltip = tooltip.replace(/{{\s*[^}]+\s*}}/g, "?");
  // Remove any remaining Riot-specific tags like <magicDamage>, keeping inner text
  updatedTooltip = updatedTooltip.replace(/<\/?[^>]+(>|$)/g, "");

  return updatedTooltip;
}

export default function ChampionHeader({
  champion,
}: {
  readonly champion: {
    readonly name: string;
    readonly rank: string;
    readonly winRatio: number;
    readonly pickRate: number;
    readonly banRate: number;
  };
}) {
  const skillImages = getChampionSkillImages(champion.name);
  const skillLabels = ["P", "Q", "W", "E", "R"];

  const championData =
    championFull.data[champion.name as keyof typeof championFull.data];

  const skills = championData?.spells || [];
  const passive = championData?.passive;

  return (
    <TooltipProvider>
      <div className="mb-8 flex items-center space-x-8">
        <Image
          src={championAvatars[champion.name]}
          alt={champion.name}
          width={200}
          height={200}
          className={`rounded-3xl ring-2 ${getRankColorBorder(champion.rank)}`}
        />
        <div>
          <h1 className="ml-4 mt-4 text-5xl font-medium text-white">
            {champion.name}
          </h1>

          <div className="ml-4 mt-6 flex space-x-4">
            {/* Tooltip for Passive */}
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="relative">
                  <Image
                    src={skillImages[0]}
                    alt={`${champion.name} Passive`}
                    width={50}
                    height={50}
                    className="rounded-md"
                  />
                  <span className="text-s absolute bottom-0 right-0 rounded bg-black bg-opacity-80 px-1 font-bold text-white">
                    {skillLabels[0]}
                  </span>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <div className="p-2">
                  <strong>{passive?.name || "Passive"}</strong>
                  <p>
                    {replaceTooltipPlaceholders(
                      passive?.description || "Description not available",
                    )}
                  </p>
                  <p className="mt-2 text-xs text-gray-400">
                    "?" indicates data is unretrievable from Riot API.
                  </p>
                </div>
              </TooltipContent>
            </Tooltip>

            {/* Tooltips for Q, W, E, R */}
            {skillImages.slice(1).map((imagePath, index) => (
              <Tooltip key={index + 1}>
                <TooltipTrigger asChild>
                  <div className="relative">
                    <Image
                      src={imagePath}
                      alt={`${champion.name} ${skillLabels[index + 1]}`}
                      width={50}
                      height={50}
                      className="rounded-md"
                    />
                    <span className="text-s absolute bottom-0 right-0 rounded bg-black bg-opacity-80 px-1 font-bold text-white">
                      {skillLabels[index + 1]}
                    </span>
                  </div>
                </TooltipTrigger>
                <TooltipContent className="max-w-80">
                  <div className="p-2">
                    <p className="text-sm font-semibold text-blue-500">
                      {skills[index]?.name || `Skill ${skillLabels[index + 1]}`}
                    </p>
                    <p className="mt-2 text-gray-500">
                      Cooldown: {skills[index]?.cooldownBurn || "N/A"}
                    </p>
                    <p className="text-gray-500">
                      Cost: {skills[index]?.costBurn || "N/A"}
                    </p>
                    <p className="text-gray-500">
                      Range: {skills[index]?.rangeBurn || "N/A"}
                    </p>

                    <p className="mt-2 font-light">
                      {replaceTooltipPlaceholders(
                        skills[index]?.tooltip || "Description not available",
                      )}
                    </p>
                    <p className="mt-2 text-xs text-orange-500">
                      "?" indicates missing or incorrect data from Riot API.
                    </p>
                    <p className="mt-2 font-semibold">
                      {skills[index]?.description || "N/A"}
                    </p>
                  </div>
                </TooltipContent>
              </Tooltip>
            ))}
          </div>
          <div className="ml-4 mt-4 flex items-center space-x-6 text-lg">
            <div className="flex flex-col items-center justify-center">
              <span
                className={`text-2xl font-semibold ${getRankColor(champion.rank)}`}
              >
                {champion.rank}
              </span>
              <p className="font-light text-gray-400">Tier</p>
            </div>
            <Separator orientation="vertical" className="mx-4 h-14 w-px" />
            <div className="flex flex-col items-center justify-center">
              <span className="text-2xl font-semibold">
                {champion.winRatio}%
              </span>
              <p className="font-light text-gray-400">Win Rate</p>
            </div>
            <Separator orientation="vertical" className="h-10 w-px" />
            <div className="flex flex-col items-center justify-center">
              <span className="text-2xl font-semibold">
                {champion.pickRate}%
              </span>
              <p className="font-light text-gray-400">Pick Rate</p>
            </div>
            <Separator orientation="vertical" className="h-10 w-px" />
            <div className="flex flex-col items-center justify-center">
              {" "}
              <span className="text-2xl font-semibold">
                {champion.banRate}%
              </span>
              <p className="font-light text-gray-400">Ban Rate</p>
            </div>
            <Separator orientation="vertical" className="h-10 w-px" />
            <div className="flex flex-col items-center justify-center">
              {" "}
              <span className="text-2xl font-semibold">{champion.banRate}</span>
              <p className="font-light text-gray-400">Matches</p>
            </div>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}
