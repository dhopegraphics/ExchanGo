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

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Colors } from "@/constants/Colors";

export function Collapsible({
  children,
  title,
  seeAllPress,
}: PropsWithChildren & { title: string; seeAllPress: () => void }) {
  const [isOpen, setIsOpen] = useState(true);
  const theme = useColorScheme() ?? "light";

  return (
    <ThemedView className=" mb-4 ">
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
          <ThemedText className="text-xl" type="defaultSemiBold">
            {title}
          </ThemedText>
        </TouchableOpacity>
        <View>
          <TouchableOpacity onPress={seeAllPress}>
            <Text className="text-sm mr-4 text-blue-500">See All</Text>
          </TouchableOpacity>
        </View>
      </View>
      {isOpen && <ThemedView style={styles.content}>{children}</ThemedView>}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  heading: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginLeft: 12,
  },
  content: {
    marginTop: 6,
    marginLeft: 8,
  },
});
