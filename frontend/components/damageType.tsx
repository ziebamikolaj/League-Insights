"use client";
import * as React from "react";
import {
  Pie,
  PieChart,
  ResponsiveContainer,
  Cell,
  Tooltip,
  Legend,
} from "recharts";
import { championsDetailedStats } from "@/data/champions/championStatsTest";

const selectedChampion = championsDetailedStats.find(
  (champion) => champion.name === "Ahri",
);

const chartData = [
  {
    name: "Physical",
    value: selectedChampion?.damageTypes.physical ?? 0,
    color: "#FF0000",
  },
  {
    name: "Magic",
    value: selectedChampion?.damageTypes.magic ?? 0,
    color: "#0000FF",
  },
  {
    name: "True",
    value: selectedChampion?.damageTypes.trueDamage ?? 0,
    color: "#FFFFFF",
  },
];

const DamageTypeChart = () => {
  const totalDamage = chartData.reduce((acc, curr) => acc + curr.value, 0);

  return (
    <ResponsiveContainer width="100%" height={400}>
      <PieChart>
        <Pie
          data={chartData}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={100}
          fill="#8884d8"
          label
        >
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip />
        <Legend
          layout="horizontal"
          align="center"
          verticalAlign="bottom"
          iconType="circle"
          iconSize={10}
        />
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          dominantBaseline="middle"
          className="fill-foreground text-3xl font-bold"
        >
          {totalDamage.toLocaleString()}%
        </text>
      </PieChart>
    </ResponsiveContainer>
  );
};

export { DamageTypeChart };
