import React, { useState, useEffect, useRef } from "react";
import { router, Stack } from "expo-router";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import Animated, {
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useAnimatedScrollHandler,
  useSharedValue,
  interpolateColor,
} from "react-native-reanimated";
import { SearchBar } from "react-native-elements";
import { useThemeColor } from "@/hooks/useThemeColor";
import { SCREEN_WIDTH } from "@/constants/Screen";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Feather from "@expo/vector-icons/Feather";
import CommunityDiscoverCard from "@/components/CommunityDiscoveryCard";
import Ionicons from "@expo/vector-icons/Ionicons";

import { communityDiscoverData } from "@/constants/data";

const IMG_HEIGHT = 300;

const ContactListScreen = () => {
  const backgroundColor = useThemeColor({}, "background");
  const TabTopBackgroundColor = useThemeColor({}, "tabBarBackground");
  const insets = useSafeAreaInsets();
  const textColor = useThemeColor({}, "text");
  const [search, setSearch] = React.useState("");
  const scrollRef = useAnimatedRef();
  const scrollOffset = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler((event) => {
    scrollOffset.value = event.contentOffset.y;
  });
  const imageAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            scrollOffset.value,
            [-IMG_HEIGHT, 0, IMG_HEIGHT],
            [-IMG_HEIGHT / 2, 0, IMG_HEIGHT * 0.75]
          ),
        },
      ],
    };
  });

  const headerAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(scrollOffset.value, [0, IMG_HEIGHT / 1.5], [0, 1]),
    };
  });
  const headerTitleAnimatedStyle = useAnimatedStyle(() => {
    return {
      color: interpolateColor(
        scrollOffset.value,
        [0, IMG_HEIGHT / 1.5],
        ["white", "white"]
      ),
      opacity: interpolate(scrollOffset.value, [0, IMG_HEIGHT / 1.5], [0, 1]),
    };
  });
  const filterButtonStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      scrollOffset.value,
      [0, 1000], // Adjust these values to control when the button starts fading
      [0, 1],
      "clamp"
    );

    return {
      opacity,
    };
  });

  return (
    <View style={[styles.container, { backgroundColor: backgroundColor }]}>
      <Stack.Screen
        options={{
          headerTransparent: true,
          headerTitle: () => (
            <Animated.View
              style={{ flexDirection: "row", justifyContent: "flex-start" }}
            >
              <Animated.Text
                style={[styles.headerTitle, headerTitleAnimatedStyle]}
              >
                Discover Communities
              </Animated.Text>
              <Animated.View style={{ marginLeft: 100, flexDirection: "row" }}>
                <TouchableOpacity>
                  <Feather name="plus" size={24} color="white" />
                </TouchableOpacity>

                <TouchableOpacity>
                  <Feather
                    name="more-vertical"
                    size={24}
                    color="white"
                    style={{ marginLeft: 20 }}
                  />
                </TouchableOpacity>
              </Animated.View>
            </Animated.View>
          ),
          headerBackground: () => (
            <Animated.View
              style={[
                styles.headerTop,
                headerAnimatedStyle,
                { backgroundColor: backgroundColor },
              ]}
            />
          ),
        }}
      />

      <View
        style={[styles.bottomSection, { backgroundColor: backgroundColor }]}
      >
        <Animated.ScrollView
          ref={scrollRef}
          scrollEventThrottle={16}
          showsVerticalScrollIndicator={false}
          onScroll={scrollHandler}
        >
          <Animated.View
            style={[
              imageAnimatedStyle,
              { paddingTop: insets.top, padding: 5, marginTop: 30 },
            ]}
          >
            <Text style={[styles.header, { color: textColor }]}>
              Discover Communities
            </Text>
            <Text style={[styles.subHeader, { color: textColor }]}>
              Find communities to join or create your own
            </Text>
            <SearchBar
              placeholder="Type a name or number"
              onChangeText={setSearch}
              value={search}
              lightTheme
              round
              containerStyle={styles.searchBarContainer}
              inputContainerStyle={styles.searchBarInput}
            />
            <Text
              className="text-lg font-bold mb-2"
              style={{ color: textColor }}
            >
              Recently Visited
            </Text>
            <CommunityDiscoverCard community={communityDiscoverData[5]} />
          </Animated.View>
          <View style={{ height: 2000, backgroundColor: backgroundColor }}>
            <Text
              className="text-lg font-JakartaBold"
              style={{ color: textColor }}
            >
              Discover More
            </Text>
            <FlatList
              data={communityDiscoverData}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <CommunityDiscoverCard community={item} />
              )}
              contentContainerStyle={{ padding: 16 }}
              scrollEnabled={false}
            />
          </View>
        </Animated.ScrollView>
        <Animated.View
          style={[
            filterButtonStyle,
            { justifyContent: "center", alignItems: "center" },
          ]}
          className="justify-center items-center"
        >
          <TouchableOpacity
            className="absolute bottom-40  w-12 h-12 right-6 bg-blue-500 rounded-full p-4 shadow-lg"
            onPress={() => {
              scrollRef.current?.scrollTo({ y: 0, animated: true });
            }}
          >
            <Feather
              name="arrow-up"
              size={20}
              color="white"
              style={{ marginLeft: -2, marginTop: -2 }}
            />
          </TouchableOpacity>
        </Animated.View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subHeader: {
    fontSize: 14,
    color: "#888",
    marginBottom: 20,
  },
  searchBarContainer: {
    backgroundColor: "transparent",
    borderTopWidth: 0,
    borderBottomWidth: 0,
    marginBottom: 10,
  },
  searchBarInput: {
    backgroundColor: "#e9e9e9",
  },
  groupList: {
    paddingLeft: 20,
    paddingBottom: 20,
  },
  groupItem: {
    flex: 1,
    alignItems: "center",
    marginRight: 20,
  },
  groupImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginBottom: 5,
  },
  groupName: {
    marginBottom: 5,
    fontSize: 12,
    textAlign: "center",
  },
  contactList: {
    marginBottom: 90,
  },
  contactItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  contactImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  contactInfo: {
    flex: 1,
  },
  contactName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  contactPhone: {
    fontSize: 14,
    color: "#888",
  },
  inviteButton: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: "#007bff",
    borderRadius: 5,
    marginBottom: 10,
  },
  inviteButtonText: {
    color: "#fff",
    fontSize: 14,
  },
  image: {},
  section: {
    marginBottom: 24,
  },
  bottomSection: {
    flex: 1,
    borderTopLeftRadius: 40, // Rounded top-left corner
    borderTopRightRadius: 40, // Rounded top-right corner
    marginTop: -15, // Negative margin to overlap with the blue background
    flexGrow: 1, // Allows the ScrollView to expand
    paddingTop: 10,
  },
  headerTop: {
    height: 100,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default ContactListScreen;
