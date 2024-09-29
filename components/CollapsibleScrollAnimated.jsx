import {
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useAnimatedScrollHandler,
  useSharedValue,
  interpolateColor,
} from "react-native-reanimated";
import { useState } from "react";

const IMG_HEIGHT = 300;

export const useScrollAnimation = () => {
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
        ["white", "white"]
      ),
    };
  });

  const filterButtonStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      scrollOffset.value,
      [0, 700], // Adjust these values to control when the button starts fading
      [1, 0],
      "clamp"
    );

    return {
      opacity,
    };
  });

  return {
    scrollRef,
    scrollHandler,
    imageAnimatedStyle,
    headerAnimatedStyle,
    headerTitleAnimatedStyle,
    scrollOffset,
    filterButtonStyle,
  };
};
