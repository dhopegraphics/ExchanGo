import { imageDataURL } from "./ImageData";

export const categories = [
  { name: "Cooking", icon: "utensils", gradient: ["#FF9A8B", "#FF6A88"] },
  { name: "Photography", icon: "camera", gradient: ["#A18CD1", "#FBC2EB"] },
  { name: "Fitness", icon: "dumbbell", gradient: ["#84FAB0", "#8FD3F4"] },
  // Add more categories as needed
];

export const featuredListings = [
  {
    id: 1,
    name: "John Doe",
    skill: "Gourmet Chef",
    rating: 4.8,
    image: "https://example.com/chef.jpg",
  },
  {
    id: 2,
    name: "Jane Smith",
    skill: "Portrait Photography",
    rating: 4.9,
    image: "https://example.com/photographer.jpg",
  },
  // Add more featured listings
];

export const skillListings = [
  {
    id: 1,
    name: "Alice",
    skill: "Yoga Instructor",
    location: "New York",
    availability: "Weekends",
  },
  {
    id: 2,
    name: "Bob",
    skill: "Guitar Teacher",
    location: "Los Angeles",
    availability: "Evenings",
  },
  // Add more skill listings
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
  { name: "Animation", icon: "film" },
  { name: "Language", icon: "language" },
  { name: "Architecture", icon: "building" },
  { name: "Photography", icon: "camera" },
  { name: "Illustration", icon: "paint-brush" },
  { name: "Music", icon: "music" },
];
