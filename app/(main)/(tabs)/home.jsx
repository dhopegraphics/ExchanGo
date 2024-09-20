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
  useScrollViewOffset,
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";
import { Ionicons, MaterialIcons, FontAwesome } from "@expo/vector-icons";
import { SCREEN_WIDTH } from "@/constants/Screen";

const IMG_HEIGHT = 300;

const HomeScreen = () => {
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

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerTransparent: true,
          headerTitle: "Clinic Details",
          headerLeft: () => {
            return <View></View>;
          },
          headerBackground: () => (
            <Animated.View style={[styles.header, headerAnimatedStyle]} />
          ),
        }}
      />

      <View style={styles.bottomSection}>
        <Animated.ScrollView
          ref={scrollRef}
          scrollEventThrottle={16}
          showsVerticalScrollIndicator={false}
          onScroll={scrollHandler}
        >
          <Animated.Image
            source={{
              uri: "https://fps.cdnpk.net/images/home/subhome-ai.webp?w=649&h=649",
            }}
            style={[styles.image, imageAnimatedStyle]}
          />

          <View style={{ height: 830, backgroundColor: "white" }}>
            <ScrollView style={styles.contentContainer}>
              <View style={styles.section}>
                <Text style={styles.title}>Welcome to ExchanGo</Text>
                <Text style={styles.description}>
                  Exchange your skills and services with others. No money
                  involved, just pure talent trading!
                </Text>
              </View>
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Popular Skills</Text>
                {/* Add components or content to showcase popular skills */}
              </View>
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Recent Trades</Text>
                {/* Add components or content to showcase recent trades */}
              </View>
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Categories</Text>
                {/* Add components or content to showcase different categories */}
              </View>
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
    backgroundColor: "#ffffff", // White background
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
  image: {
    width: SCREEN_WIDTH,
    height: IMG_HEIGHT,
  },
});

export default HomeScreen;
