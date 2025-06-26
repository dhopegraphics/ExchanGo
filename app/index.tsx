import "../global.css";
import { Redirect } from "expo-router";
import "react-native-url-polyfill/auto";
import React, { useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Client, Account } from "react-native-appwrite";

export default function Index() {
  const [initialRoute, setInitialRoute] = useState<
    null | "/(main)/Explore" | "/(auth)/signUp" | "/(auth)"
  >(null);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const sessionId = await SecureStore.getItemAsync("session");
        if (sessionId) {
          // Try to verify session with Appwrite
          const client = new Client()
            .setEndpoint(process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!)
            .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!);
          const account = new Account(client);
          await account.get();
          setInitialRoute("/(main)/Explore");
          return;
        }

        // No session, check if user has onboarded before
        const hasOnboarded = await AsyncStorage.getItem("hasOnboarded");
        if (hasOnboarded === "true") {
          setInitialRoute("/(auth)/signUp");
        } else {
          setInitialRoute("/(auth)");
        }
      } catch {
        setInitialRoute("/(auth)");
      }
    };

    checkSession();
  }, []);

  if (!initialRoute) return null;

  return <Redirect href={initialRoute} />;
}
