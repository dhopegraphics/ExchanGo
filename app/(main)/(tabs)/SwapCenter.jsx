import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Assuming you're using Expo
import { useThemeColor } from "@/hooks/useThemeColor";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// Mock data for demonstration
const mockMatches = [
  { id: "1", name: "Alice", skill: "Python", status: "Pending" },
  { id: "2", name: "Bob", skill: "JavaScript", status: "In-Progress" },
  { id: "3", name: "Charlie", skill: "React Native", status: "Completed" },
];

const SwapCenter = () => {
  const backgroundColor = useThemeColor({}, "background");
  const textColor = useThemeColor({}, "text");
  const insets = useSafeAreaInsets();
  const [matches, setMatches] = useState(mockMatches);

  // Render individual match item
  const renderMatchItem = ({ item }) => (
    <View style={[styles.matchItem]}>
      <View style={styles.matchInfo}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.skill}>{item.skill}</Text>
        <Text style={[styles.status, styles[item.status.toLowerCase()]]}>
          {item.status}
        </Text>
      </View>
      <View style={styles.actions}>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="chatbubble-outline" size={24} color="#007AFF" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="checkmark-circle-outline" size={24} color="#4CD964" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="close-circle-outline" size={24} color="#FF3B30" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <ScrollView
      style={[
        styles.container,
        {
          backgroundColor: backgroundColor,
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
        },
      ]}
    >
      <Text style={[styles.title, { color: textColor }]}>Swap Center</Text>
      <FlatList
        data={matches}
        renderItem={renderMatchItem}
        keyExtractor={(item) => item.id}
        scrollEnabled={false}
      />

      <TouchableOpacity style={styles.historyButton}>
        <Text style={[styles.historyButtonText, { color: textColor }]}>
          View Swap History
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },

  matchItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
  },
  matchInfo: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
  skill: {
    fontSize: 16,
    color: "#666",
  },
  status: {
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 4,
  },
  pending: {
    color: "#FF9500",
  },
  "in-progress": {
    color: "#007AFF",
  },
  completed: {
    color: "#4CD964",
  },
  actions: {
    flexDirection: "row",
  },
  actionButton: {
    marginLeft: 12,
  },
  historyButton: {
    backgroundColor: "#007AFF",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 100,
  },
  historyButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default SwapCenter;
