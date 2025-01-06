export const getRankColor = (rank: string) => {
  switch (rank) {
    case "S+":
      return "text-yellow-400";
    case "S":
      return "text-purple-400";
    case "A":
      return "text-blue-400";
    default:
      return "text-gray-400";
  }
};

export const getRankColorBorder = (rank: string) => {
  let borderColorClass;
  switch (rank) {
    case "S+":
      borderColorClass = "ring-yellow-400";
      break;
    case "S":
      borderColorClass = "ring-purple-400";
      break;
    case "A":
      borderColorClass = "ring-blue-400";
      break;
    default:
      borderColorClass = "ring-gray-400";
  }
  return borderColorClass;
};
