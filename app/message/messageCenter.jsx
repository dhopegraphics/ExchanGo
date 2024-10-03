import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
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
import { receivedMessages } from "../../data/chat"; // Ensure this imports the correct data
import { requestData } from "../../data/request";
import { users } from "../../data/users";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { currentUser } from "../../data/users";

export default function messagesHub() {
  const backgroundColor = useThemeColor({}, "background");
  const textColor = useThemeColor({}, "text");
  const [activeTab, setActiveTab] = useState("Chats");
  const insets = useSafeAreaInsets();
  const currentUserId = currentUser.id; // Use the actual user ID
  const [showKeyboard, setShowKeyboard] = useState(true); // State to control keyboard visibility

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleChatItemPress = (item) => {
    // Find the user based on senderId or receiverId

    const user = users.find(
      (user) =>
        user.id ===
        (item.senderId === currentUserId ? item.receiverId : item.senderId)
    );

    router.push({
      pathname: `/message/${item.id}`, // Assuming item.id is the chat ID
      params: {
        id: item.id,
        name: user.name, // Get the name from the user object
        imageUrl: user.profileImage, // Get the profile image from the user object
        lastMessage: item.message,
        time: item.time,
        receiverId:
          item.senderId === currentUserId ? item.receiverId : item.senderId, // Pass the correct receiverId
      },
    });
  };

  const handleRequestContactPressed = (item) => {
    setShowKeyboard(false);
    const user = users.find(
      (user) =>
        user.id ===
        (item.senderId === currentUserId ? item.receiverId : item.senderId)
    );

    router.push({
      pathname: `/message/${item.id}`, // Assuming item.id is the chat ID
      params: {
        id: item.id,
        name: user.name, // Get the name from the user object
        imageUrl: user.profileImage, // Get the profile image from the user object
        lastMessage: item.message,
        time: item.time,
        receiverId:
          item.senderId === currentUserId ? item.receiverId : item.senderId, // Pass the correct receiverId
      },
    });
  };

  const handleAcceptRequest = (item) => {
    // Handle accept request
    console.log("Accept request:", item);
  };

  const handleDeclineRequest = (item) => {
    // Handle decline request
    console.log("Decline request:", item);
  };

  // Group messages by user and get the latest message
  const getLatestMessages = () => {
    const messageMap = {};

    // Combine received and sent messages
    const allMessages = [...receivedMessages];

    allMessages.forEach((msg) => {
      const userId =
        msg.senderId === currentUserId ? msg.receiverId : msg.senderId;

      // If the user is not in the map or the message is newer, update the map
      if (
        !messageMap[userId] ||
        new Date(msg.time) > new Date(messageMap[userId].time)
      ) {
        messageMap[userId] = msg;
      }
    });

    return Object.values(messageMap); // Return the latest messages
  };

  const latestMessages = getLatestMessages();

  const renderItem = ({ item }) => {
    if (activeTab === "Chats") {
      return renderChatItem({
        chatItem: item,
        nameColor: textColor,
        ChatItemPress: () => handleChatItemPress(item),
        users,
        currentUserId,
      });
    } else {
      return renderRequestItem({
        requestItem: item,
        nameColor: textColor,
        acceptRequest: () => handleAcceptRequest(item),
        declineRequest: () => handleDeclineRequest(item),
        onRequestContactPressed: () => handleRequestContactPressed(item),
        users,
        currentUserId,
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
        data={activeTab === "Chats" ? latestMessages : requestData} // Use latest messages
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingHorizontal: 16 }}
      />
    </View>
  );
}
