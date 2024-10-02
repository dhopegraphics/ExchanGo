import React, { createContext, useState, useContext } from "react";

const JoinContext = createContext();

export const JoinProvider = ({ children }) => {
  const [joinedCommunities, setJoinedCommunities] = useState({});

  const joinCommunity = (communityId) => {
    setJoinedCommunities((prev) => ({ ...prev, [communityId]: true }));
  };

  const leaveCommunity = (communityId) => {
    setJoinedCommunities((prev) => {
      const newState = { ...prev };
      delete newState[communityId];
      return newState;
    });
  };

  const isJoined = (communityId) => !!joinedCommunities[communityId];

  return (
    <JoinContext.Provider
      value={{ joinedCommunities, joinCommunity, leaveCommunity, isJoined }}
    >
      {children}
    </JoinContext.Provider>
  );
};

export const useJoin = () => useContext(JoinContext);
