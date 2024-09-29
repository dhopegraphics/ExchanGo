import React, { useRef } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
  TextInput,
  Animated,
} from "react-native";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AirbnbRating } from "@rneui/themed";
import { Rating } from "@rneui/themed";
import { imageDataURL } from "../../../constants/ImageData";
import { BlurView } from "expo-blur"; // Make sure to install expo-blur

const ConnectionCard = ({ item }) => {
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

const SwapCenter = () => {
  const backgroundColor = useThemeColor({}, "background");
  const textColor = useThemeColor({}, "text");
  const insets = useSafeAreaInsets();
  const scrollY = useRef(new Animated.Value(0)).current;

  const connections = [
    {
      id: "1",
      name: "Sithara",
      avatar: imageDataURL[6],
      primarySkill: "UI Design",
      secondarySkill: "Web Development",
      location: "Mylapore, Chennai",
      rating: 4,
      featured: false,
    },
    {
      id: "2",
      name: "Tara",
      avatar: imageDataURL[7],
      primarySkill: "Photography",
      secondarySkill: "Animation",
      location: "Mylapore, Chennai",
      rating: 4,
      featured: true,
    },
    // Add more connection data here
  ];

  const backgroundOpacity = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [1, 0],
    extrapolate: "clamp",
  });

  return (
    <View
      style={[
        styles.container,
        { paddingTop: insets.top, backgroundColor: backgroundColor },
      ]}
    >
      <Animated.View style={[{ backgroundColor, opacity: backgroundOpacity }]}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: textColor }]}>Connect</Text>
          <TouchableOpacity>
            <FontAwesome name="filter" size={24} color={textColor} />
          </TouchableOpacity>
        </View>

        <View style={styles.searchContainer}>
          <Ionicons
            name="search"
            size={20}
            color="#666"
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Search"
            placeholderTextColor="#666"
          />
        </View>
      </Animated.View>

      <Animated.FlatList
        data={connections}
        renderItem={({ item }) => <ConnectionCard item={item} />}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
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

export default SwapCenter;
