import { StyleSheet, Text, View } from "react-native";
import React, { FC } from "react";
import Animated, {
  useAnimatedStyle,
  SharedValue,
} from "react-native-reanimated";

type CircleProps = {
  circleX: SharedValue<number>;
};

const circleContainerSize = 50;

const AnimatedCircle: FC<CircleProps> = ({ circleX }) => {
  const circleContainerStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: circleX.value - circleContainerSize / 2 }],
    };
  }, []);

  return <Animated.View style={[styles.Container, circleContainerStyle]} />;
};

export default AnimatedCircle;

const styles = StyleSheet.create({
  Container: {
    position: "absolute",
    top: -circleContainerSize / 1.1,
    width: circleContainerSize,
    height: circleContainerSize,
    borderRadius: circleContainerSize,
    backgroundColor: "#0ea5e9",
    justifyContent: "center",
    alignItems: "center",
  },
});
