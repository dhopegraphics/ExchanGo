import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { router } from "expo-router";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Ionicons } from "@expo/vector-icons";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";

type User = {
  id: string;
  profileImage?: string;
  // Add other user fields as needed
};

type Community = {
  id: string;
  name?: string;
  profileImage?: string;
  bio?: string;
  isVerified?: boolean;
  // Add other community fields as needed
};

type JoinedCommunity = {
  communityId: string;
  userIds: string[];
};

type CommunityDiscoverCardProps = {
  community: Community;
  users?: User[];
  joinedCommunities?: any[];
  onPress?: (community: Community) => void;
};

const CommunityDiscoverCard: React.FC<CommunityDiscoverCardProps> = ({
  community,
  users = [],
  joinedCommunities = [],
  onPress,
}) => {
  const textColor = useThemeColor({}, "text");
  const tintText = useThemeColor({}, "tintText");
  const cardBackground = useThemeColor({}, "cardBackground");
  const tintColor = useThemeColor({}, "tint");

  // Define scale BEFORE using it in useAnimatedStyle
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));
  // ...existing code...
  // Early return if community is null/undefined
  if (!community) {
    return null; // or return a skeleton/placeholder component
  }

  // Safely get community members with null checks
  const joinedCommunity = joinedCommunities.find(
    (join) => join?.communityId === community?.id
  );

  const communityMembers = joinedCommunity?.userIds
    ? joinedCommunity.userIds
        .map((userId: string) => users.find((user) => user?.id === userId))
        .filter(Boolean) // Remove any null/undefined users
    : [];

  const handlePress = () => {
    if (onPress) {
      onPress(community);
    }

    if (community?.id) {
      router.push({
        pathname: "/community/[id]",
        params: {
          id: community.id,
          communityId: community.id,
          communityName: community.name || "Unknown Community",
          memberCount: communityMembers.length,
          avatars: JSON.stringify(
            communityMembers
              .filter((member: { profileImage: any }) => member?.profileImage)
              .map((member: { profileImage: any }) => ({
                uri: member?.profileImage,
              }))
          ),
          bio: community.bio || "",
        },
      });
    }
  };

  const handlePressIn = () => {
    scale.value = withSpring(0.97);
  };

  const handlePressOut = () => {
    scale.value = withSpring(1);
  };

  const MemberAvatars = () => {
    const displayMembers = communityMembers.slice(0, 5);
    const remainingCount = Math.max(0, communityMembers.length - 5);

    return (
      <View style={styles.avatarContainer}>
        {displayMembers.map(
          (member: { id: any; profileImage: any }, index: number) => (
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
              {member?.profileImage ? (
                <Image
                  source={{ uri: member.profileImage }}
                  style={[styles.memberAvatar, { borderColor: cardBackground }]}
                  defaultSource={require("@/assets/images/exchanGoLogo.jpg")}
                />
              ) : (
                <View
                  style={[
                    styles.memberAvatar,
                    styles.defaultAvatar,
                    { backgroundColor: tintColor + "20" },
                  ]}
                >
                  <Ionicons name="person" size={12} color={tintColor} />
                </View>
              )}
            </View>
          )
        )}

        {remainingCount > 0 && (
          <View
            style={[
              styles.avatarWrapper,
              styles.remainingCountContainer,
              {
                marginLeft: displayMembers.length > 0 ? -8 : 0,
                backgroundColor: tintColor,
                borderColor: cardBackground,
              },
            ]}
          >
            <Text style={styles.remainingCountText}>+{remainingCount}</Text>
          </View>
        )}
      </View>
    );
  };

  return (
    <Animated.View style={animatedStyle}>
      <TouchableOpacity
        activeOpacity={0.95}
        onPress={handlePress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={[styles.card, { backgroundColor: cardBackground }]}
      >
        {/* Community Image */}
        <View style={styles.imageContainer}>
          {community.profileImage ? (
            <Image
              source={{ uri: community.profileImage }}
              style={styles.communityImage}
              defaultSource={require("@/assets/images/exchanGoLogo.jpg")}
            />
          ) : (
            <View
              style={[
                styles.communityImage,
                styles.defaultImage,
                { backgroundColor: tintColor + "20" },
              ]}
            >
              <Ionicons name="people" size={24} color={tintColor} />
            </View>
          )}

          {/* Activity Indicator */}
          <View
            style={[styles.activityIndicator, { backgroundColor: "#4CAF50" }]}
          />
        </View>

        {/* Community Info */}
        <View style={styles.contentContainer}>
          <View style={styles.headerContainer}>
            <Text
              style={[styles.communityName, { color: textColor }]}
              numberOfLines={1}
            >
              {community.name || "Unknown Community"}
            </Text>

            {/* Verification Badge */}
            {community.isVerified && (
              <Ionicons name="checkmark-circle" size={16} color="#2196F3" />
            )}
          </View>

          {/* Member Count */}
          <View style={styles.memberInfo}>
            <Ionicons name="people-outline" size={12} color={tintText} />
            <Text style={[styles.memberCount, { color: tintText }]}>
              {communityMembers.length.toLocaleString()} members
            </Text>
          </View>

          {/* Bio Preview */}
          {community.bio && (
            <Text style={[styles.bio, { color: tintText }]} numberOfLines={2}>
              {community.bio}
            </Text>
          )}

          {/* Member Avatars */}
          <MemberAvatars />
        </View>

        {/* Join Button */}
        <TouchableOpacity
          style={[styles.joinButton, { backgroundColor: tintColor }]}
          onPress={(e) => {
            e.stopPropagation();
            // Handle join action
          }}
        >
          <Ionicons name="add" size={16} color="white" />
        </TouchableOpacity>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    padding: 16,
    marginBottom: 12,
    borderRadius: 16,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  imageContainer: {
    position: "relative",
    marginRight: 12,
  },
  communityImage: {
    width: 60,
    height: 60,
    borderRadius: 16,
  },
  defaultImage: {
    justifyContent: "center",
    alignItems: "center",
  },
  activityIndicator: {
    position: "absolute",
    bottom: -2,
    right: -2,
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: "white",
  },
  contentContainer: {
    flex: 1,
    justifyContent: "space-between",
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  communityName: {
    fontSize: 16,
    fontWeight: "600",
    flex: 1,
    marginRight: 8,
  },
  memberInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  memberCount: {
    fontSize: 13,
    fontWeight: "500",
    marginLeft: 4,
  },
  bio: {
    fontSize: 12,
    lineHeight: 16,
    marginBottom: 12,
  },
  avatarContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatarWrapper: {
    position: "relative",
  },
  memberAvatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
  },
  defaultAvatar: {
    justifyContent: "center",
    alignItems: "center",
  },
  remainingCountContainer: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
  },
  remainingCountText: {
    fontSize: 8,
    fontWeight: "600",
    color: "white",
  },
  joinButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "flex-start",
  },
});

export default CommunityDiscoverCard;
