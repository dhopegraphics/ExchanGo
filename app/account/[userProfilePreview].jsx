import React from "react";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { imageDataURL } from "@/constants/ImageData";
import { router, useLocalSearchParams } from "expo-router";
import { getUserSkills } from "@/utils/databasefunctions";
import { userSkills } from "@/data/userSkills";
import { getUserTools } from "@/data/ToolsUsed";
import { useThemeColor } from "@/hooks/useThemeColor";

const ProfileScreen = () => {
  const insets = useSafeAreaInsets();
  const backgroundColor = useThemeColor({}, "background");
  const textColor = useThemeColor({}, "text");
  const tintColor = useThemeColor({}, "tint");
  const cardBackground = useThemeColor({}, "cardBackground");
  const mutedTextColor = useThemeColor({}, "text");

  const {
    userId,
    userName,
    bio,
    connectedFollowers,
    swappedWith,
    profileImage,
    rating,
    skills: skillsString,
  } = useLocalSearchParams();

  const skills = skillsString
    ? JSON.parse(skillsString)
    : getUserSkills(userId, userSkills);
  const tools = getUserTools(userId);

  return (
    <View
      className="flex-1"
      style={{
        backgroundColor,
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
      }}
    >
      <ScrollView className="flex-1">
        {/* Header */}
        <View className="px-4 py-3 flex-row items-center justify-between">
          <TouchableOpacity
            className="p-2 rounded-full"
            onPress={() => router.back()}
          >
            <Ionicons name="arrow-back" size={24} color={textColor} />
          </TouchableOpacity>

          <Text className="text-lg font-bold" style={{ color: textColor }}>
            Profile
          </Text>

          <TouchableOpacity className="p-2 rounded-full">
            <Ionicons name="ellipsis-vertical" size={24} color={textColor} />
          </TouchableOpacity>
        </View>

        {/* Profile Picture and Info */}
        <View className="items-center px-4 py-6">
          <View className="relative">
            <Image
              source={{ uri: profileImage }}
              className="w-24 h-24 rounded-full"
            />
            <View className="absolute bottom-0 right-0 w-6 h-6 rounded-full border-2 bg-green-500 border-white dark:border-gray-800" />
          </View>

          <Text className="text-xl font-bold mt-4" style={{ color: textColor }}>
            {userName}
          </Text>

          {rating && (
            <View className="flex-row items-center mt-1">
              <Ionicons name="star" size={16} color="#FFD700" />
              <Text className="ml-1 text-sm" style={{ color: mutedTextColor }}>
                {parseFloat(rating).toFixed(1)}
              </Text>
            </View>
          )}
        </View>

        {/* Stats Card */}
        <View
          className="mx-4 mb-6 rounded-2xl p-4"
          style={{ backgroundColor: cardBackground }}
        >
          <View className="flex-row justify-around">
            <View className="items-center">
              <Text className="text-xl font-bold" style={{ color: textColor }}>
                {connectedFollowers}
              </Text>
              <Text className="text-sm" style={{ color: mutedTextColor }}>
                Connected
              </Text>
            </View>

            <View className="items-center">
              <Text className="text-xl font-bold" style={{ color: textColor }}>
                {swappedWith}
              </Text>
              <Text className="text-sm" style={{ color: mutedTextColor }}>
                Swapped
              </Text>
            </View>
          </View>
        </View>

        {/* Action Buttons */}
        <View className="flex-row gap-4 justify-center space-x-3 mx-4 mb-6">
          <TouchableOpacity className="flex-1 py-3 rounded-xl items-center justify-center bg-orange-500">
            <Text className="text-white font-medium">Connect</Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="flex-1 py-3  rounded-xl items-center justify-center"
            style={{ backgroundColor: cardBackground }}
          >
            <Text className="text-white font-medium">Message</Text>
          </TouchableOpacity>
        </View>

        {/* About Section */}
        <View className="px-4 mb-6">
          <Text className="text-lg font-bold mb-2" style={{ color: textColor }}>
            About
          </Text>
          <Text className="text-base" style={{ color: mutedTextColor }}>
            {bio}
          </Text>
        </View>

        {/* Skills Section */}
        <View className="px-4 mb-6">
          <Text className="text-lg font-bold mb-2" style={{ color: textColor }}>
            Skills
          </Text>
          <View className="flex-row flex-wrap">
            {skills.map((skill, index) => (
              <View
                key={index}
                className="mr-2 mb-2 px-3 py-1.5 rounded-lg"
                style={{ backgroundColor: `${tintColor}20` }}
              >
                <Text style={{ color: tintColor }}>
                  {skill.skillName || skill}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Tools Section */}
        <View className="px-4 mb-6">
          <Text className="text-lg font-bold mb-2" style={{ color: textColor }}>
            Tools
          </Text>
          <View className="flex-row flex-wrap">
            {tools.map((tool, index) => (
              <View
                key={index}
                className="mr-2 mb-2 px-3 py-1.5 rounded-lg"
                style={{ backgroundColor: cardBackground }}
              >
                <Text style={{ color: textColor }}>{tool.toolName}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Works Section */}
        <View className="px-4 mb-10">
          <View className="flex-row items-center justify-between mb-2">
            <Text className="text-lg font-bold" style={{ color: textColor }}>
              Works
            </Text>
            <TouchableOpacity>
              <Text style={{ color: tintColor }}>See all</Text>
            </TouchableOpacity>
          </View>

          <View className="flex-row space-x-3">
            <Image
              source={{ uri: imageDataURL[9] }}
              className="w-[48%] h-28 rounded-xl"
            />
            <Image
              source={{ uri: imageDataURL[10] }}
              className="w-[48%] h-28 rounded-xl"
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default ProfileScreen;
