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
  Dimensions,
  ActivityIndicator,
} from "react-native";
import Animated, {
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useAnimatedScrollHandler,
  useSharedValue,
  interpolateColor,
} from "react-native-reanimated";
import { Ionicons, MaterialIcons, FontAwesome } from "@expo/vector-icons";
import { SCREEN_WIDTH } from "@/constants/Screen";
import { HelloWave } from "../../../components/HelloWave";
import { Collapsible } from "../../../components/Collapsible";
import { useThemeColor } from "@/hooks/useThemeColor";

const IMG_HEIGHT = 300;

const HomeScreen = () => {
  const backgroundColor = useThemeColor({}, "background");
  const textColor = useThemeColor({}, "text");
  const { showToast } = useToast();
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
        {
          scale: interpolate(
            scrollOffset.value,
            [-IMG_HEIGHT, 0, IMG_HEIGHT],
            [2, 1, 1]
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
        ["white", "black"]
      ),
    };
  });

  return (
    <View style={[styles.container, { backgroundColor: backgroundColor }]}>
      <Stack.Screen
        options={{
          headerTransparent: true,
          headerTitle: () => (
            <Animated.Text
              style={[styles.headerTitle, headerTitleAnimatedStyle]}
            >
              ExchanGo
            </Animated.Text>
          ),
          headerBackground: () => (
            <Animated.View style={[styles.header, headerAnimatedStyle]} />
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
          <Animated.View style={[styles.image, imageAnimatedStyle]}>
            <Image
              source={{
                uri: "https://img.freepik.com/premium-photo/portrait-colorful-leaves-with-word-rain-them_1077802-370441.jpg",
              }}
              style={styles.image}
              resizeMode="cover"
            />
            <View style={{ position: "absolute", top: 80, left: 20 }}>
              <HelloWave />
            </View>
          </Animated.View>
          <View style={{ height: 830, backgroundColor: "white" }}>
            <ScrollView
              style={[
                styles.contentContainer,
                { backgroundColor: backgroundColor },
              ]}
            >
              <View style={styles.section}>
                <Text style={[styles.title, { color: textColor }]}>
                  Welcome to ExchanGo
                </Text>
                <Text style={[styles.description, { color: textColor }]}>
                  Exchange your skills and services with others. No money
                  involved, just pure talent trading!
                </Text>
              </View>

              <Collapsible title="Popular Skills">
                <View style={styles.section}>
                  <Text style={[styles.sectionTitle, { color: textColor }]}>
                    Popular Skills
                  </Text>
                  {/* Add components or content to showcase popular skills */}
                </View>
              </Collapsible>

              <Collapsible title="Recent Trades">
                <View style={styles.section}>
                  <Text style={[styles.sectionTitle, { color: textColor }]}>
                    Recent Trades
                  </Text>
                  {/* Add components or content to showcase recent trades */}
                </View>
              </Collapsible>

              <Collapsible title="Categories">
                <View style={styles.section}>
                  <Text style={[styles.sectionTitle, { color: textColor }]}>
                    Categories
                  </Text>
                  {/* Add components or content to showcase different categories */}
                </View>
              </Collapsible>
            </ScrollView>
          </View>
        </Animated.ScrollView>
      </View>
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
