import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useThemeColor } from "@/hooks/useThemeColor";
import { router } from "expo-router";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
import { BlurView } from "expo-blur";

const CommunityCard = ({ community, users, joinedCommunities = [] }) => {
  const backgroundColor = useThemeColor({}, "background");
  const textColor = useThemeColor({}, "text");
  const tintText = useThemeColor({}, "tintText");
  const cardBackground = useThemeColor({}, "cardBackground");
  const tintColor = useThemeColor({}, "tint");

  const [isBookmarked, setIsBookmarked] = useState(false);
  const scale = useSharedValue(1);
  const bookmarkScale = useSharedValue(1);

  // Get community members
  const joinedCommunity = joinedCommunities.find(
    (join) => join.communityId === community.id
  );

  const communityMembers = joinedCommunity
    ? joinedCommunity.userIds
        .map((userId) => users.find((user) => user.id === userId))
        .filter(Boolean)
    : [];

  const handlePressIn = () => {
    scale.value = withSpring(0.98);
  };

  const handlePressOut = () => {
    scale.value = withSpring(1);
  };

  const handleBookmarkPress = () => {
    setIsBookmarked(!isBookmarked);
    bookmarkScale.value = withSpring(1.2, {}, () => {
      bookmarkScale.value = withSpring(1);
    });
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const bookmarkAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: bookmarkScale.value }],
  }));

  const MemberAvatars = () => {
    const displayMembers = communityMembers.slice(0, 4);
    const remainingCount = Math.max(0, communityMembers.length - 4);

    return (
      <View style={styles.avatarContainer}>
        {displayMembers.map((member, index) => (
          <View
            key={member?.id || index}
            style={[
              styles.avatarWrapper,
              {
                marginLeft: index > 0 ? -8 : 0,
                zIndex: displayMembers.length - index,
              },
            ]}
          >
            <Image
              source={{ uri: member?.profileImage }}
              style={[styles.memberAvatar, { borderColor: cardBackground }]}
              defaultSource={require("@/assets/images/exchanGoLogo.jpg")}
            />
          </View>
        ))}

        {remainingCount > 0 && (
          <View
            style={[
              styles.avatarWrapper,
              styles.remainingBadge,
              {
                marginLeft: displayMembers.length > 0 ? -8 : 0,
                backgroundColor: tintColor,
                borderColor: cardBackground,
              },
            ]}
          >
            <Text style={styles.remainingText}>+{remainingCount}</Text>
          </View>
        )}
      </View>
    );
  };

  const ActivityIndicator = () => (
    <View style={styles.activityContainer}>
      <View style={[styles.activityDot, { backgroundColor: "#4CAF50" }]} />
      <Text style={[styles.activityText, { color: tintText }]}>Active now</Text>
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
        onPress={() => {
          router.push({
            pathname: `/community/${community.id}`,
            params: {
              communityId: community.id,
              communityName: community.name,
              memberCount: communityMembers.length,
              avatars: JSON.stringify(
                communityMembers
                  .filter((member) => member?.profileImage)
                  .map((member) => ({ uri: member.profileImage }))
              ),
              bio: community.bio,
            },
          });
        }}
      >
        {/* Image Container with Overlay */}
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: community.profileImage }}
            style={styles.communityImage}
            resizeMode="cover"
          />

          {/* Featured Badge */}
          {community.featured && (
            <View style={styles.featuredBadge}>
              <Ionicons name="star" size={12} color="#FFD700" />
              <Text style={styles.featuredText}>Featured</Text>
            </View>
          )}

          {/* Bookmark Button */}
          <Animated.View style={[styles.bookmarkButton, bookmarkAnimatedStyle]}>
            <TouchableOpacity
              onPress={handleBookmarkPress}
              style={styles.bookmarkTouchable}
            >
              <BlurView intensity={80} tint="light" style={styles.blurView}>
                <Ionicons
                  name={isBookmarked ? "bookmark" : "bookmark-outline"}
                  size={20}
                  color={isBookmarked ? tintColor : textColor}
                />
              </BlurView>
            </TouchableOpacity>
          </Animated.View>

          {/* Activity Indicator */}
          <View style={styles.activityOverlay}>
            <ActivityIndicator />
          </View>
        </View>

        {/* Content Section */}
        <View style={styles.contentContainer}>
          {/* Header */}
          <View style={styles.headerContainer}>
            <View style={styles.titleContainer}>
              <Text
                style={[styles.communityName, { color: textColor }]}
                numberOfLines={1}
              >
                {community.name}
              </Text>
              {community.verified && (
                <MaterialIcons name="verified" size={16} color="#2196F3" />
              )}
            </View>
            <View style={styles.categoryBadge}>
              <Text style={[styles.categoryText, { color: tintColor }]}>
                {community.category || "General"}
              </Text>
            </View>
          </View>

          {/* Description */}
          <Text
            style={[styles.description, { color: tintText }]}
            numberOfLines={2}
          >
            {community.bio}
          </Text>

          {/* Stats Row */}
          <View style={styles.statsContainer}>
            <View style={styles.memberSection}>
              <MemberAvatars />
              <Text style={[styles.memberCount, { color: textColor }]}>
                {communityMembers.length.toLocaleString()} members
              </Text>
            </View>

            <View style={styles.statsRight}>
              <View style={styles.statItem}>
                <Ionicons
                  name="chatbubble-outline"
                  size={14}
                  color={tintText}
                />
                <Text style={[styles.statText, { color: tintText }]}>
                  {Math.floor(Math.random() * 100)}
                </Text>
              </View>
              <View style={styles.statItem}>
                <Ionicons name="heart-outline" size={14} color={tintText} />
                <Text style={[styles.statText, { color: tintText }]}>
                  {Math.floor(Math.random() * 500)}
                </Text>
              </View>
            </View>
          </View>

          {/* Action Buttons */}
          <View style={styles.actionContainer}>
            <TouchableOpacity
              style={[styles.joinButton, { backgroundColor: cardBackground }]}
              onPress={(e) => {
                e.stopPropagation();
                // Handle join action
              }}
            >
              <Ionicons name="add" size={16} color="white" />
              <Text style={styles.joinButtonText}>Join</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.previewButton, { borderColor: tintColor }]}
              onPress={(e) => {
                e.stopPropagation();
                // Handle preview action
              }}
            >
              <Ionicons name="eye-outline" size={16} color={tintColor} />
              <Text style={[styles.previewButtonText, { color: tintColor }]}>
                Preview
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    overflow: "hidden",
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 8,
  },
  imageContainer: {
    height: 180,
    position: "relative",
  },
  communityImage: {
    width: "100%",
    height: "100%",
  },
  gradientOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
  },
  featuredBadge: {
    position: "absolute",
    top: 12,
    left: 12,
    backgroundColor: "rgba(255, 215, 0, 0.9)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
  },
  featuredText: {
    color: "#000",
    fontSize: 10,
    fontWeight: "600",
    marginLeft: 4,
  },
  bookmarkButton: {
    position: "absolute",
    top: 12,
    right: 12,
  },
  bookmarkTouchable: {
    borderRadius: 20,
    overflow: "hidden",
  },
  blurView: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  activityOverlay: {
    position: "absolute",
    bottom: 12,
    left: 12,
  },
  activityContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  activityDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 4,
  },
  activityText: {
    fontSize: 10,
    fontWeight: "500",
  },
  contentContainer: {
    padding: 16,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 8,
  },
  titleContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  communityName: {
    fontSize: 18,
    fontWeight: "700",
    marginRight: 6,
  },
  categoryBadge: {
    backgroundColor: "rgba(255, 107, 107, 0.1)",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },
  categoryText: {
    fontSize: 10,
    fontWeight: "600",
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  memberSection: {
    flex: 1,
  },
  avatarContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  avatarWrapper: {
    position: "relative",
  },
  memberAvatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 2,
  },
  remainingBadge: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
  },
  remainingText: {
    fontSize: 9,
    fontWeight: "600",
    color: "white",
  },
  memberCount: {
    fontSize: 12,
    fontWeight: "600",
  },
  statsRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  statItem: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 16,
  },
  statText: {
    fontSize: 12,
    fontWeight: "500",
    marginLeft: 4,
  },
  actionContainer: {
    flexDirection: "row",
    gap: 12,
  },
  joinButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    borderRadius: 12,
  },
  joinButtonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "600",
    marginLeft: 4,
  },
  previewButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1.5,
  },
  previewButtonText: {
    fontSize: 14,
    fontWeight: "600",
    marginLeft: 4,
  },
});

export default CommunityCard;
