import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const SettingsGroup = () => {
  const insets = useSafeAreaInsets();
  return (
    <View style={{ paddingTop: insets.top, paddingBottom: insets.bottom }}>
      <Text>Settings</Text>
    </View>
  );
};

export default SettingsGroup;

const styles = StyleSheet.create({});
