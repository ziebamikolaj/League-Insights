import React from "react";

interface SectionHeaderProps {
  title: string;
  gradientClass: string;
  description?: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  gradientClass,
  description,
}) => {
  return (
    <div className="mb-6 border-b border-gray-700 pb-4">
      <h2
        className={`bg-gradient-to-r ${gradientClass} bg-clip-text text-2xl font-bold text-transparent`}
      >
        {title}
      </h2>
      {description && (
        <p className="mt-1 text-sm text-gray-500">{description}</p>
      )}
    </div>
  );
};

export default SectionHeader;
