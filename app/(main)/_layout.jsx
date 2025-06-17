import React from "react";
import { Drawer } from "expo-router/drawer";
import { CustomDrawerContent } from "@/components/CustomDrawer";
import { useThemeColor } from "@/hooks/useThemeColor";
import {
  configureReanimatedLogger,
  ReanimatedLogLevel,
} from "react-native-reanimated";

configureReanimatedLogger({
  level: ReanimatedLogLevel.warn,
  strict: false,
});

export default function DrawerLayout() {
  const backgroundColor = useThemeColor({}, "background");
  return (
    <Drawer
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        drawerStyle: { backgroundColor: backgroundColor },
      }}
    >
      <Drawer.Screen name="notifications" options={{ headerShown: false }} />
    </Drawer>
  );
}
