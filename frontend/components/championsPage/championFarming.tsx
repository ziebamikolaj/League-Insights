import { Target, Zap } from "lucide-react";
import { IconStat } from "../iconStat";
import SectionHeader from "./sectionHeader";
import StatsSection from "./statsSection";
import StatItemWrapper from "./statItemWrapper";

export default function ChampionFarmingAndEconomy({
  champion,
}: {
  champion: any;
}) {
  return (
    <div className="rounded-xl bg-gradient-to-br from-slate-950 via-gray-900 to-slate-900 p-6 shadow-xl ring-1 ring-white/5">
      <SectionHeader
        title="Farming & Economy"
        gradientClass="from-yellow-400 to-amber-500"
        description="Details on gold generation and farming efficiency."
      />

      <StatsSection>
        <StatItemWrapper>
          <IconStat
            icon={<Target className="h-6 w-6 text-yellow-400" />}
            label="CS/min"
            value={champion.csPerMinute.toFixed(1)}
            color="text-yellow-400"
          />
        </StatItemWrapper>
        <StatItemWrapper>
          <IconStat
            icon={<Zap className="h-6 w-6 text-yellow-400" />}
            label="Gold/min"
            value={champion.gpm}
            color="text-yellow-400"
          />
        </StatItemWrapper>

        <StatItemWrapper>
          <IconStat
            icon={<Target className="h-6 w-6 text-yellow-400" />}
            label="Total CS"
            value={champion.csPerGame}
            color="text-yellow-400"
          />
        </StatItemWrapper>

        <StatItemWrapper>
          <IconStat
            icon={<Zap className="h-6 w-6 text-yellow-400" />}
            label="Total Gold"
            value={champion.goldEarnedPerGame.toLocaleString()}
            color="text-yellow-400"
          />
        </StatItemWrapper>
      </StatsSection>
    </div>
  );
}
