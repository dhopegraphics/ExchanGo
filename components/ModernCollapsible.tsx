import Ionicons from "@expo/vector-icons/Ionicons";
import { PropsWithChildren, useState } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
  TouchableWithoutFeedback,
  View,
  Text,
} from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";

import { Colors } from "@/constants/Colors";

export function ModernCollapsible({
  children,
  title,
  seeAllPress,
}: PropsWithChildren & { title: string; seeAllPress: () => void }) {
  const [isOpen, setIsOpen] = useState(true);
  const theme = useColorScheme() ?? "light";
  const backgroundColor = useThemeColor({}, "background");
  const textColor = useThemeColor({}, "text");

  return (
    <View className="flex-1 ml-3 mb-4">
      <View className="flex-row items-center justify-between">
        <TouchableOpacity
          style={styles.heading}
          onPress={() => setIsOpen((value) => !value)}
          activeOpacity={0.9}
        >
          <Ionicons
            name={isOpen ? "chevron-down" : "chevron-forward-outline"}
            size={18}
            color={theme === "light" ? Colors.light.icon : Colors.dark.icon}
          />
          <Text
            style={{ color: textColor }}
            className="text-lg font-JakartaSemiBold"
          >
            {title}
          </Text>
        </TouchableOpacity>
        <View>
          <TouchableOpacity onPress={seeAllPress}>
            <Text className="text-sm mr-4 text-blue-500">See All</Text>
          </TouchableOpacity>
        </View>
      </View>
      {isOpen && <View style={styles.content}>{children}</View>}
    </View>
  );
}

const styles = StyleSheet.create({
  heading: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  content: {
    marginTop: 10,
    marginLeft: 8,
    flex: 1,
  },
});
