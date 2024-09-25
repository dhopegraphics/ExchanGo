import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Stack } from "expo-router";

const AuthLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ headerTitle: "Welcome", headerShown: false }}
      />
      <Stack.Screen
        name="logIn"
        options={{ title: "Log In", headerShown: false, presentation: "modal" }}
      />
      <Stack.Screen
        name="signUp"
        options={{
          title: "Sign Up",
          headerShown: false,
        }}
      />
    </Stack>
  );
};

export default AuthLayout;
