export const createDatabaseService = (db) => {
  return {
    // User operations
    getCurrentUser: async () => {
      return await db.getFirstAsync(
        "SELECT * FROM users WHERE id = 'dhopeIsaac'"
      );
    },

    // Community operations
    getAllCommunities: async () => {
      return await db.getAllAsync("SELECT * FROM communities");
    },

    getCommunityById: async (id) => {
      return await db.getFirstAsync("SELECT * FROM communities WHERE id = ?", [
        id,
      ]);
    },

    searchCommunities: async (searchTerm) => {
      return await db.getAllAsync(
        "SELECT * FROM communities WHERE name LIKE ?",
        [`%${searchTerm}%`]
      );
    },

    getJoinedUsersForCommunity: async (communityId) => {
      return await db.getAllAsync(
        `SELECT u.* FROM users u
         JOIN joined_communities jc ON u.id = jc.userId
         WHERE jc.communityId = ?`,
        [communityId]
      );
    },

    getJoinedCommunitiesForUser: async (userId) => {
      return await db.getAllAsync(
        `SELECT c.* FROM communities c
         JOIN joined_communities jc ON c.id = jc.communityId
         WHERE jc.userId = ?`,
        [userId]
      );
    },

    joinCommunity: async (userId, communityId) => {
      try {
        await db.runAsync(
          "INSERT INTO joined_communities (userId, communityId) VALUES (?, ?)",
          [userId, communityId]
        );
        return true;
      } catch (error) {
        if (error.message.includes("UNIQUE constraint failed")) {
          return false; // Already joined
        }
        throw error;
      }
    },

    leaveCommunity: async (userId, communityId) => {
      const result = await db.runAsync(
        "DELETE FROM joined_communities WHERE userId = ? AND communityId = ?",
        [userId, communityId]
      );
      return result.changes > 0;
    },

    // Last visited community
    setLastVisitedCommunity: async (userId, communityId) => {
      // This could be stored in a separate table or in user preferences
      // For simplicity, we'll just return the community
      return await this.getCommunityById(communityId);
    },

    getLastVisitedCommunity: async (userId) => {
      // In a real app, you would query the user's preferences
      // For now, we'll just return the first community
      return await db.getFirstAsync(
        `SELECT c.* FROM communities c
         JOIN joined_communities jc ON c.id = jc.communityId
         WHERE jc.userId = ?
         ORDER BY c.createdAt DESC
         LIMIT 1`,
        [userId]
      );
    },
  };
};
