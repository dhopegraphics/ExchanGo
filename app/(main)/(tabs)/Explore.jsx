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
import { SearchBarHeader } from "@/components/searchBarHeader";
import { imageDataURL } from "../../../constants/ImageData";
import { useNavigation } from "@react-navigation/native";
import { ModernCollapsible } from "@/components/ModernCollapsible";

const IMG_HEIGHT = 300;

const HomeScreen = () => {
  const navigation = useNavigation();
  const backgroundColor = useThemeColor({}, "background");
  const cardBackground = useThemeColor({}, "cardBackground");
  const textColor = useThemeColor({}, "text");
  const tintText = useThemeColor({}, "tintText");
  const tintBackground = useThemeColor({}, "tintBackground");
  const { showToast } = useToast();
  const { scrollRef, scrollHandler, imageAnimatedStyle, headerAnimatedStyle } =
    useScrollAnimation();

  return (
    <View style={[styles.container, { backgroundColor: backgroundColor }]}>
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
            <TouchableOpacity className="mr-4">
              <Ionicons name="notifications" size={24} color={textColor} />
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
                uri: imageDataURL[7],
              }}
              style={styles.image}
              resizeMode="cover"
            />
          </Animated.View>
        }
      >
        <ScrollView className="flex-1">
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
            <View style={{ backgroundColor: backgroundColor }}>
              <TouchableOpacity activeOpacity={0.8}>
                <View className=" w-full h-40 rounded-xl overflow-hidden mb-2">
                  <Image
                    source={{ uri: imageDataURL[5] }}
                    className="w-full h-40"
                    resizeMode="cover"
                  />
                </View>
              </TouchableOpacity>

              <View className="p-3">
                <View className="flex-row justify-between items-center">
                  <Text
                    style={{ color: textColor }}
                    className="text-lg font-semibold mb-1"
                  >
                    Animation Community
                  </Text>
                  <View className="flex-row items-center">
                    <TouchableOpacity>
                      <Ionicons
                        name="bookmark-outline"
                        size={24}
                        color={textColor}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
                <View className="flex-row mb-4 items-center">
                  <View className="flex-row mr-2">
                    {[1, 2, 3, 4].map((_, index) => (
                      <Image
                        key={index}
                        source={{
                          uri: `https://i.pravatar.cc/32?img=${index}`,
                        }}
                        className={`w-6 h-6 rounded-full border-2 border-white ${
                          index > 0 ? "-ml-3" : ""
                        }`}
                      />
                    ))}
                  </View>

                  <Text
                    style={{ color: textColor }}
                    className="text-xs font-JakartaSemiBold text-gray-600"
                  >
                    669 Members
                  </Text>
                </View>
              </View>
            </View>
          </View>

          {/* Explore Categories */}
          <ModernCollapsible
            title="Explore"
            seeAllPress={() => console.log("See All")}
          >
            <View className="flex-row flex-wrap flex-grow space-x-2 ">
              {[
                { name: "Animation", icon: "film" },
                { name: "Language", icon: "language" },
                { name: "Architecture", icon: "building" },
                { name: "Photography", icon: "camera" },
                { name: "Illustration", icon: "paint-brush" },
                { name: "Music", icon: "music" },
              ].map((category, index) => (
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
          </ModernCollapsible>

          {/* Discover Section */}
          <View className="px-4">
            <View className="flex-row justify-between items-center mb-4">
              <Text className="text-lg font-bold" style={{ color: textColor }}>
                Discover
              </Text>
              <TouchableOpacity>
                <Text className="text-sm text-blue-500">See All</Text>
              </TouchableOpacity>
            </View>

            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View className="flex-row">
                {[
                  { name: "Kavitha", skill: "Interior Design" },
                  { name: "Dinesh", skill: "Full Stack Development" },
                  { name: "Abin", skill: "Graphic Design" },
                  { name: "Sara", skill: "UX Design" },
                  { name: "Mike", skill: "Data Science" },
                ].map((person, index) => (
                  <View
                    key={index}
                    className="items-center w-[22%]  rounded-lg p-2 mr-4"
                    style={{
                      backgroundColor: cardBackground,
                      borderWidth: 1,
                      borderColor: tintBackground,
                    }}
                  >
                    <View className="relative">
                      <Image
                        source={{
                          uri: `https://i.pravatar.cc/64?img=${index + 10}`,
                        }}
                        className="w-16 h-16 rounded-full"
                      />
                      <TouchableOpacity className="absolute -top-1 -right-1 bg-gray-100 rounded-full p-1">
                        <Ionicons name="close" size={16} color="#4B5563" />
                      </TouchableOpacity>
                    </View>
                    <Text
                      className="mt-2 text-sm font-medium"
                      style={{ color: textColor }}
                    >
                      {person.name}
                    </Text>
                    <Text
                      style={{ color: tintText }}
                      className="text-xs font-JakartaSemiBold "
                    >
                      {person.skill}
                    </Text>
                    <TouchableOpacity className="mt-2 bg-orange-400 px-4 py-1 rounded-full">
                      <Text className="text-white text-xs font-medium">
                        Connect
                      </Text>
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            </ScrollView>
          </View>
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
