import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Image,
} from "react-native";

export const renderChatItem = ({
  chatItem,
  nameColor,
  ChatItemPress,
  users,
}) => {
  const user = users.find((user) => user.id === chatItem.senderId); // Fetch the user data based on userId

  return (
    <View className="justify-center items-center">
      <TouchableOpacity
        onPress={ChatItemPress}
        className="flex-row rounded-xl shadow-md justify-center bg-slate-100 items-center p-4 mb-4 border-slate-200 border-[1px] w-[100%]"
      >
        <Image
          source={{ uri: user?.profileImage || "default_image_url" }}
          className="w-12 h-12 border-2 border-gray-800 rounded-full mr-4"
        />
        <View className="flex-1">
          <Text className="font-semibold text-base" style={{ color: "black" }}>
            {user?.name || "Unknown User"}
          </Text>
          <Text className="text-[10px] font-JakartaMedium text-gray-400">
            {chatItem.message}
          </Text>
        </View>
        <Text className="text-[10px] font-JakartaSemiBold text-orange-400">
          {new Date(chatItem.time).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export const renderRequestItem = ({
  requestItem,
  nameColor,
  acceptRequest,
  declineRequest,
  onRequestContactPressed,
  users,
}) => {
  const user = users.find((user) => user.id === requestItem.senderId); // Fetch the user data based on userId

  return (
    <View className="justify-center items-center">
      <TouchableOpacity
        onPress={onRequestContactPressed}
        className="flex-row shadow-md bg-slate-100 rounded-xl justify-center items-center p-4 mb-4 border-slate-200 border-[1px] w-[100%]"
      >
        <Image
          source={{ uri: user?.profileImage || "default_image_url" }}
          className="w-12 h-12 rounded-full border-2 border-gray-800 mr-4"
        />
        <View className="flex-1">
          <Text className="font-semibold text-base" style={{ color: "black" }}>
            {user?.name || "Unknown User"}
          </Text>
          <Text className="text-[10px] text-gray-400">
            {requestItem.message}
          </Text>
        </View>
        <View className="justify-center items-center">
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
            {new Date(requestItem.time).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};
