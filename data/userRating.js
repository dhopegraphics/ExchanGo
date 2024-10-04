import { users } from "./users";

export const UserRating = [
  {
    id: 1,
    ratedUserId: users[0].id,
    ratedBy: [
      { userId: users[1].id, rating: 5 },
      { userId: users[2].id, rating: 4 },
      { userId: users[3].id, rating: 3 },
      { userId: users[4].id, rating: 4 },
      { userId: users[5].id, rating: 5 },
    ],
  },
  {
    id: 2,
    ratedUserId: users[1].id,
    ratedBy: [
      { userId: users[0].id, rating: 4 },
      { userId: users[3].id, rating: 5 },
      { userId: users[4].id, rating: 3 },
    ],
  },
  {
    id: 3,
    ratedUserId: users[2].id,
    ratedBy: [
      { userId: users[0].id, rating: 5 },
      { userId: users[1].id, rating: 4 },
      { userId: users[4].id, rating: 3 },
    ],
  },
  {
    id: 4,
    ratedUserId: users[3].id,
    ratedBy: [
      { userId: users[0].id, rating: 4 },
      { userId: users[1].id, rating: 5 },
      { userId: users[2].id, rating: 4 },
    ],
  },
];
