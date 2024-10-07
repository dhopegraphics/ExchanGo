import React from "react";
import { useFonts } from "expo-font";
import { View, StyleSheet } from "react-native";
import { SplashScreen, Stack, Slot, useRouter, useSegments } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { ThemeProvider } from "@/Context/ThemeContext";
import { ToastProvider } from "@/Context/ToastContext";
import { useEffect } from "react";
import { JoinProvider } from "@/Context/CommunityJoinContext";
SplashScreen.preventAutoHideAsync();
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { LastVisitedCommunityProvider } from "../Context/LastVisitedCommunityContext";

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
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      <Stack.Screen name="(main)" options={{ headerShown: false }} />
      <Stack.Screen
        name="account/profileCreation"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="account/[userProfilePreview]"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="account/mainPersonalProfile"
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
      <Stack.Screen name="community/[id]" options={{ headerShown: false }} />
      <Stack.Screen name="community/Rules" options={{ headerShown: false }} />
      <Stack.Screen
        name="expandAll/categoriesExpand"
        options={{ headerShown: false }}
      />
    </Stack>
  );
};

export default function RootLayout() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <LastVisitedCommunityProvider>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <BottomSheetModalProvider>
              <JoinProvider>
                <MainLayout />
              </JoinProvider>
            </BottomSheetModalProvider>
          </GestureHandlerRootView>
        </LastVisitedCommunityProvider>
      </ToastProvider>
    </ThemeProvider>
  );
}
