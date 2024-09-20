import { StyleSheet, Text, View, Pressable } from "react-native";
import React, { FC, useEffect } from "react";
import Animated, {
  useAnimatedProps,
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { Feather } from "@expo/vector-icons";
import { getPathXCenterByIndex } from "../../utils/Path";
import usePath from "../../hooks/usePath";
import { SCREEN_WIDTH } from "../../constants/Screen";

export type TabProps = {
  label: string;
  icon: string;
  index: number;
  activeIndex: number;
  onTabPress: () => void;
};

const ICON_SIZE = 25;
const LABEL_WIDTH = SCREEN_WIDTH / 4;
const AnimatedIcon = Animated.createAnimatedComponent(Feather);

const TabItem: FC<TabProps> = ({
  label,
  icon,
  index,
  activeIndex,
  onTabPress,
}) => {
  const { curvedPaths } = usePath();
  const animatedActiveIndex = useSharedValue(activeIndex);
  const iconPosition = getPathXCenterByIndex(curvedPaths, index);
  const labelPosition = getPathXCenterByIndex(curvedPaths, index);

  const tabStyle = useAnimatedStyle(() => {
    const translateY = animatedActiveIndex.value - 1 === index ? -35 : 20;
    const iconPositionX = iconPosition - index * ICON_SIZE;
    return {
      width: ICON_SIZE,
      height: ICON_SIZE,
      transform: [
        { translateY: withTiming(translateY) },
        { translateX: iconPositionX - ICON_SIZE / 2 },
      ],
    };
  });

  const labelContainerStyle = useAnimatedStyle(() => {
    const translateY = animatedActiveIndex.value - 1 === index ? 36 : 100;
    return {
      transform: [
        { translateY: withTiming(translateY) },
        { translateX: labelPosition - LABEL_WIDTH / 2 },
      ],
    };
  });

  const iconColor = useSharedValue(activeIndex === index ? "#fff" : "#FF7F50");

  useEffect(() => {
    animatedActiveIndex.value = activeIndex;
    if (activeIndex === index + 1) {
      iconColor.value = withTiming("#fff");
    } else {
      iconColor.value = withTiming("#FF7F50");
    }
  }, [activeIndex]);

  const AnimatedIconProps = useAnimatedProps(() => ({
    color: iconColor.value,
  }));

  return (
    <>
      <Animated.View style={[tabStyle]}>
        <Pressable
          testID={`tab${label}`}
          hitSlop={{ top: 30, bottom: 30, left: 50, right: 50 }}
          onPress={onTabPress}
        >
          <AnimatedIcon
            name={icon as keyof typeof Feather.glyphMap}
            size={25}
            animatedProps={AnimatedIconProps}
          />
        </Pressable>
      </Animated.View>

      <Animated.View style={[labelContainerStyle, styles.labelContainer]}>
        <Text style={styles.label}>{label}</Text>
      </Animated.View>
    </>
  );
};

const styles = StyleSheet.create({
  labelContainer: {
    position: "absolute",
    width: LABEL_WIDTH,
    alignItems: "center",
  },
  label: {
    fontSize: 15,
    color: "white",
    fontWeight: "600",
  },
});

export default TabItem;
