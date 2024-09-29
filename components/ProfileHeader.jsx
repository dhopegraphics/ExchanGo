import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { Ionicons, Entypo } from "react-native-vector-icons";
import { useThemeColor } from "@/hooks/useThemeColor";

const ProfileHeader = ({
  name,
  image,
  handleOnCameraPress,
  handleOnCallPress,
  BackButton,
}) => {
  const textColor = useThemeColor({}, "text");
  const tintColor = useThemeColor({}, "tint");
  return (
    <View className="flex-row justify-center p-2 items-center">
      <View className="justify-center mr-2">
        <TouchableOpacity onPress={BackButton}>
          <Ionicons name="chevron-back-sharp" size={26} color={textColor} />
        </TouchableOpacity>
      </View>
      <View className="ml-2 bg-black rounded-full">
        <Image source={{ uri: image }} className="w-10 h-10 rounded-full" />
      </View>

      <View className="ml-2 mr-6">
        <Text
          style={{ color: textColor }}
          className="font-JakartaSemiBold text-base"
        >
          {name}
        </Text>
        <Text
          style={{ color: tintColor }}
          className="font-JakartaMedium text-xs text-gray-500"
        >
          Online 3 minutes ago
        </Text>
      </View>
      <View className="flex-row ml-6">
        <View className="items-center">
          <TouchableOpacity
            onPress={handleOnCallPress}
            style={{ borderColor: textColor }}
            className="rounded-full w-10 h-10 items-center justify-center  border-2"
          >
            <Ionicons name="call-outline" size={20} color={textColor} />
          </TouchableOpacity>
        </View>
        <View className="items-center">
          <TouchableOpacity
            onPress={handleOnCameraPress}
            style={{ borderColor: textColor }}
            className="rounded-full ml-2 w-10 h-10 items-center justify-center  border-2"
          >
            <Entypo name="video-camera" size={20} color={textColor} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ProfileHeader;
