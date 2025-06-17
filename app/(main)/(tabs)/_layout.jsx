import { Tabs } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useThemeColor } from "@/hooks/useThemeColor";

export default function TabLayout() {
  const tabBarBackground = useThemeColor({}, "background");
  const tabIconSelected = useThemeColor({}, "tabIconSelected");
  const tabIconDefault = useThemeColor({}, "tabIconDefault");
  const cardBackground = useThemeColor({}, "cardBackground");
  const statusBarStyle = useThemeColor({}, "statusBar");

  return (
    <>
      <StatusBar style={statusBarStyle} />
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: tabIconSelected,
          tabBarInactiveTintColor: tabIconDefault,
          tabBarStyle: {
            backgroundColor: tabBarBackground,
            borderTopWidth: 1,
            borderTopColor: cardBackground,
            elevation: 0,
            shadowOpacity: 0,
            height: Platform.OS === "ios" ? 85 : 65,
            paddingBottom: Platform.OS === "ios" ? 35 : 8,
            paddingHorizontal: 16,
          },
          tabBarItemStyle: {
            borderRadius: 20,
            marginHorizontal: 4,
            paddingVertical: 8,
            marginTop: 4,
          },
          tabBarActiveBackgroundColor: "transparent",
          tabBarLabelStyle: {
            fontSize: 10,
            fontWeight: "600",
            marginTop: 4,
            textTransform: "uppercase",
            letterSpacing: 0.5,
          },
          tabBarIconStyle: {
            marginBottom: 0,
          },
          headerShown: false,
          tabBarHideOnKeyboard: true,
        }}
      >
        <Tabs.Screen
          name="Explore"
          options={{
            title: "Explore",
            tabBarIcon: ({ color, size, focused }) => (
              <Ionicons
                name={focused ? "search" : "search-outline"}
                size={focused ? 26 : 24}
                color={color}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="SwapCenter"
          options={{
            title: "Swap",
            tabBarIcon: ({ color, size, focused }) => (
              <Ionicons
                name={focused ? "swap-vertical" : "swap-vertical-outline"}
                size={focused ? 26 : 24}
                color={color}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="Communities"
          options={{
            title: "Community",
            tabBarIcon: ({ color, size, focused }) => (
              <Ionicons
                name={focused ? "chatbubbles" : "chatbubbles-outline"}
                size={focused ? 26 : 24}
                color={color}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="Settings"
          options={{
            title: "Profile",
            tabBarIcon: ({ color, size, focused }) => (
              <Ionicons
                name={focused ? "person-circle" : "person-circle-outline"}
                size={focused ? 26 : 24}
                color={color}
              />
            ),
          }}
        />
      </Tabs>
    </>
  );
}
