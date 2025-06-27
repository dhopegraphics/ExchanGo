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

type User = {
  id: string;
  name: string;
  bio?: string;
  profileImage?: string;
  featured?: boolean;
  location?: string;
};

type ConnectedUser = {
  userId: string;
  connectedFollowers?: any[];
  swappedWith?: any[];
};

type Rating = {
  ratedUserId: string;
  ratedBy: { rating: number }[];
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

  const connectedUser = connectedUsers.find(
    (connected) => connected.userId === user.id
  ) || { userId: user.id, connectedFollowers: [], swappedWith: [] };

  const userRatings = ratings.find((rating) => rating.ratedUserId === user.id);
  const averageRating = userRatings
    ? userRatings.ratedBy.reduce((acc, rated) => acc + rated.rating, 0) /
      userRatings.ratedBy.length
    : 0;

  const skills = getUserSkills(user.id, userSkill);
  const connectedCount = connectedUser?.connectedFollowers?.length || 0;
  const swappedCount = connectedUser?.swappedWith?.length || 0;

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
            pathname: `/account/${user.id}`,
            params: {
              userId: user.id,
              userName: user.name,
              bio: user.bio,
              rating: averageRating,
              profileImage: user.profileImage,
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
              className="px-3 py-1 rounded-bl-xl rounded-tr-2xl"
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
              source={{ uri: user.profileImage }}
              className="w-20 h-20 rounded-2xl"
            />
            {/* Online Status Indicator */}
            <View
              className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full border-2 border-white"
              style={{ backgroundColor: "#4CAF50" }}
            />
          </View>

          {/* Content */}
          <View className="flex-1">
            {/* Header */}
            <View className="flex-row items-center justify-between mb-2">
              <Text style={{ color: textColor }} className="text-lg font-bold">
                {user.name}
              </Text>
              <TouchableOpacity className="p-1">
                <Ionicons name="heart-outline" size={20} color={tintText} />
              </TouchableOpacity>
            </View>

            {/* Rating */}
            <View className="flex-row items-center mb-2">
              <Text style={{ color: tintText }} className="ml-2 text-sm">
                ({averageRating.toFixed(1)})
              </Text>
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
                  {user.location}
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
