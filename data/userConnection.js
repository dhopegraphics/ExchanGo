import { users } from "./users";

export const connectedUsers = [
  {
    id: 1,
    userId: users[0].id,
    connectedFollowers: [
      users[1].id,
      users[2].id,
      users[3].id,
      users[4].id,
      users[5].id,
    ],

    swappedWith: [users[2].id, users[3].id, users[5].id],
  },
  {
    id: 2,
    userId: users[1].id,
    connectedFollowers: [users[0].id, users[3].id, users[4].id],
    swappedWith: [],
  },
  {
    id: 3,
    userId: users[2].id,
    connectedFollowers: [users[0].id, users[1].id, users[4].id],
    swappedWith: [users[1].id],
  },
  {
    id: 4,
    userId: users[3].id,
    connectedFollowers: [users[0].id, users[1].id, users[2].id],
    swappedWith: [],
  },
];
