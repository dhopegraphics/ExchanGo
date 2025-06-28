import { Feather } from "@expo/vector-icons";
export const categories: {
  id: string;
  name: string;
  icon: React.ComponentProps<typeof Feather>["name"];
  color: string;
}[] = [
  { id: "all", name: "All", icon: "grid", color: "#FF6B6B" },
  {
    id: "featured",
    name: "Featured",
    icon: "trending-up",
    color: "#4ECDC4",
  },
  { id: "nearby", name: "Nearby", icon: "map-pin", color: "#96CEB4" },
  {
    id: "skilled",
    name: "Top Rated",
    icon: "award",
    color: "#FD79A8",
  },
  { id: "recent", name: "Recent", icon: "watch", color: "#96CEB4" },
];
