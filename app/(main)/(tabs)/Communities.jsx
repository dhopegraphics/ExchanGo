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
import { communityDetails } from "../../../data/communitiesDetail";
import { joinedCommunities } from "../../../data/joinedCommunities";
import { users } from "@/data/users";

const IMG_HEIGHT = 300;

const ContactListScreen = () => {
  const backgroundColor = useThemeColor({}, "background");
  const TabTopBackgroundColor = useThemeColor({}, "tabBarBackground");
  const insets = useSafeAreaInsets();
  const textColor = useThemeColor({}, "text");
  const [search, setSearch] = React.useState("");
  const [visibleItems, setVisibleItems] = useState(5);

  const handleShowMore = () => {
    if (visibleItems + 5 >= communityDetails.length) {
      setVisibleItems(communityDetails.length);
    } else {
      setVisibleItems(visibleItems + 5);
    }
  };
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

  const NameAnimatedStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      scrollOffset.value,
      [0, 70], // Adjust these values to control when the button starts fading
      [1, 0],
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
            <Animated.Text
              style={[styles.header, { color: textColor }, NameAnimatedStyle]}
            >
              Discover Communities
            </Animated.Text>
            <Text style={[{ color: textColor }]}>
              Find communities to join or create your own
            </Text>
            <SearchBar
              placeholder="Search communities"
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
            <CommunityDiscoverCard
              community={communityDetails[5]}
              users={users}
              joinedCommunities={joinedCommunities}
            />
          </Animated.View>
          <View
            style={{
              height: "auto",
              backgroundColor: backgroundColor,
              paddingBottom: insets.bottom,
            }}
          >
            <Text
              className="text-lg font-JakartaBold"
              style={{ color: textColor }}
            >
              Discover More
            </Text>
            <FlatList
              data={communityDetails.slice(0, visibleItems)}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <CommunityDiscoverCard
                  community={item}
                  users={users}
                  joinedCommunities={joinedCommunities}
                />
              )}
              contentContainerStyle={{ padding: 16 }}
              scrollEnabled={false}
            />
            {visibleItems < communityDetails.length ? (
              <TouchableOpacity onPress={handleShowMore} className="ml-4">
                <View className="mb-4 mr-4">
                  <Text
                    className="text-sm font-JakartaBold mb-4 "
                    style={{ color: textColor }}
                  >
                    Show More
                  </Text>
                </View>
              </TouchableOpacity>
            ) : (
              <Text style={styles.endOfListText}>
                End of the previews, search your type community
              </Text>
            )}
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
            className="absolute bottom-32  w-12 h-12 right-6 bg-blue-500 rounded-full p-4 shadow-lg"
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
  searchBarContainer: {
    backgroundColor: "transparent",
    borderTopWidth: 0,
    borderBottomWidth: 0,
    marginBottom: 10,
  },
  searchBarInput: {
    backgroundColor: "#e9e9e9",
  },

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
    paddingBottom: 40,
  },
  headerTop: {
    height: 100,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  showMoreButton: {},
  showMoreText: {
    color: "#fff",
    fontSize: 16,
  },
  endOfListText: {
    textAlign: "center",
    color: "#888",
    fontSize: 16,
    marginVertical: 10,
  },
});

export default ContactListScreen;
