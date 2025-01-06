import { Shield } from "lucide-react";
import { IconStat } from "../iconStat";
import SectionHeader from "./sectionHeader";
import StatsSection from "./statsSection";
import StatItemWrapper from "./statItemWrapper";

export default function ChampionObjectives({ champion }: { champion: any }) {
  return (
    <div className="rounded-xl bg-gradient-to-br from-slate-950 via-gray-900 to-slate-900 p-6 shadow-xl ring-1 ring-white/5">
      <SectionHeader
        title="Objectives"
        gradientClass="from-purple-500 to-pink-500"
        description="Contribution to team objectives."
      />

      <StatsSection>
        <StatItemWrapper>
          <IconStat
            icon={<Shield className="h-6 w-6 text-purple-400" />}
            label="Dragon Kills"
            value={champion.dragonKills.toFixed(1)}
            color="text-purple-400"
          />
        </StatItemWrapper>
        <StatItemWrapper>
          <IconStat
            icon={<Shield className="h-6 w-6 text-purple-400" />}
            label="Baron Kills"
            value={champion.baronKills.toFixed(1)}
            color="text-purple-400"
          />
        </StatItemWrapper>

        <StatItemWrapper>
          <IconStat
            icon={<Shield className="h-6 w-6 text-purple-400" />}
            label="Rift Herald Kills"
            value={champion.riftHeraldKills.toFixed(1)}
            color="text-purple-400"
          />
        </StatItemWrapper>

        <StatItemWrapper>
          <IconStat
            icon={<Shield className="h-6 w-6 text-purple-400" />}
            label="Turret Takedowns"
            value={champion.turretsTakedowns}
            color="text-purple-400"
          />
        </StatItemWrapper>

        <StatItemWrapper>
          <IconStat
            icon={<Shield className="h-6 w-6 text-purple-400" />}
            label="Voidgrubs Taken"
            value={champion.voidgrubsTaken}
            color="text-purple-400"
          />
        </StatItemWrapper>
      </StatsSection>
    </div>
  );
}
