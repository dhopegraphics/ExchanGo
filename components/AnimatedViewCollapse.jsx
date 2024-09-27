import React from "react";
import { View, Image, StyleSheet } from "react-native";
import Animated from "react-native-reanimated";
import { SCREEN_WIDTH } from "@/constants/Screen";
import { useScrollAnimation } from "./CollapsibleScrollAnimated";
import { useThemeColor } from "@/hooks/useThemeColor";

const IMG_HEIGHT = 300;

const AnimatedHeaderScrollView = ({
  underContentChild,
  children,
  scrollRef,
  scrollHandler,
}) => {
  const { imageAnimatedStyle } = useScrollAnimation(IMG_HEIGHT);
  const backgroundColor = useThemeColor({}, "background");
  return (
    <View style={[styles.bottomSection, { backgroundColor: backgroundColor }]}>
      <Animated.ScrollView
        ref={scrollRef}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        onScroll={scrollHandler}
      >
        <Animated.View style={[styles.image, imageAnimatedStyle]}>
          {underContentChild}
        </Animated.View>
        <View style={{ height: 1000, backgroundColor: backgroundColor }}>
          {children}
        </View>
      </Animated.ScrollView>
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

export default AnimatedHeaderScrollView;
