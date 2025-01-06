import React from "react";

interface StatItemWrapperProps {
  children: React.ReactNode;
}

const StatItemWrapper: React.FC<StatItemWrapperProps> = ({ children }) => {
  return (
    <div className="relative rounded-lg bg-gray-800/40 p-4 transition-all hover:bg-gray-800/60">
      {children}
    </div>
  );
};

export default StatItemWrapper;
