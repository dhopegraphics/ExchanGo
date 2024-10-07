// app/(main)/(context)/LastVisitedCommunityContext.js
import React, { createContext, useState } from "react";

export const LastVisitedCommunityContext = createContext();

export const LastVisitedCommunityProvider = ({ children }) => {
  const [lastVisitedCommunity, setLastVisitedCommunity] = useState(null);

  return (
    <LastVisitedCommunityContext.Provider
      value={{ lastVisitedCommunity, setLastVisitedCommunity }}
    >
      {children}
    </LastVisitedCommunityContext.Provider>
  );
};
