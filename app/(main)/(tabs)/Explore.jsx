import { router, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect, useRef } from "react";
import { useToast } from "@/Context/ToastContext";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  FlatList,
} from "react-native";
import Animated from "react-native-reanimated";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import { SCREEN_WIDTH } from "@/constants/Screen";
import { HelloWave } from "../../../components/HelloWave";
import { Collapsible } from "../../../components/Collapsible";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useScrollAnimation } from "@/components/CollapsibleScrollAnimated";
import AnimatedHeaderScrollView from "@/components/AnimatedViewCollapse";
import { SearchBarHeader } from "@/components/searchBarHeader";
import { imageDataURL } from "../../../constants/ImageData";
import { useNavigation } from "@react-navigation/native";
import {
  discoverData,
  exploreCategories,
  forYouCommunity,
} from "../../../constants/data";
import CommunityCard from "@/components/CommunityCard";
import { trendingCommunity } from "../../../constants/data";
import DiscoverCard from "../../../components/DiscoveryCard";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { communityDetails } from "../../../data/communitiesDetail";
import { users } from "../../../data/users";
import { joinedCommunities } from "../../../data/joinedCommunities";
import { getRandomCommunities } from "../../../utils/databasefunctions";
const IMG_HEIGHT = 300;

const HomeScreen = () => {
  const navigation = useNavigation();
  const backgroundColor = useThemeColor({}, "background");
  const cardBackground = useThemeColor({}, "cardBackground");
  const textColor = useThemeColor({}, "text");
  const tintText = useThemeColor({}, "tintText");
  const tintBackground = useThemeColor({}, "tintBackground");
  const { showToast } = useToast();
  const {
    scrollRef,
    scrollHandler,
    imageAnimatedStyle,
    headerAnimatedStyle,
    filterButtonStyle,
  } = useScrollAnimation();
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: backgroundColor, paddingBottom: insets.bottom },
      ]}
    >
      <Stack.Screen
        options={{
          headerTransparent: true,
          headerTitle: () => <SearchBarHeader />,
          headerLeft: () => (
            <TouchableOpacity onPress={navigation.openDrawer} className="ml-4">
              <Ionicons name="menu" size={24} color={textColor} />
            </TouchableOpacity>
          ),
          headerBackground: () => (
            <Animated.View
              style={[
                styles.header,
                headerAnimatedStyle,
                { backgroundColor: backgroundColor },
              ]}
            />
          ),
          headerRight: () => (
            <HelloWave>
              <TouchableOpacity
                className="mr-4"
                onPress={() => router.navigate("/message/messageCenter")}
              >
                <Ionicons
                  name="chatbubbles-sharp"
                  size={24}
                  color={textColor}
                />
              </TouchableOpacity>
            </HelloWave>
          ),
        }}
      />
      <StatusBar style="auto" />

      <AnimatedHeaderScrollView
        scrollRef={scrollRef}
        scrollHandler={scrollHandler}
        underContentChild={
          <Animated.View style={[styles.image, imageAnimatedStyle]}>
            <Image
              source={{
                uri: imageDataURL[7],
              }}
              style={styles.image}
              resizeMode="cover"
            />
          </Animated.View>
        }
      >
        <View className="flex-1 pb-16 mb-16 ">
          {/* Trending Section */}
          <View className="px-4 pt-4">
            <View className="flex-row justify-between items-center mb-4">
              <Text className="text-lg font-bold" style={{ color: textColor }}>
                Trending
              </Text>
              <TouchableOpacity>
                <Text className="text-sm text-blue-500">See All</Text>
              </TouchableOpacity>
            </View>

            {/* Trending Card */}

            <CommunityCard community={trendingCommunity} />
          </View>

          {/* Explore Categories */}
          <Collapsible title="Explore Categories">
            <View className="flex-row flex-wrap flex-grow space-x-2 ">
              {exploreCategories.map((category, index) => (
                <TouchableOpacity key={index}>
                  <View className="flex-row items-center  justify-center mb-4 border-2 border-gray-400 bg-gray-100 rounded-lg p-[6px] px-[10px] py-[8px] ">
                    <FontAwesome5
                      name={category.icon}
                      size={18}
                      color="#4B5563"
                    />
                    <Text className=" font-JakartaMedium ml-2 text-xs text-gray-700">
                      {category.name}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </Collapsible>

          {/* Discover Section */}
          <View>
            <Collapsible title="Discover">
              <FlatList
                data={discoverData}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => <DiscoverCard person={item} />}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ padding: 10 }}
              />
            </Collapsible>
            <Collapsible title="For You">
              <FlatList
                data={getRandomCommunities(communityDetails)} // Use the random selection function
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                  <CommunityCard
                    community={item}
                    users={users}
                    joinedCommunities={joinedCommunities}
                  />
                )}
                contentContainerStyle={{ padding: 16 }}
                scrollEnabled={false}
              />
            </Collapsible>
          </View>
        </View>
      </AnimatedHeaderScrollView>
      <Animated.View style={[filterButtonStyle]}>
        <TouchableOpacity
          className="absolute bottom-40 right-6 bg-blue-500 rounded-full p-4 shadow-lg"
          onPress={() => {
            /* Implement filter modal */
          }}
        >
          <Ionicons name="filter" size={24} color="white" />
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerImage: {
    width: "100%",
    height: 200,
  },
  contentContainer: {
    padding: 16,
  },
  section: {
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 16,
    color: "black",
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 16,
    color: "black",
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 8,
  },
  bottomSection: {
    flex: 1,
    borderTopLeftRadius: 40, // Rounded top-left corner
    borderTopRightRadius: 40, // Rounded top-right corner
    marginTop: -15, // Negative margin to overlap with the blue background
    flexGrow: 1, // Allows the ScrollView to expand
    paddingTop: 10,
  },
  header: {
    backgroundColor: "white",
    height: 100,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  image: {
    width: SCREEN_WIDTH,
    height: IMG_HEIGHT,
  },
});

export default HomeScreen;
