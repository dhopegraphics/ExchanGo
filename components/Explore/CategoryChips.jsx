import React from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useCategoryStore } from "@/stores/useCategoryStore"; // adjust path as needed

const CategoryChips = ({ cardBackground, textColor, tintText }) => {
  const { selectedCategory, setSelectedCategory } = useCategoryStore();

  const categories = [
    { id: "all", name: "All", icon: "grid", color: "#FF6B6B" },
    { id: "trending", name: "Trending", icon: "trending-up", color: "#4ECDC4" },
    { id: "featured", name: "Featured", icon: "star", color: "#45B7D1" },
    { id: "nearby", name: "Nearby", icon: "map-pin", color: "#96CEB4" },
    { id: "new", name: "New", icon: "zap", color: "#FFEAA7" },
    { id: "popular", name: "Popular", icon: "heart", color: "#FD79A8" },
  ];

  const renderCategory = ({ item }) => (
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
