import { Sword, Crosshair, Heart, Zap, Wand } from "lucide-react";
import { IconStat } from "../iconStat";
import SectionHeader from "./sectionHeader";
import StatsSection from "./statsSection";
import StatItemWrapper from "./statItemWrapper";

export default function ChampionPerformance({ champion }: { champion: any }) {
  return (
    <div className="rounded-xl bg-gradient-to-br from-slate-950 via-gray-900 to-slate-900 p-6 shadow-xl ring-1 ring-white/5">
      <SectionHeader
        title="Performance"
        gradientClass="from-blue-500 to-cyan-500"
        description="Overview of the champion's performance metrics."
      />
      <StatsSection>
        <StatItemWrapper>
          <IconStat
            icon={<Sword className="h-6 w-6 text-blue-400" />}
            label="Avg. Kills"
            value={champion.averageKills.toFixed(1)}
            color="text-blue-400"         
          />
        </StatItemWrapper>

        <StatItemWrapper>
          <IconStat
            icon={<Crosshair className="h-6 w-6 text-blue-400" />}
            label="Avg. Deaths"
            value={champion.averageDeaths.toFixed(1)}
            color="text-blue-400"
          />
        </StatItemWrapper>
        <StatItemWrapper>
          <IconStat
            icon={<Heart className="h-6 w-6 text-blue-400" />}
            label="Avg. Assists"
            value={champion.averageAssists.toFixed(1)}
            color="text-blue-400"
          />
        </StatItemWrapper>
        <StatItemWrapper>
          <IconStat
            icon={<Zap className="h-6 w-6 text-blue-400" />}
            label="Kill Participation"
            value={`${champion.averageKillParticipation}%`}
            color="text-blue-400"
          />
        </StatItemWrapper>

        <StatItemWrapper>
          <IconStat
            icon={<Wand className="h-6 w-6 text-blue-400" />}
            label="First Blood"
            value={`${champion.averageFirstBloodParticipation}%`}
            color="text-blue-400"
          />
        </StatItemWrapper>
      </StatsSection>
    </div>
  );
}
