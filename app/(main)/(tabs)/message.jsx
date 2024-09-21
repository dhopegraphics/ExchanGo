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

const contacts = [
  {
    id: "1",
    name: "Lori Anderson",
    phone: "1-(774)514-7528",
    image: "https://via.placeholder.com/50",
  },
  {
    id: "2",
    name: "Eugene Willis",
    phone: "3-(046)015-0121",
    image: "https://via.placeholder.com/50",
  },
  {
    id: "3",
    name: "Judy Gonzales",
    phone: "3-(046)015-0121",
    image: "https://via.placeholder.com/50",
  },
  {
    id: "4",
    name: "Douglas Hill",
    phone: "3-(421)692-9472",
    image: "https://via.placeholder.com/50",
  },
  {
    id: "5",
    name: "Emma Hart",
    phone: "3-(294)667-4878",
    image: "https://via.placeholder.com/50",
  },
  // Add more contacts as needed
];

const IMG_HEIGHT = 300;

const groups = [
  { id: "1", name: "Campsite", image: "https://via.placeholder.com/50" },
  { id: "2", name: "Camping", image: "https://via.placeholder.com/50" },
  { id: "3", name: "Hawaii", image: "https://via.placeholder.com/50" },
  // Add more groups as needed
];

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
    };
  });

  const renderContactItem = ({ item }) => (
    <View style={[styles.contactItem, { backgroundColor: backgroundColor }]}>
      <Image source={{ uri: item.image }} style={styles.contactImage} />
      <View style={styles.contactInfo}>
        <Text style={[styles.contactName, { color: textColor }]}>
          {item.name}
        </Text>
        <Text style={[styles.contactPhone, { color: textColor }]}>
          {item.phone}
        </Text>
      </View>
      <TouchableOpacity style={styles.inviteButton}>
        <Text style={styles.inviteButtonText}>Invite</Text>
      </TouchableOpacity>
    </View>
  );

  const renderGroupItem = ({ item }) => (
    <View style={styles.groupItem}>
      <Image source={{ uri: item.image }} style={styles.groupImage} />
      <Text style={[styles.groupName, { color: textColor }]}>{item.name}</Text>
      <TouchableOpacity style={styles.inviteButton}>
        <Text style={styles.inviteButtonText}>Swap</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: backgroundColor }]}>
      <Stack.Screen
        options={{
          headerTransparent: true,
          headerTitle: () => (
            <Animated.Text
              style={[styles.headerTitle, headerTitleAnimatedStyle]}
            >
              Contacts
            </Animated.Text>
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
              Select Members
            </Text>
            <Text style={[styles.subHeader, { color: textColor }]}>
              Select contacts to add to an existing Split or create a new one
              with them
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
            <FlatList
              data={groups}
              renderItem={renderGroupItem}
              keyExtractor={(item) => item.id}
              horizontal
              style={styles.groupList}
            />
          </Animated.View>
          <View style={{ paddingTop: -10 }}>
            <Text style={[styles.header, { color: textColor }]}>Contacts</Text>
          </View>
          <View style={{ height: 830 }}>
            <FlatList
              data={contacts}
              renderItem={renderContactItem}
              keyExtractor={(item) => item.id}
              style={[styles.contactList, { backgroundColor: backgroundColor }]}
              scrollEnabled={false}
            />
          </View>
        </Animated.ScrollView>
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
