import React from "react";
import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import Feather from "@expo/vector-icons/Feather";

import { useThemeColor } from "@/hooks/useThemeColor";
import { imageDataURL } from "../constants/ImageData";

const CommunityPostCard = () => {
  return (
    <View className="space-y-6 bg-gray-100 p-4 rounded-lg">
      <View className="  pb-4">
        <View className="flex-row items-center  mb-2">
          <Image
            source={{ uri: imageDataURL[4] }}
            className="w-10 h-10 rounded-full mr-2"
          />
          <View className="flex-row items-center ">
            <View>
              <Text className="font-semibold">Abin</Text>
              <Text className="text-gray-500 text-[12px]">Posted 20m ago</Text>
            </View>

            <View className="ml-40">
              <TouchableOpacity>
                <Feather name="more-vertical" size={24} color="black" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <Image
          source={{ uri: imageDataURL[5] }}
          className="w-full h-44 rounded-lg mb-2"
        />
        <Text className="text-gray-950 text-[13px] font-JakartaMedium">
          Web literacy must become a fundamental part of our global education
          system. Without it, opportunity is squandered. With it, we can propel
          billions farther, faster.
        </Text>
      </View>
    </View>
  );
};

export default CommunityPostCard;
