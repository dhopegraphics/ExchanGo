import "react-native-url-polyfill/auto";
import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { ThemeProvider } from "@/Context/ThemeContext";
import { ToastProvider } from "@/Context/ToastContext";
import { JoinProvider } from "@/Context/CommunityJoinContext";

const MainLayout = () => {
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
        <GestureHandlerRootView style={{ flex: 1 }}>
          <JoinProvider>
            <MainLayout />
          </JoinProvider>
        </GestureHandlerRootView>
      </ToastProvider>
    </ThemeProvider>
  );
}
