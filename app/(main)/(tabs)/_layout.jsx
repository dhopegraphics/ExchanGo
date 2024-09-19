import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";
import CustomBottomTab from "../../../components/BottomTabs/CustomBottomTab";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{ tabBarActiveTintColor: "blue" }}
      tabBar={(props) => <CustomBottomTab {...props} />}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
        }}
      />
    </Tabs>
  );
}
