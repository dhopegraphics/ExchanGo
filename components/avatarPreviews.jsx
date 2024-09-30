import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";

import { useThemeColor } from "@/hooks/useThemeColor";

const AvatarPreviews = ({ parsedAvatars }) => {
  const tintBackground = useThemeColor({}, "tintBackground");

  return (
    <View className="flex-row mr-2">
      {parsedAvatars.map((avatar, index) => (
        <Image
          key={index}
          source={{ uri: avatar.uri }}
          className={`w-6 h-6 rounded-full ${index > 0 ? "-ml-3" : ""}`}
          style={{ borderWidth: 1, borderColor: tintBackground }}
          resizeMode="contain"
        />
      ))}
    </View>
  );
};

export default AvatarPreviews;
