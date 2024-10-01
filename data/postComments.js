import { postData } from "./postMade";
import { users } from "./users";

export const commentsData = [
  {
    id: 1,
    postId: postData[0].id,
    userId: users[2]?.id,
    text: "Couldn't agree more! We need to push for more accessible web education.",
    createdAt: "2024-03-30T00:35:00Z",
  },
  {
    id: 2,
    postId: postData[1].id,
    userId: users[1]?.id,
    text: "Great point! Any suggestions on where to start learning?",
    createdAt: "2024-03-30T01:15:00Z",
  },
  {
    id: 3,
    postId: postData[0].id,
    userId: users[2]?.id,
    text: "Love the color scheme! What was your inspiration?",
    createdAt: "2024-03-28T11:45:00Z",
  },
];
