import { Tabs } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function TabLayout() {
  return (
    <>
      <StatusBar style="dark" />
      <Tabs screenOptions={{ tabBarActiveTintColor: "blue" }}>
        <Tabs.Screen name="Explore" options={{ headerShown: false }} />
        <Tabs.Screen name="SwapCenter" options={{ headerShown: false }} />
        <Tabs.Screen name="Communities" />
        <Tabs.Screen name="Settings" options={{ headerShown: false }} />
      </Tabs>
    </>
  );
}
