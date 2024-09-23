import { View, Text } from "react-native";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useThemeColor } from "@/hooks/useThemeColor";

const notifications = () => {
  const backgroundColor = useThemeColor({}, "background");
  const insets = useSafeAreaInsets();
  return (
    <View
      style={{
        flex: 1,
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        backgroundColor: backgroundColor,
      }}
    >
      <Text>notifications</Text>
    </View>
  );
};

export default notifications;
