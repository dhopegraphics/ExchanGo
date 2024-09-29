import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useThemeColor } from "@/hooks/useThemeColor";

const CommunityCard = ({ community }) => {
  const backgroundColor = useThemeColor({}, "background");
  const textColor = useThemeColor({}, "text");
  const tintBackground = useThemeColor({}, "tintBackground");

  const handlePress = () => {
    if (community.onPress) {
      community.onPress();
    } else {
      console.log(`Community Pressed: ${community.name}`);
    }
  };

  const handleBookmarkPress = () => {
    if (community.bookmarkPress) {
      community.bookmarkPress();
    } else {
      console.log(`Bookmark Pressed: ${community.name}`);
    }
  };

  return (
    <View style={{ backgroundColor: backgroundColor, marginTop: 2 }}>
      <TouchableOpacity activeOpacity={0.8} onPress={handlePress}>
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
          <Text
            style={{ color: textColor }}
            className="text-xs font-JakartaSemiBold text-gray-600"
          >
            {community.memberCount} Members
          </Text>
        </View>
      </View>
    </View>
  );
};

export default CommunityCard;
