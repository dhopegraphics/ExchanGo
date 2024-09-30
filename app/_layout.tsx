import React from "react";
import { useFonts } from "expo-font";
import { View, StyleSheet } from "react-native";
import { SplashScreen, Stack, Slot, useRouter, useSegments } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { ThemeProvider } from "@/Context/ThemeContext";
import { ToastProvider } from "@/Context/ToastContext";
import { useEffect } from "react";

SplashScreen.preventAutoHideAsync();

const MainLayout = () => {
  const [loaded, error] = useFonts({
    "Jakarta-Bold": require("../assets/fonts/PlusJakartaSans-Bold.ttf"),
    "Jakarta-ExtraBold": require("../assets/fonts/PlusJakartaSans-ExtraBold.ttf"),
    "Jakarta-ExtraLight": require("../assets/fonts/PlusJakartaSans-ExtraLight.ttf"),
    "Jakarta-Light": require("../assets/fonts/PlusJakartaSans-Light.ttf"),
    "Jakarta-Medium": require("../assets/fonts/PlusJakartaSans-Medium.ttf"),
    "Jakarta-SemiBold": require("../assets/fonts/PlusJakartaSans-SemiBold.ttf"),
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  return (
    <ThemeProvider>
      <ToastProvider>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="(auth)" options={{ headerShown: false }} />
            <Stack.Screen name="(main)" options={{ headerShown: false }} />
            <Stack.Screen
              name="account/profileCreation"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="ProfileSetup/fieldOfInterest"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="message/[MessageBox]"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="message/messageCenter"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="communities/[index]"
              options={{ headerShown: false }}
            />
          </Stack>
        </GestureHandlerRootView>
      </ToastProvider>
    </ThemeProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default MainLayout;
