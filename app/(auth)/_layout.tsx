import React from "react";
import { Stack } from "expo-router";

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
