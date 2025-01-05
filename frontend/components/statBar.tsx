import { Progress } from "@/components/ui/progress";
export const StatBar = ({
  label,
  value,
  max,
  color,
}: {
  label: any;
  value: any;
  max: any;
  color: any;
}) => (
  <div className="space-y-1">
    <div className="flex justify-between text-sm">
      <span>{label}</span>
      <span>{value}</span>
    </div>
    <Progress value={(value / max) * 100} className={`h-2 ${color}`} />
  </div>
);
