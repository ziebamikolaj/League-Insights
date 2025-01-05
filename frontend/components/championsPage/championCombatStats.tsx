import { Sword, Shield, Heart } from "lucide-react";
import { IconStat } from "../iconStat";
import SectionHeader from "./sectionHeader";
import StatsSection from "./statsSection";
import StatItemWrapper from "./statItemWrapper";

export default function ChampionCombatStats({ champion }: { champion: any }) {
  return (
    <div className="rounded-xl bg-gradient-to-br from-slate-950 via-gray-900 to-slate-900 p-6 shadow-xl ring-1 ring-white/5">
      <SectionHeader
        title="Combat Stats"
        gradientClass="from-red-500 to-orange-500"
        description="Key combat statistics including damage, healing, etc."
      />

      <StatsSection>
        <StatItemWrapper>
          <IconStat
            icon={<Sword className="h-6 w-6 text-red-400" />}
            label="Damage Dealt"
            value={champion.damageDealtPerGame.toLocaleString()}
            color="text-red-400"
          />
        </StatItemWrapper>
        <StatItemWrapper>
          <IconStat
            icon={<Shield className="h-6 w-6 text-red-400" />}
            label="Damage Taken"
            value={champion.damageTakenPerGame.toLocaleString()}
            color="text-red-400"
          />
        </StatItemWrapper>
        <StatItemWrapper>
          <IconStat
            icon={<Heart className="h-6 w-6 text-red-400" />}
            label="Healing Done"
            value={champion.healingDonePerGame.toLocaleString()}
            color="text-red-400"
          />
        </StatItemWrapper>

        <StatItemWrapper>
          <IconStat
            icon={<Shield className="h-6 w-6 text-red-400" />}
            label="Shielding Done"
            value={champion.shieldingDonePerGame.toLocaleString()}
            color="text-red-400"
          />
        </StatItemWrapper>
      </StatsSection>
    </div>
  );
}
