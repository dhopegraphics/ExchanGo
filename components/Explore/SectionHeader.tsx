// components/Explore/SectionHeader.tsx
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { SectionHeaderProps } from "@/types/ExploreTypes";

const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  subtitle,
  onSeeAll,
  textColor,
  tintText,
  tintColor,
}) => {
  return (
    <View className="flex-row justify-between items-center px-4 mb-4">
      <View>
        <Text style={{ color: textColor }} className="text-xl font-bold">
          {title}
        </Text>
        {subtitle && (
          <Text style={{ color: tintText }} className="text-sm">
            {subtitle}
          </Text>
        )}
      </View>
      {onSeeAll && (
        <TouchableOpacity onPress={onSeeAll}>
          <Text style={{ color: tintColor }} className="font-semibold">
            See All
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default SectionHeader;
