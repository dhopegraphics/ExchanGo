// components/Explore/CategoriesSection.tsx
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { FontAwesome5 } from "@expo/vector-icons";
import SectionHeader from "./SectionHeader";
import { CategoriesSectionProps } from "@/types/ExploreTypes";

const CategoriesSection: React.FC<CategoriesSectionProps> = ({
  textColor,
  tintText,
  tintColor,
  cardBackground,
  exploreCategories,
}) => {
  const router = useRouter();
  const handleSeeAll = () => {
    router.push("/expandAll/categoriesExpand");
  };

  const renderCategoryItem = (category: any, index: number) => (
    <TouchableOpacity key={index} className="w-1/2 p-1">
      <View
        className="p-4 rounded-2xl gap-2 flex-row justify-center items-center"
        style={{
          backgroundColor: cardBackground,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 8,
          elevation: 3,
        }}
      >
        <View
          className="h-6 rounded-full"
          style={{ backgroundColor: tintColor + "20" }}
        >
          <FontAwesome5 name={category.icon} size={20} color={tintColor} />
        </View>
        <Text
          style={{ color: textColor }}
          className="font-semibold text-center text-sm"
        >
          {category.name}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View className="mb-8">
      <SectionHeader
        title="Explore Categories"
        subtitle="Find your perfect match"
        onSeeAll={handleSeeAll}
        textColor={textColor}
        tintText={tintText}
        tintColor={tintColor}
      />
      <View className="px-4">
        <View className="flex-row flex-wrap">
          {exploreCategories.slice(0, 4).map(renderCategoryItem)}
        </View>
      </View>
    </View>
  );
};

export default CategoriesSection;
