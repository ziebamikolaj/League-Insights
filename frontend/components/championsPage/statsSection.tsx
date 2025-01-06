import React from "react";

interface StatsSectionProps {
  children: React.ReactNode;
  className?: string;
}

const StatsSection: React.FC<StatsSectionProps> = ({
  children,
  className = "",
}) => {
  return (
    <div className={`grid grid-cols-1 gap-6 sm:grid-cols-2 ${className}`}>
      {children}
    </div>
  );
};

export default StatsSection;
