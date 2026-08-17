export const colors = {
  paper: "#ECEAE1",
  card: "#FBFAF6",
  ink: "#1E2A22",
  inkSoft: "#52604F",
  line: "#C9C3B0",
  coral: "#FF6B42",
  forest: "#2F6F4F",
  mustard: "#E8B23A",
  white: "#FFFFFF",
};

export const modeColor = (mode) => {
  if (mode === "Remote") return colors.forest;
  if (mode === "Hybrid") return "#B5762B";
  return "#8A3B2B";
};
