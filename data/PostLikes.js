import { postData } from "./postMade";
import { users } from "./users";

export const likesData = [
  {
    postId: postData[0].id,
    userId: users[1].id, // Sarah Lee liked post1
    createdAt: "2024-03-30T01:00:00",
  },
  {
    postId: postData[0].id,
    userId: users[2].id, // Mike Chen liked post1
    createdAt: "2024-03-30T01:30:00",
  },
  {
    postId: postData[1].id,
    userId: users[0].id, // Abin liked post2
    createdAt: "2024-03-29T16:00:00",
  },
  {
    postId: postData[2].id,
    userId: users[3].id, // Jane Smith liked post3
    createdAt: "2024-03-28T12:00:00",
  },
  {
    postId: postData[2].id,
    userId: users[1].id, // Sarah Lee liked post3
    createdAt: "2024-03-28T12:30:00",
  },
];
