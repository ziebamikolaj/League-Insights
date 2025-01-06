import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const IconStat = ({
  icon,
  label,
  value,
  color,
}: {
  icon: any;
  label: any;
  value: any;
  color: any;
}) => (
  <TooltipProvider>
  <Tooltip>
    <TooltipTrigger asChild>
      <div className="flex items-center w-full">
        <div className="absolute left-4">{icon}</div>{" "}
        {/* Icon positioned absolutely */}
        <div className="w-full text-center">
          {" "}
          {/* Centers value and label */}
          <span className={`font-semibold ${color}`}>{value}</span>
          <p className="text-xs text-gray-400">{label}</p>
        </div>
      </div>
    </TooltipTrigger>
    <TooltipContent>
      <p>{label}</p>
    </TooltipContent>
  </Tooltip>
</TooltipProvider>
);
