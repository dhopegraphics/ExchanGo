export function getUserSkills(userId, userSkills) {
  return userSkills
    .filter((skill) => skill.users.includes(userId))
    .map((skill) => skill.skillName);
}

export function getSkillUsers(skillName, userSkills) {
  const skill = userSkills.find((s) => s.skillName === skillName);
  return skill ? skill.users : [];
}

// Function to get community IDs and the users joined to each community
export function getCommunityMembers(
  communityDetails,
  joinedCommunities,
  users
) {
  return communityDetails.map((community) => {
    // Find the entry in joinedCommunities that matches the current community ID
    const joinedInfo = joinedCommunities.find(
      (j) => j.communityId === community.id
    );
    // Map the userIds to user objects
    const memberDetails = joinedInfo
      ? joinedInfo.userIds.map((userId) =>
          users.find((user) => user.id === userId)
        )
      : [];
    return {
      communityId: community.id,
      communityName: community.name,
      members: memberDetails,
    };
  });
}

// Function to get user details by ID
export const getPostUser = (userId) => {
  return users.find((user) => user.id === userId);
};

export const getLikesForPost = (postId) => {
  return likesData.filter((like) => like.postId === postId);
};
