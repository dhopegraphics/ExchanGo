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

export const trendingCommunity = {
  name: "Animation Community",
  memberCount: 669,
  profileImage: "https://i.pravatar.cc/32?img=5",
  avatars: [
    { uri: "https://i.pravatar.cc/32?img=0" },
    { uri: "https://i.pravatar.cc/32?img=1" },
    { uri: "https://i.pravatar.cc/32?img=2" },
    { uri: "https://i.pravatar.cc/32?img=3" },
  ],
  bookmarkPress: () =>
    console.log(`Bookmark Pressed ${trendingCommunity.name}`),
  onPress: () => console.log(`Community Pressed ${trendingCommunity.name}`),
};

export const forYouCommunity = [
  {
    id: 1,
    name: "UX Design Community",
    memberCount: 340,
    profileImage: imageDataURL[0],
    avatars: [
      { uri: "https://i.pravatar.cc/32?img=0" },
      { uri: "https://i.pravatar.cc/32?img=1" },
      { uri: "https://i.pravatar.cc/32?img=2" },
      { uri: "https://i.pravatar.cc/32?img=3" },
    ],
    bookmarkPress: () =>
      console.log(`Bookmark Pressed ${forYouCommunity.name}`),
    onPress: () => console.log(`Community Pressed ${forYouCommunity.name}`),
  },
  {
    id: 2,
    name: "Photography Community",
    memberCount: 610,
    profileImage: imageDataURL[1],
    avatars: [
      { uri: "https://i.pravatar.cc/32?img=6" },
      { uri: "https://i.pravatar.cc/32?img=7" },
      { uri: "https://i.pravatar.cc/32?img=8" },
      { uri: "https://i.pravatar.cc/32?img=9" },
    ],
  },
];

export const chatData = [
  {
    id: "1",
    name: "Sithara",
    message: "Hey! Let Me Know What Are You Doing ?",
    time: "11:47 AM",
    imageUrl: imageDataURL[0],
  },
  {
    id: "2",
    name: "Abin",
    message: "Hey! Let Me Know What Are You Doing ?",
    time: "10:52 PM",
    imageUrl: imageDataURL[6],
  },
  {
    id: "3",
    name: "Dharrunika",
    message: "Hey! Let Me Know What Are You Doing ?",
    time: "10:43 PM",
    imageUrl: imageDataURL[7],
  },
  {
    id: "4",
    name: "Martin",
    message: "Hey! Let Me Know What Are You Doing ?",
    time: "10:30 PM",
    imageUrl: imageDataURL[9],
  },
  {
    id: "5",
    name: "Kavitha",
    message: "Hey! Let Me Know What Are You Doing ?",
    time: "10:26 PM",
    imageUrl: imageDataURL[10],
  },
];

export const requestData = [
  {
    id: "1",
    name: "Dinesh",
    message: "Hey! Let Me Know What Are You Doing ?",
    time: "10:29 PM",
    imageUrl: imageDataURL[5],
  },
  {
    id: "2",
    name: "Huzefa",
    message: "Hey! Let Me Know What Are You Doing ?",
    time: "10:24 PM",
    imageUrl: imageDataURL[1],
  },
];
