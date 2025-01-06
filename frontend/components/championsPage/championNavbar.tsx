"use client";
import React, { useState } from "react";

const ChampionNavigation = () => {
  const [activeTab, setActiveTab] = useState("Build");

  const tabs = ["Build", "Items", "Rune sets", "Matchups", "Early game"];

  return (
    <div className="w-full mt-4 mb-4 border-y border-gray-700/50 bg-gray-800/10 py-4">
      <div className="flex gap-8 px-4">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`
              group relative px-3 py-2 text-sm font-medium transition-all duration-200 rounded-md
              ${
                activeTab === tab
                  ? "text-blue-400"
                  : "text-gray-400 hover:text-gray-200"
              }
            `}
          >
            {tab}
            <span
              className={`
                absolute bottom-0 left-0 h-0.5 transition-all duration-300 ease-out
                ${
                  activeTab === tab
                    ? "w-full bg-blue-400"
                    : "w-0 bg-gray-400 group-hover:w-full"
                }
              `}
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ChampionNavigation;