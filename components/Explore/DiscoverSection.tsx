// components/Explore/DiscoverSection.tsx
import React from "react";
import { View, FlatList } from "react-native";
import SectionHeader from "./SectionHeader";
import DiscoverCard from "@/components/DiscoveryCard";
import { DiscoverSectionProps } from "@/types/ExploreTypes";

const DiscoverSection: React.FC<DiscoverSectionProps> = ({
  textColor,
  tintText,
  tintColor,
  discoverData,
}) => {
  const renderDiscoverItem = ({ item }: { item: any }) => (
    <DiscoverCard person={item} />
  );

  return (
    <View className="mb-8">
      <SectionHeader
        title="Discover People"
        subtitle="Connect with talented individuals"
        textColor={textColor}
        tintText={tintText}
        tintColor={tintColor}
      />
      <FlatList
        horizontal
        data={discoverData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderDiscoverItem}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16 }}
      />
    </View>
  );
};

export default DiscoverSection;
