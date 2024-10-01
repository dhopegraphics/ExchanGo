import { StatusBar } from "expo-status-bar";
import React, { useState, useCallback, useEffect } from "react";
import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useLocalSearchParams } from "expo-router";
import Feather from "@expo/vector-icons/Feather";
import { useThemeColor } from "@/hooks/useThemeColor";
import AvatarPreviews from "../../components/avatarPreviews";
import { imageDataURL } from "../../constants/ImageData";
import CommunityPostCard from "../../components/posted";
import { postData } from "../../data/postMade";
import { commentsData } from "../../data/postComments";
import { users } from "../../data/users";
import { likesData } from "../../data/PostLikes";
import { router, useFocusEffect } from "expo-router";

const CommunityPage = () => {
  const insets = useSafeAreaInsets();
  const { communityId, communityName, memberCount, avatars, bio, joined } =
    useLocalSearchParams();
  const tintBackground = useThemeColor({}, "tintBackground");

  // Parse the avatars string back into an array
  const parsedAvatars = JSON.parse(avatars);

  // Filter posts based on communityId
  const communityPosts = postData.filter(
    (post) => post.communityId === parseInt(communityId, 10)
  );

  const [isJoined, setIsJoined] = useState(false); // State to track join status

  useFocusEffect(
    useCallback(() => {
      const params = router.getState().routes[router.getState().index].params;
      if (params && params.joined === "true") {
        setIsJoined(true);
      }
    }, [])
  );

  const handlePress = () => {
    if (isJoined) {
      // Handle leaving the community
      setIsJoined(false);
    } else {
      // Navigate to Rules page
      router.push({
        pathname: "/community/Rules",
        params: {
          communityId: communityId,
          communityName: communityName,
        },
      });
    }
  };

  return (
    <View
      className="flex-1 bg-white"
      style={{ paddingTop: insets.top, paddingBottom: insets.bottom }}
    >
      <View className="flex-row p-4 items-center justify-between ">
        <TouchableOpacity onPress={() => router.back()}>
          <Feather name="arrow-left" size={24} color="black" />
        </TouchableOpacity>
        <Text className="text-base mr-20 font-JakartaBold">
          {communityName}
        </Text>
        <TouchableOpacity>
          <Feather name="more-vertical" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <ScrollView className="flex-1 bg-white">
        <StatusBar style="auto" />
        <View className="p-4 mb-20">
          {/* Header */}

          {/* Community Info */}
          <View className="flex-row items-center justify-between mb-4">
            <AvatarPreviews parsedAvatars={parsedAvatars} />
            <Text className="text-gray-600 mr-28 font-JakartaSemiBold">
              {memberCount} Members
            </Text>
            <TouchableOpacity
              onPress={handlePress}
              activeOpacity={0.8}
              className={`px-6 py-2 rounded-full ${isJoined ? "bg-gray-500" : "bg-black"}`}
            >
              <Text className="text-white font-semibold">
                {isJoined ? "Joined" : "Join"}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Community Description */}
          <Text className="text-gray-700 mb-6">{bio}</Text>
          {communityPosts.length > 0 ? (
            communityPosts.map((post) => (
              <CommunityPostCard
                key={post.id}
                post={post}
                comments={commentsData}
                users={users}
                likes={likesData}
              />
            ))
          ) : (
            <Text className="text-center font-JakartaBold text-gray-500 mt-10">
              No posts in this community yet.
            </Text>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default CommunityPage;
