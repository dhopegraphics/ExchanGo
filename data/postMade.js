import { imageDataURL } from "../constants/ImageData";
import { commentsData } from "./postComments";

export const postData = [
  {
    id: "post1",
    userId: "user123",
    userName: "Abin",
    userProfileImage: imageDataURL[1],
    postImage: imageDataURL[3],
    postText:
      "Web literacy must become a fundamental part of our global education system. Without it, opportunity is squandered. With it, we can propel billions farther, faster.",
    postDate: "30/03/2024",
    postTime: "12:30 AM",
    likes: 42,
    comments: commentsData.post1,
  },
  {
    id: "post2",
    userId: "user456",
    userName: "Sarah Lee",
    userProfileImage: imageDataURL[2],
    postImage: null,
    postText:
      "Just finished my first React Native app! It's been a challenging but rewarding journey. #ReactNative #MobileDev",
    postDate: "29/03/2024",
    postTime: "3:45 PM",
    likes: 28,
    comments: commentsData.post2,
  },
  {
    id: "post3",
    userId: "user789",
    userName: "Mike Chen",
    userProfileImage: imageDataURL[4],
    postImage: imageDataURL[5],
    postText:
      "Check out this cool UI design I just finished! Feedback welcome. #UIDesign #Figma",
    postDate: "28/03/2024",
    postTime: "11:20 AM",
    likes: 56,
    comments: commentsData.post3,
  },
];
