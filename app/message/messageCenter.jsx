import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Image,
  FlatList,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useThemeColor } from "@/hooks/useThemeColor";
import {
  renderChatItem,
  renderRequestItem,
} from "@/components/MessagingContainer";
import { chatData } from "../../data/chat";
import { requestData } from "../../data/request";
import { users } from "../../data/users";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

export default function messagesHub() {
  const backgroundColor = useThemeColor({}, "background");
  const textColor = useThemeColor({}, "text");
  const [activeTab, setActiveTab] = useState("Chats");
  const insets = useSafeAreaInsets();

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleChatItemPress = (item) => {
    router.push({
      pathname: `/message/${item.id}`,
      params: {
        id: item.id,
        name: item.name,
        imageUrl: item.imageUrl,
        lastMessage: item.message,
        time: item.time,
      },
    });
  };

  const handleRequestContactPressed = (item) => {
    // Handle request contact pressed
    console.log("Request contact pressed:", item);
  };

  const handleAcceptRequest = (item) => {
    // Handle accept request
    console.log("Accept request:", item);
  };

  const handleDeclineRequest = (item) => {
    // Handle decline request
    console.log("Decline request:", item);
  };

  const renderItem = ({ item }) => {
    if (activeTab === "Chats") {
      return renderChatItem({
        chatItem: item,
        nameColor: textColor,
        ChatItemPress: () => handleChatItemPress(item),
        users,
      });
    } else {
      return renderRequestItem({
        requestItem: item,
        nameColor: textColor,
        acceptRequest: () => handleAcceptRequest(item),
        declineRequest: () => handleDeclineRequest(item),
        onRequestContactPressed: () => handleRequestContactPressed(item),
        users,
      });
    }
  };

  return (
    <View
      className="flex-1"
      style={{ paddingTop: insets.top, backgroundColor: backgroundColor }}
    >
      <View className="flex-row items-center space-x-8 px-4 mb-4">
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={24} color={textColor} />
        </TouchableOpacity>
        <Text
          style={{ color: textColor }}
          className="text-2xl ml-6 font-JakartaBold"
        >
          Messages
        </Text>
      </View>
      <View className="px-4 mb-4">
        <View className=" bg-gray-100 rounded-full px-4  py-3 flex-row mb-6">
          <Ionicons name="search" size={24} color="black" />
          <TextInput
            className=" ml-3 flex-1 "
            placeholder="Search"
            placeholderTextColor="#999"
          />
        </View>
        <View className="flex-row mb-6 space-x-6">
          <TouchableOpacity
            className={`flex-1 py-3 rounded-lg ${
              activeTab === "Chats" ? "bg-orange-400" : "bg-gray-200"
            }`}
            onPress={() => handleTabChange("Chats")}
          >
            <Text
              className={`text-center font-semibold ${
                activeTab === "Chats" ? "text-white" : "text-gray-700"
              }`}
            >
              Chats
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className={`flex-1 py-3 rounded-lg ${
              activeTab === "Requests" ? "bg-orange-400" : "bg-gray-200"
            }`}
            onPress={() => handleTabChange("Requests")}
          >
            <Text
              className={`text-center font-semibold ${
                activeTab === "Requests" ? "text-white" : "text-gray-700"
              }`}
            >
              Requests
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <FlatList
        data={activeTab === "Chats" ? chatData : requestData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingHorizontal: 16 }}
      />
    </View>
  );
}
