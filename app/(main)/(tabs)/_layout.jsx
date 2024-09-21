import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";
import CustomBottomTab from "../../../components/BottomTabs/CustomBottomTab";
import { StatusBar } from "expo-status-bar";

export default function TabLayout() {
  return (
    <>
      <StatusBar style="dark" />
      <Tabs
        screenOptions={{ tabBarActiveTintColor: "blue" }}
        tabBar={(props) => <CustomBottomTab {...props} />}
      >
        <Tabs.Screen name="home" />
        <Tabs.Screen name="profile" options={{ headerShown: false }} />
        <Tabs.Screen name="message" />
        <Tabs.Screen name="settings" options={{ headerShown: false }} />
      </Tabs>
    </>
  );
}
