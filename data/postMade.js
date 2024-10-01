import { imageDataURL } from "../constants/ImageData";
import { users } from "./users";

export const postData = [
  {
    id: 1,
    communityId: 1,
    userId: users[0].id,
    postImage: imageDataURL[3],
    postText:
      "Web literacy must become a fundamental part of our global education system. Without it, opportunity is squandered. With it, we can propel billions farther, faster.",
    createdAt: "2024-03-30T00:30:00",
  },
  {
    id: 2,
    communityId: 2,
    userId: users[1].id,
    postImage: null,
    postText:
      "Just finished my first React Native app! It's been a challenging but rewarding journey. #ReactNative #MobileDev",
    createdAt: "2024-03-29T15:45:00",
  },
  {
    id: 3,
    communityId: 3,
    userId: users[2].id,
    postImage: imageDataURL[5],
    postText:
      "Check out this cool UI design I just finished! Feedback welcome. #UIDesign #Figma",
    createdAt: "2024-03-28T11:20:00",
  },
  {
    id: 4,
    communityId: 1,
    userId: users[3].id,
    postImage: imageDataURL[7],
    postText:
      "Just finished my first React Native app! It's been a challenging but rewarding journey. #ReactNative #MobileDev",
    createdAt: "2024-03-29T03:45:00",
  },
];
