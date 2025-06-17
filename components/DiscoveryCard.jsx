import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useThemeColor } from "@/hooks/useThemeColor";
import { router } from "expo-router";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { BlurView } from "expo-blur";

const DiscoverCard = ({ person }) => {
  const backgroundColor = useThemeColor({}, "background");
  const cardBackground = useThemeColor({}, "cardBackground");
  const textColor = useThemeColor({}, "text");
  const tintText = useThemeColor({}, "tintText");
  const tintColor = useThemeColor({}, "tint");

  const [isLiked, setIsLiked] = useState(false);
  const [isConnected, setIsConnected] = useState(false);

  const scale = useSharedValue(1);
  const likeScale = useSharedValue(1);
  const connectScale = useSharedValue(1);

  const handlePressIn = () => {
    scale.value = withSpring(0.95);
  };

  const handlePressOut = () => {
    scale.value = withSpring(1);
  };

  const handleLikePress = () => {
    setIsLiked(!isLiked);
    likeScale.value = withSpring(1.3, {}, () => {
      likeScale.value = withSpring(1);
    });
  };

  const handleConnectPress = () => {
    setIsConnected(!isConnected);
    connectScale.value = withSpring(0.95, {}, () => {
      connectScale.value = withSpring(1);
    });
  };

  const handleCardPress = () => {
    router.push({
      pathname: `/profile/${person.id}`,
      params: {
        userId: person.id,
        userName: person.name,
        userSkill: person.skill,
        profileImage: person.profileImage,
      },
    });
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const likeAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: likeScale.value }],
  }));

  const connectAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: connectScale.value }],
  }));

  const SkillBadges = () => {
    const skills = Array.isArray(person.skill) ? person.skill : [person.skill];

    return (
      <View style={styles.skillContainer}>
        {skills.slice(0, 2).map((skill, index) => (
          <View
            key={index}
            style={[styles.skillBadge, { backgroundColor: tintColor + "20" }]}
          >
            <Text style={[styles.skillText, { color: tintColor }]}>
              {skill}
            </Text>
          </View>
        ))}
      </View>
    );
  };

  const StatusIndicator = () => (
    <View style={styles.statusContainer}>
      <View style={[styles.statusDot, { backgroundColor: "#4CAF50" }]} />
      <Text style={[styles.statusText, { color: tintText }]}>Online</Text>
    </View>
  );

  return (
    <Animated.View
      style={[
        styles.container,
        { backgroundColor: cardBackground },
        animatedStyle,
      ]}
    >
      <TouchableOpacity
        activeOpacity={0.95}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={handleCardPress}
      >
        {/* Header with Close and Like */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.closeButton}>
            <Ionicons name="close" size={16} color={tintText} />
          </TouchableOpacity>

          <Animated.View style={likeAnimatedStyle}>
            <TouchableOpacity
              onPress={handleLikePress}
              style={styles.likeButton}
            >
              <Ionicons
                name={isLiked ? "heart" : "heart-outline"}
                size={18}
                color={isLiked ? "#FF6B6B" : tintText}
              />
            </TouchableOpacity>
          </Animated.View>
        </View>

        {/* Profile Image with Gradient Border */}
        <View style={styles.profileContainer}>
          <View
            style={[styles.imageWrapper, { backgroundColor: cardBackground }]}
          >
            <Image
              source={{ uri: person.profileImage }}
              style={styles.profileImage}
              defaultSource={require("@/assets/images/exchanGoLogo.jpg")}
            />
          </View>

          {/* Verification Badge */}
          {person.verified && (
            <View style={styles.verificationBadge}>
              <MaterialIcons name="verified" size={16} color="#2196F3" />
            </View>
          )}
        </View>

        {/* User Info */}
        <View style={styles.infoContainer}>
          <Text
            style={[styles.userName, { color: textColor }]}
            numberOfLines={1}
          >
            {person.name}
          </Text>

          <StatusIndicator />

          {/* Skills */}
          <SkillBadges />

          {/* Stats */}
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Ionicons name="star" size={12} color="#FFD700" />
              <Text style={[styles.statText, { color: tintText }]}>
                {person.rating || "4.8"}
              </Text>
            </View>
            <View style={styles.statItem}>
              <Ionicons name="people-outline" size={12} color={tintText} />
              <Text style={[styles.statText, { color: tintText }]}>
                {person.connections || Math.floor(Math.random() * 500)}
              </Text>
            </View>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionContainer}>
          <TouchableOpacity
            onPress={(e) => {
              e.stopPropagation();
              // Handle message action
            }}
            style={[styles.messageButton, { borderColor: tintColor }]}
          >
            <Ionicons name="chatbubble-outline" size={16} color={tintColor} />
          </TouchableOpacity>

          <Animated.View
            style={[styles.connectButtonContainer, connectAnimatedStyle]}
          >
            <TouchableOpacity
              onPress={(e) => {
                e.stopPropagation();
                handleConnectPress();
              }}
              style={[
                styles.connectButton,
                {
                  backgroundColor: isConnected ? "#4CAF50" : tintColor,
                },
              ]}
            >
              <Ionicons
                name={isConnected ? "checkmark" : "person-add"}
                size={16}
                color="white"
              />
              <Text style={styles.connectButtonText}>
                {isConnected ? "Connected" : "Connect"}
              </Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 180,
    borderRadius: 20,
    marginRight: 16,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 8,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 12,
  },
  closeButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "rgba(0,0,0,0.1)",
    justifyContent: "center",
    alignItems: "center",
  },
  likeButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "rgba(255,255,255,0.9)",
    justifyContent: "center",
    alignItems: "center",
  },
  profileContainer: {
    alignItems: "center",
    marginBottom: 16,
    position: "relative",
  },
  gradientBorder: {
    width: 74,
    height: 74,
    borderRadius: 37,
    justifyContent: "center",
    alignItems: "center",
  },
  imageWrapper: {
    width: 68,
    height: 68,
    borderRadius: 34,
    justifyContent: "center",
    alignItems: "center",
  },
  profileImage: {
    width: 64,
    height: 64,
    borderRadius: 32,
  },
  verificationBadge: {
    position: "absolute",
    bottom: 0,
    right: 12,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  infoContainer: {
    paddingHorizontal: 16,
    alignItems: "center",
  },
  userName: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 4,
    textAlign: "center",
  },
  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 4,
  },
  statusText: {
    fontSize: 10,
    fontWeight: "500",
  },
  skillContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginBottom: 12,
  },
  skillBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    margin: 2,
  },
  skillText: {
    fontSize: 10,
    fontWeight: "600",
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 16,
    marginBottom: 16,
  },
  statItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  statText: {
    fontSize: 11,
    fontWeight: "500",
    marginLeft: 4,
  },
  actionContainer: {
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingBottom: 16,
    gap: 8,
  },
  messageButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1.5,
    justifyContent: "center",
    alignItems: "center",
  },
  connectButtonContainer: {
    flex: 1,
  },
  connectButton: {
    flex: 1,
    height: 40,
    borderRadius: 20,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  connectButtonText: {
    color: "white",
    fontSize: 12,
    fontWeight: "600",
    marginLeft: 4,
  },
  bottomAccent: {
    height: 3,
  },
});

export default DiscoverCard;
