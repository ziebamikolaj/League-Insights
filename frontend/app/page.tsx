"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import Image from "next/image";
import { TrendingUp, TrendingDown, Minus, Search } from "lucide-react";
import championData from "@/data/champions/championsTestData";
import { Button } from "@/components/ui/button";
import championAvatars from "@/data/champions/championAvatar";
import { Separator } from "@/components/ui/separator";
import { getRankColor, getRankColorBorder } from "@/lib/utils/colorFunctions";

const roles = ["All roles", "Top", "Jungle", "Mid", "Bot", "Support"] as const;
type Role = (typeof roles)[number];

export default function HomePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState<Role>("All roles");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Searching for:", searchTerm);
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-5 w-5 text-emerald-400" />;
      case "down":
        return <TrendingDown className="h-5 w-5 text-rose-400" />;
      default:
        return <Minus className="h-5 w-5 text-gray-400" />;
    }
  };

  return (
    <div className="relative min-h-screen bg-gray-900">
      <Image
        src="/background_image.webp"
        alt="League of Legends Background"
        fill
        className="object-cover opacity-20"
        priority
      />

      <nav className="relative z-20 backdrop-blur-sm">
        <div className="container mx-auto flex items-center space-x-8 p-6">
          <Link
            href="/"
            className="text-2xl font-bold text-yellow-400 transition-colors hover:text-yellow-500"
          >
            {/* <Image src="/mainLogo.webp" alt="Logo" width={60} height={60} /> */}
            League Insights
          </Link>
          {/* bg-blue-400/20 */}
          <Separator orientation="vertical" className="h-6 w-px" />
          <Link
            href="/champions"
            className="text-lg font-medium text-gray-200 transition-colors hover:text-blue-400"
          >
            Champions
          </Link>
          <Link
            href="/tier-list"
            className="text-lg font-medium text-gray-200 transition-colors hover:text-blue-400"
          >
            Tier List
          </Link>
          <Link
            href="/news"
            className="text-lg font-medium text-gray-200 transition-colors hover:text-blue-400"
          >
            News
          </Link>
        </div>
      </nav>

      <div className="container relative z-10 mx-auto bg-black bg-opacity-25 p-4">
        <div className="flex min-h-[calc(100vh-96px)] flex-col items-center justify-center">
          <h1 className="text-center text-5xl font-bold text-white shadow-2xl shadow-black transition-colors hover:text-white">
            League Insights
          </h1>

          <form
            onSubmit={handleSearch}
            className="relative my-24 w-full max-w-lg"
          >
            <Input
              type="text"
              placeholder="Search champions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full border-gray-200 bg-white pr-10 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-blue-500"
            />
            <Search className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
          </form>

          <div className="w-full max-w-4xl">
            <div className="relative mb-8 flex flex-col items-center">
              <div className="flex w-full">
                <h2 className="text-2xl font-bold text-white">Top picks</h2>
                <div className="absolute inset-0 flex items-center justify-center gap-2">
                  {roles.map((role) => (
                    <Button
                      key={role}
                      onClick={() => setSelectedRole(role)}
                      className={`rounded-lg px-6 py-2 text-sm font-bold transition-all duration-200 ${
                        selectedRole === role
                          ? "bg-gray-800 text-white shadow-lg shadow-gray-900/50"
                          : "text-gray-400 hover:bg-gray-800/50 hover:text-gray-200"
                      }`}
                    >
                      {role}
                    </Button>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {championData[selectedRole].map((champion, index) => (
                <Link
                  key={index}
                  href={`/champion/${champion.name}`}
                  className="rounded-xl bg-gray-800/80 p-4 backdrop-blur-sm transition-all duration-300 hover:bg-gray-900/90"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="relative mr-4">
                        <Image
                          src={championAvatars[champion.name]}
                          alt={champion.name}
                          width={60}
                          height={60}
                          className={`rounded-xl ring-1 ${getRankColorBorder(champion.rank)}`}
                        />
                        <div
                          className={`absolute -right-2 -top-2 rounded-md px-2 py-1 font-bold ${getRankColor(champion.rank)} bg-gray-900`}
                        >
                          {champion.rank}
                        </div>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-white">
                          {champion.name}
                        </h3>
                        <div className="flex items-center gap-2">
                          <span className="text-gray-400">Win Rate: </span>
                          <span className="font-semibold text-white">
                            {champion.winRate}%
                          </span>
                          <span className="text-xs text-gray-500">
                            ({champion.gamesAnalyzed.toLocaleString()} games)
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-8">
                      <div className="text-center">
                        <p className="text-sm text-gray-400">Pick Rate</p>
                        <p className="font-semibold text-white">
                          {champion.pickRate}%
                        </p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-gray-400">Ban Rate</p>
                        <p className="font-semibold text-white">
                          {champion.banRate}%
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-gray-400">Trend</span>
                        {getTrendIcon(champion.trend)}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
