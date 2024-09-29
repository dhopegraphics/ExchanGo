import React, { useRef } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { AirbnbRating } from "@rneui/themed";

export const ConnectionCard = ({ item }) => {
  return (
    <TouchableOpacity style={styles.card} activeOpacity={0.8}>
      <Image source={{ uri: item.avatar }} style={styles.avatar} />
      <View style={styles.cardContent}>
        <Text style={styles.name}>{item.name}</Text>
        <View style={styles.skillContainer}>
          <Text style={styles.skill}>{item.primarySkill}</Text>
          <Ionicons name="arrow-forward" size={16} color="#666" />
          <Text style={styles.skill}>{item.secondarySkill}</Text>
        </View>
        <View className="items-start">
          <AirbnbRating
            count={5}
            defaultRating={item.rating}
            size={16}
            showRating={false}
            isDisabled={true}
          />
        </View>
        <Text style={styles.location}>{item.location}</Text>
      </View>
      <TouchableOpacity style={styles.favoriteButton}>
        <Ionicons name="heart-outline" size={24} color="#666" />
      </TouchableOpacity>
      {item.featured && (
        <View style={styles.featuredBadge}>
          <Text style={styles.featuredText}>Featured</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
    padding: 3,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
    padding: 3,
  },
  listContainer: {
    paddingBottom: 16,
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#f1f5f9",
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 12,
  },
  cardContent: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  skillContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  skill: {
    fontSize: 14,
    color: "#666",
    marginRight: 4,
  },
  location: {
    fontSize: 12,
    color: "#999",
  },
  favoriteButton: {
    padding: 4,
  },
  featuredBadge: {
    position: "absolute",
    top: 0,
    right: 0,
    backgroundColor: "#FFD700",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderTopRightRadius: 12,
    borderBottomLeftRadius: 12,
  },
  featuredText: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#000",
  },
});
