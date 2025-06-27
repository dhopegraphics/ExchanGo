// screens/ExploreScreen.tsx
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useState, useCallback } from "react";
import { useToast } from "@/Context/ToastContext";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  RefreshControl,
  ScrollView,
  FlatList,
} from "react-native";
import { SCREEN_WIDTH } from "@/constants/Screen";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  interpolate,
  Extrapolation,
} from "react-native-reanimated";
import { Ionicons, Feather } from "@expo/vector-icons";
import { HelloWave } from "@/components/HelloWave";
import { useThemeColor } from "@/hooks/useThemeColor";
import { imageDataURL } from "@/constants/ImageData";
import { discoverData, exploreCategories } from "@/constants/data";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { communityDetails } from "@/data/communitiesDetail";
import { users } from "@/data/users";
import { joinedCommunities } from "@/data/joinedCommunities";
import { BlurView } from "expo-blur";
import EnhancedSearchBar from "@/components/Explore/EnhancedSearchBar";
import QuickActions from "@/components/Explore/QuickActions";
import TrendingSection from "@/components/Explore/TrendingSection";
import CategoriesSection from "@/components/Explore/CategoriesSection";
import DiscoverSection from "@/components/Explore/DiscoverSection";
import ForYouSection from "@/components/Explore/ForYouSection";

const HERO_HEIGHT = 280;
const IMG_HEIGHT = 300;

const ExploreScreen = () => {
  const backgroundColor = useThemeColor({}, "background");
  const textColor = useThemeColor({}, "text");
  const tintText = useThemeColor({}, "tintText");
  const cardBackground = useThemeColor({}, "cardBackground");
  const tintColor = useThemeColor({}, "tint");
  const insets = useSafeAreaInsets();
  const { showToast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");

  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  // Animated values
  const scrollY = useSharedValue(0);
  const searchScale = useSharedValue(1);

  // Handlers
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 2000);
  }, []);

  const handleSearchFocus = () => {
    setIsSearchFocused(true);
    searchScale.value = withSpring(1.02);
  };

  const handleSearchBlur = () => {
    setIsSearchFocused(false);
    searchScale.value = withSpring(1);
  };

  // Animated styles
  const imageAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            scrollY.value,
            [-IMG_HEIGHT, 0, IMG_HEIGHT],
            [-IMG_HEIGHT / 2, 0, IMG_HEIGHT * 0.75]
          ),
        },
        {
          scale: interpolate(
            scrollY.value,
            [-IMG_HEIGHT, 0, IMG_HEIGHT],
            [2, 1, 1]
          ),
        },
      ],
    };
  });

  const headerAnimatedStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      scrollY.value,
      [0, HERO_HEIGHT * 0.5],
      [0, 1],
      Extrapolation.CLAMP
    );
    const translateY = interpolate(
      scrollY.value,
      [0, HERO_HEIGHT],
      [0, -20],
      Extrapolation.CLAMP
    );

    return {
      opacity,
      transform: [{ translateY }],
    };
  });

  const heroAnimatedStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      scrollY.value,
      [0, HERO_HEIGHT],
      [1, 1.1],
      Extrapolation.CLAMP
    );
    const opacity = interpolate(
      scrollY.value,
      [0, HERO_HEIGHT * 0.7],
      [1, 0],
      Extrapolation.CLAMP
    );

    return {
      transform: [{ scale }],
      opacity,
    };
  });
  const categories = [
    { id: "all", name: "All", icon: "grid", color: "#FF6B6B" },
    {
      id: "trending",
      name: "Trending",
      icon: "trending-up",
      color: "#4ECDC4",
    },
    { id: "featured", name: "Featured", icon: "star", color: "#45B7D1" },
    { id: "nearby", name: "Nearby", icon: "map-pin", color: "#96CEB4" },
    { id: "new", name: "New", icon: "zap", color: "#FFEAA7" },
    { id: "popular", name: "Popular", icon: "heart", color: "#FD79A8" },
  ];
  const CategoryChips = () => (
    <View className="mb-6">
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={categories}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingHorizontal: 16 }}
        renderItem={({ item, index }) => (
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
        )}
      />
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor }]}>
      {/* Fixed Header */}
      <Animated.View
        style={[
          styles.fixedHeader,
          {
            backgroundColor,
            paddingTop: insets.top,
            borderBottomWidth: 1,
            borderBottomColor: "#E5E7EB",
          },
          headerAnimatedStyle,
        ]}
      >
        <View className="flex-row items-center justify-between px-4 py-3">
          <TouchableOpacity>
            <Ionicons name="menu" size={24} color={textColor} />
          </TouchableOpacity>
          <Text style={{ color: textColor }} className="text-lg font-bold">
            ExchanGo
          </Text>
          <HelloWave>
            <TouchableOpacity
              onPress={() => router.push("/message/messageCenter")}
            >
              <Ionicons name="chatbubbles-sharp" size={24} color={textColor} />
            </TouchableOpacity>
          </HelloWave>
        </View>
      </Animated.View>

      <Animated.ScrollView
        onScroll={(event) => {
          scrollY.value = event.nativeEvent.contentOffset.y;
        }}
        scrollEventThrottle={16}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        contentContainerStyle={{ paddingBottom: 100 }}
        style={{ backgroundColor: backgroundColor }}
      >
        <Animated.Image
          source={{ uri: imageDataURL[7] }}
          style={[styles.image, imageAnimatedStyle]}
          resizeMode="cover"
        />

        {/* Hero Section */}
        <Animated.View style={[styles.heroContainer, heroAnimatedStyle]}>
          <BlurView intensity={20} tint="dark" style={styles.heroOverlay}>
            <View className="px-6 pt-12">
              <Text className="text-white text-3xl font-bold mb-2">
                Discover & Exchange
              </Text>
              <Text className="text-white/80 text-base leading-6">
                Connect with amazing people, swap skills, and build meaningful
                communities
              </Text>
            </View>
          </BlurView>
        </Animated.View>

        {/* Search Bar */}
        <View style={{ marginTop: -40 }}>
          <EnhancedSearchBar
            tintColor={tintColor}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            cardBackground={cardBackground}
            isSearchFocused={isSearchFocused}
            handleSearchFocus={handleSearchFocus}
            handleSearchBlur={handleSearchBlur}
            tintText={tintText}
            textColor={textColor}
          />
        </View>

        {/* Category Chips */}
        <CategoryChips />

        {/* Quick Actions */}
        <QuickActions textColor={textColor} tintText={tintColor} />

        {/* Content Sections */}
        <TrendingSection
          textColor={textColor}
          tintText={tintText}
          tintColor={tintColor}
          cardBackground={cardBackground}
          communityDetails={communityDetails}
          users={users}
          joinedCommunities={joinedCommunities}
        />

        <CategoriesSection
          textColor={textColor}
          tintText={tintText}
          tintColor={tintColor}
          cardBackground={cardBackground}
          exploreCategories={exploreCategories}
        />

        <DiscoverSection
          textColor={textColor}
          tintText={tintText}
          tintColor={tintColor}
          discoverData={discoverData}
        />

        <ForYouSection
          textColor={textColor}
          tintText={tintText}
          tintColor={tintColor}
          cardBackground={cardBackground}
          communityDetails={communityDetails}
          users={users}
          joinedCommunities={joinedCommunities}
        />
      </Animated.ScrollView>

      {/* Floating Action Button */}
      <TouchableOpacity
        className="absolute bottom-24 right-6 w-14 h-14 rounded-full items-center justify-center shadow-lg"
        style={{
          backgroundColor: cardBackground,
          shadowColor: tintColor,
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.1,
          shadowRadius: 8,
          elevation: 8,
          opacity: 1,
        }}
        onPress={() => showToast("Filter options coming soon!", "info", 400)}
      >
        <Ionicons name="options" size={24} color="white" />
      </TouchableOpacity>

      <StatusBar style="light" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  fixedHeader: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
  },
  heroContainer: {
    overflow: "hidden",
  },
  heroImage: {
    width: "100%",
    height: "100%",
  },
  heroOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "flex-end",
  },
  image: {
    width: SCREEN_WIDTH,
    height: IMG_HEIGHT,
  },
});

export default ExploreScreen;
