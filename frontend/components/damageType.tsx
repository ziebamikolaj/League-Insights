"use client";

import * as React from "react";
import { TrendingUp } from "lucide-react";
import { Label, Pie, PieChart } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { championsDetailedStats } from "@/data/champions/championStatsTest";

// Select a specific champion (e.g., Ahri)
const selectedChampion = championsDetailedStats.find(
  (champion) => champion.name === "Ahri",
);

// Update chartData based on the selected champion's damage distribution
const chartData = [
  {
    damageType: "Physical",
    value: selectedChampion?.damageTypes.physical ?? 0,
    fill: "var(--color-physical)",
  },
  {
    damageType: "Magic",
    value: selectedChampion?.damageTypes.magic ?? 0,
    fill: "var(--color-magic)",
  },
  {
    damageType: "True",
    value: selectedChampion?.damageTypes.trueDamage ?? 0,
    fill: "var(--color-true)",
  },
];

const chartConfig = {
  physical: {
    label: "Physical",
    color: "hsl(var(--chart-1))",
  },
  magic: {
    label: "Magic",
    color: "hsl(var(--chart-2))",
  },
  true: {
    label: "True",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig;

export function DamageTypeChart() {
  const totalDamage = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.value, 0);
  }, []);

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Damage Distribution</CardTitle>
        <CardDescription>
          Distribution of Physical, Magic, and True Damage
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="damageType"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalDamage.toLocaleString()}%
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Damage Distribution
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Showing damage types for {selectedChampion?.name}{" "}
          <TrendingUp className="h-4 w-4" />
        </div>
      </CardFooter>
    </Card>
  );
}
