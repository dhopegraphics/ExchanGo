import { StatusBar } from "expo-status-bar";
import React, { useCallback, useRef } from "react";
import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useLocalSearchParams } from "expo-router";
import Feather from "@expo/vector-icons/Feather";
import { useThemeColor } from "@/hooks/useThemeColor";
import AvatarPreviews from "../../components/avatarPreviews";
import CommunityPostCard from "../../components/posted";
import { postData } from "../../data/postMade";
import { commentsData } from "../../data/postComments";
import { users } from "../../data/users";
import { likesData } from "../../data/PostLikes";
import { router } from "expo-router";
import { useJoin } from "../../Context/CommunityJoinContext";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import Animated, { Easing } from "react-native-reanimated";

const CommunityPage = () => {
  const insets = useSafeAreaInsets();
  const filterSheetBottomSheetRef = useRef(null);
  const handleUnjoinedModalPress = useCallback(() => {
    filterSheetBottomSheetRef.current?.present();
  }, []);
  const { communityId, communityName, memberCount, avatars, bio } =
    useLocalSearchParams();
  const tintBackground = useThemeColor({}, "tintBackground");

  // Parse the avatars string back into an array
  const parsedAvatars = JSON.parse(avatars);

  // Filter posts based on communityId
  const communityPosts = postData.filter(
    (post) => post.communityId === parseInt(communityId, 10)
  );

  const { isJoined, setIsJoined } = useJoin();

  const handlePress = () => {
    if (isJoined(communityId)) {
      filterSheetBottomSheetRef.current?.present();
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
              className={`px-6 py-2 rounded-full ${isJoined(communityId) ? "bg-gray-500" : "bg-black"}`}
            >
              <Text className="text-white font-semibold">
                ${isJoined(communityId) ? "Joined" : "Join"}
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
      <BottomSheetModal
        ref={filterSheetBottomSheetRef}
        index={0}
        snapPoints={["40%"]}
        animationConfigs={{
          duration: 800,
          easing: Easing.elastic(1),
        }}
        backgroundStyle={{
          backgroundColor: "#f1f5f9",
        }}
        enablePanDownToClose={true}
      >
        <View className="flex-1 p-6">
          <Text className="text-xl font-JakartaBold text-center mb-4">
            Are you sure you want to leave {communityName}?
          </Text>
          <Text className="text-sm text-gray-600 text-center mb-6">
            To rejoin, you'll need an invitation. You'll no longer receive
            notifications from this community. Keep in mind that you can always
            rejoin later.
          </Text>
          <TouchableOpacity
            className="bg-red-500 rounded-full py-3 mb-3"
            onPress={() => {
              leaveCommunity(communityId);
              filterSheetBottomSheetRef.current?.close();
            }}
          >
            <Text className="text-white font-JakartaBold text-center">
              Leave
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="bg-gray-200 rounded-full py-3"
            onPress={() => filterSheetBottomSheetRef.current?.close()}
          >
            <Text className="text-gray-800 font-JakartaBold text-center">
              Cancel
            </Text>
          </TouchableOpacity>
        </View>
      </BottomSheetModal>
    </View>
  );
};

export default CommunityPage;
