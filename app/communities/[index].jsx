import { StatusBar } from "expo-status-bar";
import React from "react";
import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useLocalSearchParams } from "expo-router";
import Feather from "@expo/vector-icons/Feather";

import { useThemeColor } from "@/hooks/useThemeColor";
import AvatarPreviews from "../../components/avatarPreviews";
import { imageDataURL } from "../../constants/ImageData";
import CommunityPostCard from "../../components/posted";
import { postData } from "../../constants/data";

const CommunityPage = () => {
  const insets = useSafeAreaInsets();
  const { communityId, communityName, memberCount, avatars, bio } =
    useLocalSearchParams();
  const tintBackground = useThemeColor({}, "tintBackground");

  // Parse the avatars string back into an array
  const parsedAvatars = JSON.parse(avatars);

  return (
    <ScrollView
      className="flex-1 bg-white"
      style={{ paddingTop: insets.top, paddingBottom: insets.bottom }}
    >
      <StatusBar style="auto" />
      <View className="p-4 mb-20">
        {/* Header */}
        <View className="flex-row items-center justify-between mb-4">
          <Text className="text-2xl font-bold">{communityName}</Text>
          <TouchableOpacity>
            <Feather name="more-vertical" size={24} color="black" />
          </TouchableOpacity>
        </View>

        {/* Community Info */}
        <View className="flex-row items-center justify-between mb-4">
          <AvatarPreviews parsedAvatars={parsedAvatars} />
          <Text className="text-gray-600 mr-28 font-JakartaSemiBold">
            {memberCount} Members
          </Text>
          <TouchableOpacity className="bg-black px-6 py-2 rounded-full">
            <Text className="text-white font-semibold">Join</Text>
          </TouchableOpacity>
        </View>

        {/* Community Description */}
        <Text className="text-gray-700 mb-6">{bio}</Text>
        {postData.map((post) => (
          <CommunityPostCard key={post.id} post={post} />
        ))}
      </View>
    </ScrollView>
  );
};

export default CommunityPage;
