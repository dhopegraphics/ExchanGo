import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useThemeColor } from "@/hooks/useThemeColor";
import { router } from "expo-router";

const CommunityCard = ({ community, users, joinedCommunities = [] }) => {
  const backgroundColor = useThemeColor({}, "background");
  const textColor = useThemeColor({}, "text");
  const tintBackground = useThemeColor({}, "tintBackground");

  // Get the members of the community using joinedCommunities and users data
  // Find the community in the joinedCommunities array
  const joinedCommunity = joinedCommunities.find(
    (join) => join.communityId === community.id
  );

  // Get the members using the `userIds` array
  const communityMembers = joinedCommunity
    ? joinedCommunity.userIds.map((userId) =>
        users.find((user) => user.id === userId)
      )
    : [];

  const handleBookmarkPress = () => {};

  return (
    <View style={{ backgroundColor: backgroundColor, marginTop: 2 }}>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          router.push({
            pathname: `/community/${community.id}`,
            params: {
              communityId: community.id,
              communityName: community.name,
              memberCount: communityMembers.length,
              avatars: JSON.stringify(
                communityMembers.map((member) => ({
                  uri: member?.profileImage,
                }))
              ),
              bio: community.bio,
            },
          });
        }}
      >
        <View className=" w-full h-40 rounded-xl overflow-hidden mb-2">
          <Image
            source={{ uri: community.profileImage }}
            className="w-full h-40"
            resizeMode="cover"
          />
        </View>
      </TouchableOpacity>
      <View className="p-3">
        <View className="flex-row justify-between items-center">
          <Text
            style={{ color: textColor }}
            className="text-lg font-semibold mb-1"
          >
            {community.name}
          </Text>
          <View className="flex-row items-center">
            <TouchableOpacity onPress={handleBookmarkPress}>
              <Ionicons name="bookmark-outline" size={24} color={textColor} />
            </TouchableOpacity>
          </View>
        </View>
        <View className="flex-row mb-4 items-center">
          <View className="flex-row mr-2">
            {communityMembers.slice(0, 6).map((member, index) => (
              <Image
                key={index}
                source={{ uri: member?.profileImage }}
                className={`w-6 h-6 rounded-full ${index > 0 ? "-ml-3" : ""}`}
                style={{ borderWidth: 1, borderColor: tintBackground }}
                resizeMode="contain"
              />
            ))}
          </View>
          <Text
            style={{ color: textColor }}
            className="text-xs font-JakartaSemiBold text-gray-600"
          >
            {communityMembers.length} Members
          </Text>
        </View>
      </View>
    </View>
  );
};

export default CommunityCard;
