// components/Explore/TrendingSection.tsx
import React from "react";
import { View } from "react-native";
import { router } from "expo-router";
import SectionHeader from "./SectionHeader";
import CommunityCard from "@/components/CommunityCard";
import { TrendingSectionProps } from "@/types/ExploreTypes";

const TrendingSection: React.FC<TrendingSectionProps> = ({
  textColor,
  tintText,
  tintColor,
  cardBackground,
  communityDetails,
  users,
  joinedCommunities,
}) => {
  const getRandomCommunity = () => {
    return communityDetails[
      Math.floor(Math.random() * communityDetails.length)
    ];
  };

  const handleSeeAll = () => {
    router.push("/expandAll/trendingExpand");
  };

  return (
    <View className="mb-8">
      <SectionHeader
        title="Trending Now"
        subtitle="Hot communities and swaps"
        onSeeAll={handleSeeAll}
        textColor={textColor}
        tintText={tintText}
        tintColor={tintColor}
      />
      <View className="px-4">
        <CommunityCard
          community={getRandomCommunity()}
          users={users}
          joinedCommunities={joinedCommunities}
        />
      </View>
    </View>
  );
};

export default TrendingSection;
