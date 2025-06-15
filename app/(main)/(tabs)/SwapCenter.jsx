import React, { useCallback, useRef, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ConnectionCard } from "@/components/SwapConnect";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { Easing } from "react-native-reanimated";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import FilterScreen from "@/components/FilterBottomitems";
import { users, currentUser } from "@/data/users";
import { connectedUsers } from "@/data/userConnection";
import { UserRating } from "@/data/userRating";
import { userSkills } from "@/data/userSkills";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
} from "react-native-reanimated";

const SwapCenter = () => {
  const backgroundColor = useThemeColor({}, "background");
  const textColor = useThemeColor({}, "text");
  const tintText = useThemeColor({}, "tintText");
  const cardBackground = useThemeColor({}, "cardBackground");
  const tintColor = useThemeColor({}, "tint");
  const insets = useSafeAreaInsets();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const filterSheetBottomSheetRef = useRef(null);
  const searchScale = useSharedValue(1);
  const headerOpacity = useSharedValue(1);

  const categories = [
    { id: "all", name: "All", icon: "grid-outline" },
    { id: "featured", name: "Featured", icon: "star-outline" },
    { id: "nearby", name: "Nearby", icon: "location-outline" },
    { id: "skilled", name: "Top Rated", icon: "trophy-outline" },
    { id: "recent", name: "Recent", icon: "time-outline" },
  ];

  const handlePresentFilterModalPress = useCallback(() => {
    filterSheetBottomSheetRef.current?.present();
  }, []);

  const filteredUsers = users
    .filter((user) => user.id !== currentUser.id)
    .filter((user) => {
      const matchesSearch = user.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesFilter =
        selectedFilter === "all" ||
        (selectedFilter === "featured" && user.featured) ||
        (selectedFilter === "nearby" && user.location) ||
        (selectedFilter === "skilled" && user.rating > 4);
      return matchesSearch && matchesFilter;
    });

  const handleSearchFocus = () => {
    setIsSearchFocused(true);
    searchScale.value = withSpring(1.02);
    headerOpacity.value = withTiming(0.8);
  };

  const handleSearchBlur = () => {
    setIsSearchFocused(false);
    searchScale.value = withSpring(1);
    headerOpacity.value = withTiming(1);
  };

  const searchAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: searchScale.value }],
  }));

  const headerAnimatedStyle = useAnimatedStyle(() => ({
    opacity: headerOpacity.value,
  }));

  const CategoryFilter = () => (
    <View className="flex-row px-4 mb-6 overflow-x-auto">
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {categories.map((category) => (
          <View key={category.id}>
            <TouchableOpacity
              onPress={() => setSelectedFilter(category.id)}
              className={`mr-3 h-12 w-32 px-4 py-2 rounded-full flex-row items-center ${
                selectedFilter === category.id ? "bg-orange-400" : ""
              }`}
              style={{
                backgroundColor:
                  selectedFilter === category.id ? tintColor : cardBackground,
                borderWidth: 1,
                borderColor:
                  selectedFilter === category.id ? tintColor : "#E5E7EB",
              }}
            >
              <Ionicons
                name={category.icon}
                size={16}
                color={selectedFilter === category.id ? "white" : tintText}
              />
              <Text
                className={`ml-2 font-medium ${
                  selectedFilter === category.id ? "text-white" : ""
                }`}
                style={{
                  color: selectedFilter === category.id ? "white" : textColor,
                }}
              >
                {category.name}
              </Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );

  const QuickStats = () => (
    <View className="flex-row px-4 mb-6">
      <View className="flex-1 mr-2" style={{ backgroundColor: cardBackground }}>
        <View className="p-4 rounded-xl">
          <View className="flex-row items-center justify-between mb-2">
            <Text style={{ color: textColor }} className="text-lg font-bold">
              {filteredUsers.length}
            </Text>
            <Ionicons name="people" size={20} color={tintColor} />
          </View>
          <Text style={{ color: tintText }} className="text-xs">
            Available Swappers
          </Text>
        </View>
      </View>

      <View className="flex-1 ml-2" style={{ backgroundColor: cardBackground }}>
        <View className="p-4 rounded-xl">
          <View className="flex-row items-center justify-between mb-2">
            <Text style={{ color: textColor }} className="text-lg font-bold">
              {connectedUsers.length}
            </Text>
            <Ionicons name="link" size={20} color={tintColor} />
          </View>
          <Text style={{ color: tintText }} className="text-xs">
            Your Connections
          </Text>
        </View>
      </View>
    </View>
  );

  const EmptyState = () => (
    <View className="flex-1 justify-center items-center px-8">
      <Ionicons name="search" size={64} color={tintText} />
      <Text
        style={{ color: textColor }}
        className="text-xl font-bold mt-4 mb-2"
      >
        No results found
      </Text>
      <Text style={{ color: tintText }} className="text-center">
        Try adjusting your search terms or filters to find more swappers
      </Text>
    </View>
  );

  return (
    <>
      <View style={{ flex: 1, backgroundColor }}>
        {/* Header */}
        <Animated.View
          style={[
            {
              paddingHorizontal: 16,
              paddingBottom: 16,
              backgroundColor,
            },
            headerAnimatedStyle,
          ]}
        >
          <View className="flex-row justify-between items-center mb-4">
            <View>
              <Text style={{ color: textColor }} className="text-2xl font-bold">
                Swap Center
              </Text>
              <Text style={{ color: tintText }} className="text-sm">
                Connect with skilled swappers nearby
              </Text>
            </View>
            <View className="flex-row space-x-3">
              <TouchableOpacity
                onPress={handlePresentFilterModalPress}
                className="p-2 rounded-full"
                style={{ backgroundColor: cardBackground }}
              >
                <FontAwesome name="filter" size={20} color={textColor} />
              </TouchableOpacity>
              <TouchableOpacity
                className="p-2 rounded-full"
                style={{ backgroundColor: cardBackground }}
              >
                <MaterialCommunityIcons
                  name="dots-vertical"
                  size={20}
                  color={textColor}
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Enhanced Search Bar */}
          <Animated.View style={searchAnimatedStyle}>
            <View
              className="flex-row items-center px-4 py-3 rounded-xl"
              style={{
                backgroundColor: cardBackground,
                borderWidth: isSearchFocused ? 2 : 1,
                borderColor: isSearchFocused ? tintColor : "#E5E7EB",
              }}
            >
              <Ionicons
                name="search"
                size={20}
                color={isSearchFocused ? tintColor : tintText}
              />
              <TextInput
                className="flex-1 ml-3 text-base"
                style={{ color: textColor }}
                placeholder="Search swappers by name or skill..."
                placeholderTextColor={tintText}
                value={searchQuery}
                onChangeText={setSearchQuery}
                onFocus={handleSearchFocus}
                onBlur={handleSearchBlur}
              />
              {searchQuery.length > 0 && (
                <TouchableOpacity onPress={() => setSearchQuery("")}>
                  <Ionicons name="close-circle" size={20} color={tintText} />
                </TouchableOpacity>
              )}
            </View>
          </Animated.View>
        </Animated.View>

        {/* Category Filters */}
        <CategoryFilter />

        {/* Quick Stats */}
        <QuickStats />

        {/* Main Content */}
        <View className="flex-1 px-4">
          {filteredUsers.length > 0 ? (
            <FlatList
              data={filteredUsers}
              renderItem={({ item, index }) => (
                <ConnectionCard
                  user={item}
                  connectedUsers={connectedUsers}
                  ratings={UserRating}
                  userSkill={userSkills}
                  index={index}
                />
              )}
              keyExtractor={(item) => item.id}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: 120 }}
              scrollEventThrottle={16}
              ItemSeparatorComponent={() => <View className="h-3" />}
            />
          ) : (
            <EmptyState />
          )}
        </View>
      </View>

      <BottomSheetModal
        ref={filterSheetBottomSheetRef}
        index={0}
        snapPoints={["50%", "70%", "80%", "90%"]}
        animationConfigs={{
          duration: 800,
          easing: Easing.elastic(1),
        }}
        backgroundStyle={{
          backgroundColor: cardBackground,
        }}
        enablePanDownToClose={true}
      >
        <FilterScreen />
      </BottomSheetModal>
    </>
  );
};

export default SwapCenter;
