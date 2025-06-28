import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { getUserSkills } from "../utils/databasefunctions";
import { useThemeColor } from "@/hooks/useThemeColor";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { User } from "../stores/useUsersStore";

type ConnectedUser = {
  connection_type: string;
  connector_user_id: string;
  connect_with_user_id?: any[];
  swappedWith?: any[];
  user_accept_connection?: boolean;
};

type Rating = {
  rated_User_id: string;
  ratedBy: { rating: number }[];
  rating: number;
};

type ConnectionCardProps = {
  user: User;
  connectedUsers?: ConnectedUser[];
  ratings: Rating[];
  userSkill: any;
  index?: number;
};

export const ConnectionCard: React.FC<ConnectionCardProps> = ({
  user,
  connectedUsers = [],
  ratings,
  userSkill,
  index = 0,
}) => {
  const textColor = useThemeColor({}, "text");
  const tintText = useThemeColor({}, "tintText");
  const cardBackground = useThemeColor({}, "cardBackground");
  const highlightFilter = useThemeColor({}, "cardBackground");

  const tintColor = useThemeColor({}, "tint");

  const scale = useSharedValue(1);
  const opacity = useSharedValue(0);

  const userRatings = ratings.filter(
    (rating) => rating.rated_User_id === user.user_id
  );
  const averageRating =
    userRatings.length > 0
      ? userRatings.reduce((acc, r) => acc + r.rating, 0) / userRatings.length
      : 0;

  const skills = getUserSkills(user.user_id, userSkill);

  // 1. Get all accepted connections for this user (either as connector or connectee)
  const acceptedConnections = connectedUsers.filter(
    (conn) =>
      (conn.connector_user_id === user.user_id ||
        (Array.isArray(conn.connect_with_user_id)
          ? conn.connect_with_user_id.includes(user.user_id)
          : conn.connect_with_user_id === user.user_id)) &&
      conn.user_accept_connection === true
  );

  // 2. Get unique user IDs this user is connected with
  const connectedUserIds = Array.from(
    new Set(
      acceptedConnections.map((conn) =>
        conn.connector_user_id === user.user_id
          ? conn.connect_with_user_id
          : conn.connector_user_id
      )
    )
  );

  // 3. connectedCount is the number of unique users this user is connected with
  const connectedCount = connectedUserIds.length;

  // 4. swappedCount: unique users where connection_type === "swap" and accepted
  const swappedUserIds = Array.from(
    new Set(
      acceptedConnections
        .filter((conn) => conn.connection_type === "swap")
        .map((conn) =>
          conn.connector_user_id === user.user_id
            ? conn.connect_with_user_id
            : conn.connector_user_id
        )
    )
  );

  const swappedCount = swappedUserIds.length;

  React.useEffect(() => {
    opacity.value = withTiming(1, { duration: 300 + index * 100 });
  }, []);

  const handlePressIn = () => {
    scale.value = withSpring(0.98);
  };

  const handlePressOut = () => {
    scale.value = withSpring(1);
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  const SkillBadge: React.FC<{ skill: string }> = ({ skill }) => (
    <View
      className="px-2 py-1 rounded-lg mr-2 mb-1"
      style={{ backgroundColor: tintColor + "20" }}
    >
      <Text style={{ color: tintColor }} className="text-xs font-medium">
        {skill}
      </Text>
    </View>
  );

  return (
    <Animated.View style={animatedStyle}>
      <TouchableOpacity
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={() => {
          router.push({
            pathname: `/account/${user.user_id}`,
            params: {
              userId: user.user_id,
              userName: user.first_name + " " + user.last_name,
              bio: user.bio,
              rating: averageRating,
              profileImage: user.avatar_url,
              connectedFollowers: connectedCount,
              swappedWith: swappedCount,
              skills: JSON.stringify(skills),
            },
          });
        }}
        className="rounded-2xl p-4 mb-3"
        style={{
          backgroundColor: cardBackground,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.1,
          shadowRadius: 8,
          elevation: 4,
        }}
        activeOpacity={0.95}
      >
        {/* Featured Badge */}
        {user.featured && (
          <View className="absolute top-0 right-0 z-10">
            <View
              className="px-3  rounded-bl-xl rounded-tr-2xl"
              style={{ backgroundColor: "#FFD700" }}
            >
              <Text className="text-xs font-bold text-black">Featured</Text>
            </View>
          </View>
        )}

        <View className="flex-row">
          {/* Profile Image with Status */}
          <View className="relative mr-4">
            <Image
              source={{
                uri: user.avatar_url || "https://via.placeholder.com/150",
              }}
              className="w-20 h-20 rounded-2xl"
            />
            {/* Online Status Indicator */}
            <View
              className="absolute -right-2 w-6 h-6 rounded-full border-2 border-white"
              style={{ backgroundColor: "#4CAF50" }}
            />
          </View>

          {/* Content */}
          <View className="flex-1">
            {/* Header */}
            <View className="flex-row items-center justify-between ">
              <View className="flex-1 flex-row items-center">
                <Text
                  style={{ color: textColor }}
                  className="text-lg font-bold"
                >
                  {user.first_name} {user.last_name}
                </Text>
                {/* Rating */}
                <View className="flex-row items-center">
                  <Text style={{ color: tintText }} className="ml-2 text-sm">
                    ({averageRating.toFixed(1)})
                  </Text>
                </View>
              </View>
              <TouchableOpacity className="p-1">
                <Ionicons name="heart-outline" size={20} color={tintText} />
              </TouchableOpacity>
            </View>

            {/* Skills */}
            <View className="flex-row flex-wrap mb-2">
              {skills.slice(0, 3).map((skill: any, index: number) => (
                <SkillBadge key={index} skill={skill} />
              ))}
              {skills.length > 3 && (
                <View
                  className="px-2 py-1 rounded-lg"
                  style={{ backgroundColor: tintText + "20" }}
                >
                  <Text style={{ color: tintText }} className="text-xs">
                    +{skills.length - 3} more
                  </Text>
                </View>
              )}
            </View>

            {/* Location & Stats */}
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center">
                <Ionicons name="location-outline" size={14} color={tintText} />
                <Text style={{ color: tintText }} className="ml-1 text-sm">
                  {user.address || "Unknown Location"}
                </Text>
              </View>

              <View className="flex-row items-center space-x-3">
                <View className="flex-row items-center">
                  <Ionicons name="people-outline" size={14} color={tintText} />
                  <Text style={{ color: tintText }} className="ml-1 text-xs">
                    {connectedCount}
                  </Text>
                </View>
                <View className="flex-row items-center">
                  <Ionicons
                    name="swap-horizontal-outline"
                    size={14}
                    color={tintText}
                  />
                  <Text style={{ color: tintText }} className="ml-1 text-xs">
                    {swappedCount}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* Action Buttons */}
        <View className="flex-row mt-4 space-x-3">
          <TouchableOpacity
            className="flex-1 py-3 rounded-xl flex-row items-center justify-center"
            style={{ backgroundColor: highlightFilter }}
          >
            <Ionicons name="chatbubble-outline" size={16} color="white" />
            <Text className="text-white font-medium ml-2">Message</Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="flex-1 py-3 rounded-xl flex-row items-center justify-center border"
            style={{ borderColor: tintColor }}
          >
            <Ionicons name="person-add-outline" size={16} color={tintColor} />
            <Text style={{ color: tintColor }} className="font-medium ml-2">
              Connect
            </Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};
