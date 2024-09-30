import React from "react";

import { View, Text, Image, TouchableOpacity } from "react-native";
import { router } from "expo-router";

import { useThemeColor } from "@/hooks/useThemeColor";

const CommunityDiscoverCard = ({ community }) => {
  const textColor = useThemeColor({}, "text");

  const tintBackground = useThemeColor({}, "tintBackground");

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => {
        router.push({
          pathname: `/communities/${community.id}`,
          params: {
            communityId: community.id,
            communityName: community.name,
            memberCount: community.memberCount,
            avatars: community.avatars,
          },
        });
      }}
    >
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
              {community.memberCount}
            </Text>
            <Text className="text-xs font-JakartaMedium ml-1">Members</Text>
          </View>
          <View className="flex-row mr-2">
            {community.avatars.map((avatar, index) => (
              <Image
                key={index}
                source={{ uri: avatar.uri }}
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
