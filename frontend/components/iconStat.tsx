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
      <TooltipTrigger>
        <div className="flex items-center space-x-2">
          {icon}
          <div>
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
