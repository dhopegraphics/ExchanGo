// components/Explore/CategoryChips.tsx
import React from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";
import { Feather } from "@expo/vector-icons";
import { CategoryChipsProps } from "@/types/ExploreTypes";

const CategoryChips: React.FC<CategoryChipsProps> = ({
  categories,
  selectedCategory,
  setSelectedCategory,
  cardBackground,
  textColor,
  tintText,
}) => {
  const renderCategory = ({ item }: { item: any }) => (
    <TouchableOpacity
      onPress={() => setSelectedCategory(item.id)}
      className={`mr-3 px-4 py-2 rounded-full flex-row items-center ${
        selectedCategory === item.id ? "shadow-lg" : ""
      }`}
      style={{
        backgroundColor:
          selectedCategory === item.id ? item.color : cardBackground,
        shadowColor: selectedCategory === item.id ? item.color : "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: selectedCategory === item.id ? 0.3 : 0.1,
        shadowRadius: 8,
        elevation: selectedCategory === item.id ? 8 : 2,
      }}
    >
      <Feather
        name={item.icon}
        size={16}
        color={selectedCategory === item.id ? "white" : tintText}
      />
      <Text
        className={`ml-2 font-semibold ${
          selectedCategory === item.id ? "text-white" : ""
        }`}
        style={{
          color: selectedCategory === item.id ? "white" : textColor,
        }}
      >
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View className="mb-6">
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={categories}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingHorizontal: 16 }}
        renderItem={renderCategory}
      />
    </View>
  );
};

export default CategoryChips;
