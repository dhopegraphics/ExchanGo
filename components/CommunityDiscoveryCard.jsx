import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import { useThemeColor } from "@/hooks/useThemeColor";

const CommunityDiscoverCard = ({
  community,
  users,
  joinedCommunities = [],
  onPress,
}) => {
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

  const handlePress = () => {
    if (onPress) {
      onPress(community); // Call onPress if provided
    }
    router.push({
      pathname: `/community/${community.id}`,
      params: {
        communityId: community.id,
        communityName: community.name,
        memberCount: communityMembers.length,
        avatars: JSON.stringify(
          communityMembers.map((member) => ({ uri: member?.profileImage }))
        ),
        bio: community.bio,
      },
    });
  };

  return (
    <TouchableOpacity activeOpacity={0.8} onPress={handlePress}>
      <View className="flex-row items-center p-4 bg-gray-100 rounded-lg mb-4">
        <Image
          source={{ uri: community.profileImage }}
          className="w-16 h-16 rounded-lg mr-4"
        />
        <View className="flex-1 ">
          <Text className="text-[14px] font-bold" style={{ color: "#000" }}>
            {community.name}
          </Text>
          <View className="flex-row items-center mb-2">
            <Text className="text-xs font-JakartaSemiBold text-gray-500">
              {communityMembers.length}
            </Text>
            <Text className="text-xs font-JakartaMedium ml-1">Members</Text>
          </View>
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
        </View>
      </View>
    </TouchableOpacity>
  );
};
export default CommunityDiscoverCard;
