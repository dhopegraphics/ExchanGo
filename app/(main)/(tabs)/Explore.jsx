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
} from "react-native";
import Animated from "react-native-reanimated";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import { SCREEN_WIDTH } from "@/constants/Screen";
import { HelloWave } from "../../../components/HelloWave";
import { Collapsible } from "../../../components/Collapsible";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useScrollAnimation } from "@/components/CollapsibleScrollAnimated";
import AnimatedHeaderScrollView from "@/components/AnimatedViewCollapse";
import { categories, featuredListings, skillListings } from "@/constants/data";
import { SearchBarHeader } from "@/components/searchBarHeader";

const IMG_HEIGHT = 300;

const HomeScreen = () => {
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const backgroundColor = useThemeColor({}, "background");
  const textColor = useThemeColor({}, "text");
  const { showToast } = useToast();
  const {
    scrollRef,
    scrollHandler,
    imageAnimatedStyle,
    headerAnimatedStyle,
    headerTitleAnimatedStyle,
  } = useScrollAnimation();

  return (
    <View style={[styles.container, { backgroundColor: backgroundColor }]}>
      <Stack.Screen
        options={{
          headerTransparent: true,
          headerTitle: () => <SearchBarHeader />,
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
            <TouchableOpacity className="mr-4">
              <Ionicons name="settings-outline" size={24} color={textColor} />
            </TouchableOpacity>
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
                uri: "https://img.freepik.com/premium-photo/portrait-colorful-leaves-with-word-rain-them_1077802-370441.jpg",
              }}
              style={styles.image}
              resizeMode="cover"
            />
          </Animated.View>
        }
      >
        <ScrollView className="flex-1 pt-20">
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="py-4"
          >
            {categories.map((category, index) => (
              <TouchableOpacity
                key={index}
                className="mx-2 items-center"
                style={{
                  backgroundColor: category.gradient[0],
                  borderRadius: 12,
                  padding: 12,
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.1,
                  shadowRadius: 4,
                  elevation: 3,
                }}
              >
                <FontAwesome5 name={category.icon} size={24} color="white" />
                <Text className="text-white font-bold mt-2">
                  {category.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Featured Listings */}
          <View className="my-4">
            <Text className="text-xl font-bold px-4 mb-2">Featured Skills</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {featuredListings.map((listing) => (
                <View
                  key={listing.id}
                  className="mx-2 bg-white rounded-lg shadow-md p-4 w-64"
                >
                  <View className="flex-row items-center mb-2">
                    <Image
                      source={{ uri: listing.image }}
                      className="w-12 h-12 rounded-full mr-4"
                    />
                    <View>
                      <Text className="font-bold">{listing.name}</Text>
                      <Text>{listing.skill}</Text>
                    </View>
                  </View>
                  <View className="flex-row items-center mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Ionicons
                        key={i}
                        name={
                          i < Math.floor(listing.rating)
                            ? "star"
                            : "star-outline"
                        }
                        size={16}
                        color="#FFD700"
                      />
                    ))}
                    <Text className="ml-2">{listing.rating}</Text>
                  </View>
                  <TouchableOpacity className="bg-blue-500 rounded-full py-2 px-4">
                    <Text className="text-white text-center font-bold">
                      Request Swap
                    </Text>
                  </TouchableOpacity>
                </View>
              ))}
            </ScrollView>
          </View>

          {/* Skill Listings Grid */}
          <View className="px-4">
            <Text className="text-xl font-bold mb-4">Available Skills</Text>
            <View className="flex-row flex-wrap justify-between">
              {skillListings.map((skill) => (
                <View
                  key={skill.id}
                  className="w-[48%] bg-white rounded-lg shadow-md p-4 mb-4"
                >
                  <Image
                    source={{ uri: `https://i.pravatar.cc/100?u=${skill.id}` }}
                    className="w-16 h-16 rounded-full mb-2 self-center"
                  />
                  <Text className="font-bold text-center">{skill.skill}</Text>
                  <Text className="text-center">{skill.name}</Text>
                  <View className="flex-row items-center justify-center mt-2">
                    <Ionicons name="location-outline" size={16} color="gray" />
                    <Text className="text-gray-600 ml-1">{skill.location}</Text>
                  </View>
                  <Text className="text-center text-gray-600 mt-1">
                    {skill.availability}
                  </Text>
                </View>
              ))}
            </View>
          </View>
          {/* Filter Button */}
        </ScrollView>
      </AnimatedHeaderScrollView>
      <TouchableOpacity
        className="absolute bottom-40 right-6 bg-blue-500 rounded-full p-4 shadow-lg"
        onPress={() => {
          /* Implement filter modal */
        }}
      >
        <Ionicons name="filter" size={24} color="white" />
      </TouchableOpacity>
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
