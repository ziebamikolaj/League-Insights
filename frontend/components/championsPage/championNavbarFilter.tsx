import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Command,
  CommandInput,
  CommandList,
  CommandItem,
  CommandEmpty,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { SlidersHorizontal } from "lucide-react";
import Image from "next/image";

interface FilterButtonProps {
  label: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
  isRankFilter?: boolean;
  isLaneFilter?: boolean;
}

interface Filters {
  Lane: string;
  Rank: string;
  "Queue type": string;
  Region: string;
  Patch: string;
  [key: string]: string;
}

const FilterButton = ({
  label,
  options,
  value,
  onChange,
  isRankFilter,
  isLaneFilter,
}: FilterButtonProps) => {
  const [open, setOpen] = useState(false);

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div>
            <DropdownMenu open={open} onOpenChange={setOpen}>
              <DropdownMenuTrigger
                className="group relative rounded-md border border-gray-700/50 bg-gray-800/50 px-3 py-1.5 text-sm font-medium text-gray-300 transition-all duration-200 hover:bg-gray-700/50 hover:text-gray-200"
                onClick={() => setOpen(!open)}
              >
                <div className="flex items-center justify-between">
                  {isRankFilter && value && (
                    <Image
                      src={`/images/divisionEmblems/${value.toLowerCase()}.png`}
                      alt={value}
                      width={18}
                      height={18}
                      className="mr-2 inline-block"
                    />
                  )}
                  {isLaneFilter && value && (
                    <Image
                      src={`/images/lanes/${value.toLowerCase()}.png`}
                      alt={value}
                      width={18}
                      height={18}
                      className="mr-2 inline-block"
                    />
                  )}
                  <span>{value || label}</span>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-34 bg-gray-800 text-gray-200"
                onMouseEnter={() => {
                  const tooltips =
                    document.querySelectorAll('[role="tooltip"]');
                  tooltips.forEach((tooltip) => {
                    if (tooltip instanceof HTMLElement) {
                      tooltip.style.display = "none";
                    }
                  });
                }}
              >
                {options.map((option) => (
                  <DropdownMenuItem
                    key={option}
                    className={`transition-all duration-200 hover:bg-gray-700 focus:bg-gray-700 ${
                      option === value ? "bg-gray-700 text-white" : ""
                    }`}
                    onClick={() => {
                      onChange(option);
                      setOpen(false);
                    }}
                  >
                    {isRankFilter && (
                      <Image
                        src={`/images/divisionEmblems/${option.toLowerCase()}.png`}
                        alt={option}
                        width={18}
                        height={18}
                        className="mr-2 inline-block"
                      />
                    )}
                    {isLaneFilter && (
                      <Image
                        src={`/images/lanes/${option.toLowerCase()}.png`}
                        alt={option}
                        width={18}
                        height={18}
                        className="mr-2 inline-block"
                      />
                    )}
                    {option}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>Filter by {label.toLowerCase()}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

const ChampionNavbarFilter = () => {
  const [filters, setFilters] = useState<Filters>({
    Lane: "Top",
    Rank: "Gold",
    "Queue type": "Ranked Solo",
    Region: "EUW",
    Patch: "14.3",
  });

  const [selectedChampion, setSelectedChampion] = useState("");

  const filterOptions = {
    Lane: ["Top", "Jungle", "Mid", "Bot", "Support"],
    Rank: [
      "Iron",
      "Bronze",
      "Silver",
      "Gold",
      "Platinum",
      "Emerald",
      "Diamond",
      "Master",
      "Grandmaster",
      "Challenger",
    ],
    "Queue type": ["Ranked Solo", "Ranked Flex", "Normal"],
    Region: [
      "EUW",
      "NA",
      "KR",
      "EUN",
      "BR",
      "JP",
      "LA",
      "OC",
      "RU",
      "TR",
      "PH",
      "SG",
      "TH",
      "TW",
      "VN",
    ],
    Patch: ["14.1", "14.2", "14.3", "14.4", "14.5", "14.6", "14.7"],
  };

  const champions = [
    "Aatrox",
    "Ahri",
    "Akali",
    "Alistar",
    "Amumu",
    "Anivia",
    "Annie",
    "Aphelios",
    "Ashe",
    "Aurelion Sol",
    "Azir",
    "Bard",
    "Blitzcrank",
    "Brand",
    "Braum",
    "Caitlyn",
    "Camille",
    "Cassiopeia",
    "Cho'Gath",
    "Corki",
    "Darius",
    "Diana",
    "Dr. Mundo",
    "Draven",
    "Ekko",
    "Elise",
    "Evelynn",
    "Ezreal",
    "Fiddlesticks",
    "Fiora",
    "Fizz",
    "Galio",
    "Gangplank",
    "Garen",
    "Gnar",
    "Gragas",
    "Graves",
    "Gwen",
    "Hecarim",
    "Heimerdinger",
    "Illaoi",
    "Irelia",
    "Ivern",
    "Janna",
    "Jarvan IV",
    "Jax",
    "Jayce",
    "Jhin",
    "Jinx",
    "Kai'Sa",
    "Kalista",
    "Karma",
    "Karthus",
    "Kassadin",
    "Katarina",
    "Kayle",
    "Kayn",
    "Kennen",
    "Kha'Zix",
    "Kindred",
    "Kled",
    "Kog'Maw",
    "LeBlanc",
    "Lee Sin",
    "Leona",
    "Lillia",
    "Lissandra",
    "Lucian",
    "Lulu",
    "Lux",
    "Malphite",
    "Malzahar",
    "Maokai",
    "Master Yi",
    "Miss Fortune",
    "Mordekaiser",
    "Morgana",
    "Nami",
    "Nasus",
    "Nautilus",
    "Neeko",
    "Nidalee",
    "Nocturne",
    "Nunu & Willump",
    "Olaf",
    "Orianna",
    "Ornn",
    "Pantheon",
    "Poppy",
    "Pyke",
    "Qiyana",
    "Quinn",
    "Rakan",
    "Rammus",
    "Rek'Sai",
    "Rell",
    "Renata Glasc",
    "Renekton",
    "Rengar",
    "Riven",
    "Rumble",
    "Ryze",
    "Samira",
    "Sejuani",
    "Senna",
    "Seraphine",
    "Sett",
    "Shaco",
    "Shen",
    "Shyvana",
    "Singed",
    "Sion",
    "Sivir",
    "Skarner",
    "Sona",
    "Soraka",
    "Swain",
    "Sylas",
    "Syndra",
    "Tahm Kench",
    "Taliyah",
    "Talon",
    "Taric",
    "Teemo",
    "Thresh",
    "Tristana",
    "Trundle",
    "Tryndamere",
    "Twisted Fate",
    "Twitch",
    "Udyr",
    "Urgot",
    "Varus",
    "Vayne",
    "Veigar",
    "Vel'Koz",
    "Vex",
    "Vi",
    "Viego",
    "Viktor",
    "Vladimir",
    "Volibear",
    "Warwick",
    "Wukong",
    "Xayah",
    "Xerath",
    "Xin Zhao",
    "Yasuo",
    "Yone",
    "Yorick",
    "Yuumi",
    "Zac",
    "Zed",
    "Zeri",
    "Ziggs",
    "Zilean",
    "Zoe",
    "Zyra",
  ];

  const handleChampionSelect = (champion: string) => {
    setSelectedChampion(champion);
    setFilters((prev) => ({ ...prev, "vs champion": champion }));
  };

  return (
    <div className="w-full py-3">
      <div className="flex items-center gap-3 px-4">
        <SlidersHorizontal className="h-4 w-4 text-gray-400" />
        {Object.entries(filterOptions).map(([label, options]) => (
          <FilterButton
            key={label}
            label={label}
            options={options}
            value={filters[label]}
            onChange={(newValue) =>
              setFilters((prev) => ({ ...prev, [label]: newValue }))
            }
            isRankFilter={label === "Rank"}
            isLaneFilter={label === "Lane"}
          />
        ))}

        {/* Champion Search */}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div>
                <Popover>
                  <PopoverTrigger className="group relative rounded-md border border-gray-700/50 bg-gray-800/50 px-3 py-1.5 text-sm font-medium text-gray-300 transition-all duration-200 hover:bg-gray-700/50 hover:text-gray-200">
                    {selectedChampion
                      ? `vs ${selectedChampion}`
                      : "vs champion..."}
                  </PopoverTrigger>
                  <PopoverContent
                    className="w-72 bg-gray-800 p-0"
                    onMouseEnter={() => {
                      const tooltips =
                        document.querySelectorAll('[role="tooltip"]');
                      tooltips.forEach((tooltip) => {
                        if (tooltip instanceof HTMLElement) {
                          tooltip.style.display = "none";
                        }
                      });
                    }}
                  >
                    <Command className="bg-gray-800">
                      <CommandInput
                        placeholder="Search champion..."
                        className="border-b border-gray-700 bg-gray-800 text-gray-200 focus:outline-none focus:ring-0 focus:ring-offset-0"
                      />
                      <CommandList>
                        <CommandEmpty>
                          <div className="py-6 text-center text-sm">
                            No results found.
                          </div>
                        </CommandEmpty>
                        {champions.map((champion) => (
                          <CommandItem
                            key={champion}
                            value={champion}
                            onSelect={() => handleChampionSelect(champion)}
                            className={`text-gray-200 transition-all duration-200 hover:bg-gray-700 focus:bg-gray-700 ${
                              champion === selectedChampion
                                ? "bg-gray-700 text-white"
                                : ""
                            }`}
                          >
                            {champion}
                          </CommandItem>
                        ))}
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Search for matchup statistics</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
};

export default ChampionNavbarFilter;
