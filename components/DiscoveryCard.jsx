import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useThemeColor } from "@/hooks/useThemeColor";

const DiscoverCard = ({ person }) => {
  const backgroundColor = useThemeColor({}, "background");
  const cardBackground = useThemeColor({}, "cardBackground");
  const textColor = useThemeColor({}, "text");
  const tintText = useThemeColor({}, "tintText");
  const tintBackground = useThemeColor({}, "tintBackground");

  return (
    <View
      className="items-center w-44  rounded-lg p-3 mr-4"
      style={{
        backgroundColor: cardBackground,
        borderWidth: 1,
        borderColor: tintBackground,
      }}
    >
      <View>
        <Image
          source={{
            uri: person.profileImage,
          }}
          className="w-16 h-16 rounded-full border-2 border-white"
        />
        <TouchableOpacity className="absolute -top-1 -right-1 bg-gray-100 rounded-full p-1">
          <Ionicons name="close" size={16} color="#4B5563" />
        </TouchableOpacity>
      </View>
      <Text
        className="mt-2 text-sm font-JakartaSemiBold"
        style={{ color: textColor }}
      >
        {person.name}
      </Text>
      <Text
        style={{ color: tintText }}
        className="text-xs font-JakartaSemiBold "
      >
        {person.skill}
      </Text>
      <TouchableOpacity className="mt-2 bg-orange-400 px-4 py-1 rounded-full">
        <Text className="text-white text-xs font-JakartaMedium">Connect</Text>
      </TouchableOpacity>
    </View>
  );
};

export default DiscoverCard;
