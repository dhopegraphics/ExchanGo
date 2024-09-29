import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Image,
} from "react-native";

export const renderChatItem = ({ chatItem, nameColor, ChatItemPress }) => (
  <View className=" justify-center items-center">
    <TouchableOpacity
      onPress={ChatItemPress}
      className="flex-row rounded-xl shadow-md justify-center bg-slate-100 items-center p-4 mb-4 border-slate-200 border-[1px] w-[100%]"
    >
      <Image
        source={{ uri: chatItem.imageUrl }}
        className="w-12 h-12 border-2 border-gray-800 rounded-full mr-4"
      />
      <View className="flex-1">
        <Text className="font-semibold text-base" style={{ color: "black" }}>
          {chatItem.name}
        </Text>
        <Text className="text-[10px] font-JakartaMedium text-gray-400">
          {chatItem.message}
        </Text>
      </View>
      <Text className="text-[10px] font-JakartaSemiBold text-orange-400">
        {chatItem.time}
      </Text>
    </TouchableOpacity>
  </View>
);

export const renderRequestItem = ({
  requestItem,
  nameColor,
  acceptRequest,
  declineRequest,
  onRequestContactPressed,
}) => (
  <View className=" justify-center items-center">
    <TouchableOpacity
      onPress={onRequestContactPressed}
      className="flex-row shadow-md bg-slate-100 rounded-xl justify-center items-center p-4 mb-4 border-slate-200 border-[1px] w-[100%]"
    >
      <Image
        source={{ uri: requestItem.imageUrl }}
        className="w-12 h-12 rounded-full border-2 border-gray-800 mr-4"
      />
      <View className="flex-1">
        <Text className="font-semibold text-base" style={{ color: "black" }}>
          {requestItem.name}
        </Text>
        <Text className="text-[10px] text-gray-400">{requestItem.message}</Text>
      </View>
      <View className=" justify-center items-center">
        <View className="flex-row">
          <TouchableOpacity
            onPress={acceptRequest}
            className="bg-orange-400 px-3 py-1 rounded-full mr-2"
          >
            <Text className="text-white font-JakartaSemiBold text-xs">
              Accept
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={declineRequest}
            className="bg-gray-200 px-3 py-1 rounded-full"
          >
            <Text className="text-gray-700 font-JakartaSemiBold text-xs">
              Decline
            </Text>
          </TouchableOpacity>
        </View>
        <Text className="text-xs mt-4 font-JakartaSemiBold text-orange-400">
          {requestItem.time}
        </Text>
      </View>
    </TouchableOpacity>
  </View>
);
