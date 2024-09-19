import React from "react";
import { View, StyleSheet } from "react-native";
import { Stack } from "expo-router";

const MainLayout = () => {
  return (
    <View style={styles.container}>
      <Stack>
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(main)" options={{ headerShown: false }} />
      </Stack>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default MainLayout;
