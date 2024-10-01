import { users } from "./users";
import { communityDetails } from "./communitiesDetail";

export const joinedCommunities = [
  {
    communityId: communityDetails[0].id,
    userIds: [users[0].id, users[1].id, users[2].id],
  },
  { communityId: communityDetails[1].id, userIds: [users[3].id, users[4].id] },
  {
    communityId: communityDetails[2].id,
    userIds: [users[5].id, users[6].id, users[7].id],
  },
  {
    communityId: communityDetails[3].id,
    userIds: [users[2].id, users[3].id, users[1].id],
  },
  {
    communityId: communityDetails[4].id,
    userIds: [users[3].id, users[7].id, users[6].id, users[5].id],
  },
  {
    communityId: communityDetails[5].id,
    userIds: [users[5].id, users[6].id, users[7].id],
  },
  {
    communityId: communityDetails[6].id,
    userIds: [users[8].id, users[9].id, users[10].id],
  },
  {
    communityId: communityDetails[7].id,
    userIds: [users[1].id, users[13].id, users[3].id],
  },
  {
    communityId: communityDetails[8].id,
    userIds: [users[4].id, users[5].id, users[6].id],
  },
  {
    communityId: communityDetails[9].id,
    userIds: [users[11].id, users[12].id, users[13].id, users[14].id],
  },
  {
    communityId: communityDetails[10].id,
    userIds: [users[9].id, users[3].id, users[1].id],
  },
  {
    communityId: communityDetails[11].id,
    userIds: [users[2].id, users[3].id, users[4].id],
  },
  {
    communityId: communityDetails[12].id,
    userIds: [users[3].id, users[4].id, users[5].id],
  },
  {
    communityId: communityDetails[13].id,
    userIds: [users[7].id, users[8].id, users[9].id],
  },
  {
    communityId: communityDetails[14].id,
    userIds: [users[11].id, users[9].id, users[10].id],
  },
  {
    communityId: communityDetails[15].id,
    userIds: [users[12].id, users[13].id, users[18].id],
  },
  {
    communityId: communityDetails[16].id,
    userIds: [users[19].id, users[15].id, users[16].id],
  },
  // Add more mappings as needed
];
