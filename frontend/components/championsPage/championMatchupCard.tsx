import Image from "next/image";
import { Separator } from "@/components/ui/separator";

interface ChampionMatchupCardProps {
  championName: string;
  winRatio: number;
  matches: number;
}

const getWinRatioColor = (winRatio: number): string => {
  if (winRatio < 48) return "text-red-500";
  if (winRatio <= 51) return "text-white";
  return "text-green-500";
};

const ChampionMatchupCard: React.FC<ChampionMatchupCardProps> = ({
  championName,
  winRatio,
  matches,
}) => {
  const winRatioColor = getWinRatioColor(winRatio);
  return (
    <div className="shrink-1 w-40 min-w-32 rounded-lg bg-gray-800/70 p-2 shadow-md">
      {" "}
      <Image
        src={`/images/championAvatars/${championName}_0.jpg`}
        alt={championName}
        width={50}
        height={50}
        className="mx-auto rounded-full py-2"
      />
      <div className="mt-2 text-center">
        <h4 className="font-semibold text-white">{championName}</h4>
        <Separator className="my-2 h-[1px] bg-slate-500" />
        <p className={`text-md font-medium ${winRatioColor}`}>
          {winRatio.toFixed(1)}%
        </p>
        <p className="text-xs text-gray-500">({matches} Matches)</p>
      </div>
    </div>
  );
};

export default ChampionMatchupCard;
