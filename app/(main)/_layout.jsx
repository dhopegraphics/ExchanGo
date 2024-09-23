import { View, Text, StyleSheet, Image } from "react-native";
import React, { useEffect } from "react";
import { Drawer } from "expo-router/drawer";
import { CustomDrawerContent } from "@/components/CustomDrawer";
import { useThemeColor } from "@/hooks/useThemeColor";

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
      <Drawer.Screen name="settings/index" options={{ headerShown: false }} />
    </Drawer>
  );
}
