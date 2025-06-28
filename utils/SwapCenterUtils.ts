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
export const NEARBY_RADIUS_KM = 20; // Set your desired radius

export function getDistanceFromLatLonInKm(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
) {
  const R = 6371; // Radius of the earth in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c; // Distance in km
  return d;
}
