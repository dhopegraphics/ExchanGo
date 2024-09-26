import React, { useState } from "react";
import { useThemeColor } from "@/hooks/useThemeColor";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";

export const SearchBarHeader = () => {
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const textColor = useThemeColor({}, "text");

  const searchBarWidth = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      width: withSpring(searchBarWidth.value),
    };
  });

  const toggleSearch = () => {
    setIsSearchActive(!isSearchActive);
    searchBarWidth.value = isSearchActive ? 0 : "100%";
  };

  return (
    <View className="w-full flex-row items-center justify-between px-8">
      {isSearchActive ? (
        <>
          <Animated.View
            style={[
              {
                flex: 1,
                height: 40,
                backgroundColor: "orange",
                borderRadius: 20,
                marginRight: 16,
                paddingHorizontal: 16,
              },
              animatedStyle,
            ]}
          >
            <TextInput
              className="flex-1 h-10 bg-transparent rounded-full"
              placeholder="Search for skills..."
              placeholderTextColor="white"
              value={searchQuery}
              onChangeText={setSearchQuery}
              autoFocus
              onBlur={toggleSearch}
            />
          </Animated.View>
          <TouchableOpacity></TouchableOpacity>
        </>
      ) : (
        <TouchableOpacity onPress={toggleSearch}>
          <Text className="text-lg font-semibold text-orange-300">
            Search Skills
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};
