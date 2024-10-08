import { imageDataURL } from "./ImageData";

export const categories = [
  { name: "Cooking", icon: "utensils", gradient: ["#FF9A8B", "#FF6A88"] },
  { name: "Photography", icon: "camera", gradient: ["#A18CD1", "#FBC2EB"] },
  { name: "Fitness", icon: "dumbbell", gradient: ["#84FAB0", "#8FD3F4"] },
  // Add more categories as needed
];

export const interests = [
  "Illustration",
  "Animation",
  "Photography",
  "Languages",
  "Cinematography",
  "UI Design",
  "UX Design",
  "Architecture",
  "Digital Marketing",
  "Music",
  "Graphic Design",
  "Web Development",
  "Other",
];

export const discoverData = [
  {
    id: 1,
    name: "Kavitha",
    skill: "Interior Design",
    profileImage: imageDataURL[0],
  },
  {
    id: 2,
    name: "Dinesh",
    skill: "Full Stack Development",
    profileImage: imageDataURL[1],
  },
  {
    id: 3,
    name: "Abin",
    skill: "Graphic Design",
    profileImage: imageDataURL[7],
  },
  { id: 4, name: "Sara", skill: "UX Design", profileImage: imageDataURL[6] },
  { id: 5, name: "Mike", skill: "Data Science", profileImage: imageDataURL[4] },
];

export const exploreCategories = [
  { id: 1, name: "Animation", icon: "film" },
  { id: 2, name: "Language", icon: "language" },
  { id: 3, name: "Architecture", icon: "building" },
  { id: 4, name: "Photography", icon: "camera" },
  { id: 5, name: "Illustration", icon: "paint-brush" },
  { id: 6, name: "Music", icon: "music" },
];
