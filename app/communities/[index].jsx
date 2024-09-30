import { StatusBar } from "expo-status-bar";
import React from "react";
import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useLocalSearchParams } from "expo-router";

const CommunityPage = () => {
  const insets = useSafeAreaInsets();
  const { communityId, communityName, memberCount, avatars } =
    useLocalSearchParams();

  return (
    <ScrollView className="flex-1 bg-white" style={{ paddingTop: insets.top }}>
      <StatusBar style="auto" />
      <View className="p-4">
        {/* Header */}
        <View className="flex-row items-center justify-between mb-4">
          <Text className="text-2xl font-bold">{communityName}</Text>
          <TouchableOpacity>
            <Text className="text-lg">⋮</Text>
          </TouchableOpacity>
        </View>

        {/* Community Info */}
        <View className="flex-row items-center justify-between mb-4">
          <View className="flex-row mr-2"></View>
          <Text className="text-gray-600">{memberCount} Members</Text>
          <TouchableOpacity className="bg-black px-4 py-2 rounded-full">
            <Text className="text-white font-semibold">Join</Text>
          </TouchableOpacity>
        </View>

        {/* Community Description */}
        <Text className="text-gray-700 mb-6">
          Let's talk about UX Design and everything related to it and share your
          thoughts on this to share and gain knowledge
        </Text>

        {/* Posts */}
        <View className="space-y-6">
          {/* Post 1 */}
          <View className="border-b border-gray-200 pb-4">
            <View className="flex-row items-center mb-2">
              <Image
                source={{ uri: "https://example.com/abin-avatar.jpg" }}
                className="w-10 h-10 rounded-full mr-2"
              />
              <View>
                <Text className="font-semibold">Abin</Text>
                <Text className="text-gray-500 text-sm">Posted 20m ago</Text>
              </View>
            </View>
            <Image
              source={{ uri: "https://example.com/ux-design-image.jpg" }}
              className="w-full h-48 rounded-lg mb-2"
            />
            <Text className="text-gray-800">
              Web literacy must become a fundamental part of our global
              education system. Without it, opportunity is squandered. With it,
              we can propel billions farther, faster.
            </Text>
          </View>

          {/* Post 2 */}
          <View>
            <View className="flex-row items-center mb-2">
              <Image
                source={{ uri: "https://example.com/huzefa-avatar.jpg" }}
                className="w-10 h-10 rounded-full mr-2"
              />
              <View>
                <Text className="font-semibold">Huzefa</Text>
                <Text className="text-gray-500 text-sm">Posted 1 day ago</Text>
              </View>
            </View>
            <Text className="text-gray-800">
              Every worthwhile opportunity that has crossed my path has been a
              direct result of pursuing curiosity.
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default CommunityPage;
