// components/Explore/ForYouSection.tsx
import React from "react";
import { View } from "react-native";
import SectionHeader from "./SectionHeader";
import CommunityCard from "@/components/CommunityCard";
import { getRandomCommunities } from "@/utils/databasefunctions";
import { ForYouSectionProps } from "@/types/ExploreTypes";

const ForYouSection: React.FC<ForYouSectionProps> = ({
  textColor,
  tintText,
  tintColor,
  communityDetails,
  users,
  joinedCommunities = [],
}) => {
  const randomCommunities = getRandomCommunities(communityDetails, 3);

  const renderCommunityItem = (item: any) => (
    <View key={item.id} className="mb-4">
      <CommunityCard
        community={item}
        users={users}
        joinedCommunities={joinedCommunities}
      />
    </View>
  );

  return (
    <View className="mb-8">
      <SectionHeader
        title="For You"
        subtitle="Personalized recommendations"
        textColor={textColor}
        tintText={tintText}
        tintColor={tintColor}
      />
      <View className="px-4">{randomCommunities.map(renderCommunityItem)}</View>
    </View>
  );
};

export default ForYouSection;
