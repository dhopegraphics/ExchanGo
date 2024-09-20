import React from "react";
import { View, StyleSheet } from "react-native";
import { Stack } from "expo-router";
import { ThemeProvider } from "@/Context/ThemeContext";

const MainLayout = () => {
  return (
    <View style={styles.container}>
      <ThemeProvider>
        <Stack>
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          <Stack.Screen name="(main)" options={{ headerShown: false }} />
        </Stack>
      </ThemeProvider>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default MainLayout;
