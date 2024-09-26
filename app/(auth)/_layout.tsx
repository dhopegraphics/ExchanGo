import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useThemeColor } from "@/hooks/useThemeColor";

const AuthLayout = () => {
  return (
    <>
      <Stack>
        <Stack.Screen
          name="index"
          options={{ headerTitle: "Welcome", headerShown: false }}
        />

        <Stack.Screen
          name="logIn"
          options={{
            title: "Log In",
            headerShown: false,
            presentation: "card",
          }}
        />
        <Stack.Screen
          name="signUp"
          options={{
            title: "Sign Up",
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="forgotPassword"
          options={{
            title: "Forgot Password",
            headerShown: false,
            presentation: "card",
          }}
        />
        <Stack.Screen
          name="verification"
          options={{
            title: "OTP Verification",
            headerShown: false,
            presentation: "card",
          }}
        />
        <Stack.Screen
          name="resetPassword"
          options={{
            title: "Reset Password",
            headerShown: false,
            presentation: "card",
          }}
        />
      </Stack>
    </>
  );
};

export default AuthLayout;
