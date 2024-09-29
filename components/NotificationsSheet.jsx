import React, { useState } from "react";
import { View, Text, TouchableOpacity, Switch, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const NotificationsBottomSheet = ({ textColor, backgroundColor }) => {
  const [isPaused, setIsPaused] = useState(false);

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <Text style={[styles.title, { color: textColor }]}>
        Push Notifications
      </Text>

      <View style={styles.optionContainer}>
        <Text style={[styles.optionText, { color: textColor }]}>Pause All</Text>
        <Switch
          value={isPaused}
          onValueChange={setIsPaused}
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={isPaused ? "#f5dd4b" : "#f4f3f4"}
        />
      </View>

      <TouchableOpacity style={styles.optionContainer}>
        <Text style={[styles.optionText, { color: textColor }]}>Filters</Text>
        <Ionicons name="chevron-forward" size={24} color={textColor} />
      </TouchableOpacity>

      <TouchableOpacity style={styles.optionContainer}>
        <Text style={[styles.optionText, { color: textColor }]}>
          Preferences
        </Text>
        <Ionicons name="chevron-forward" size={24} color={textColor} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  optionContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  optionText: {
    fontSize: 16,
  },
});

export default NotificationsBottomSheet;
