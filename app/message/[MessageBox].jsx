import React, { useState, useCallback, useEffect } from "react";
import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  FlatList,
  Modal,
  StyleSheet,
} from "react-native";
import MessageInput from "../../components/MessageInput";
import ProfileHeader from "../../components/ProfileHeader";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useThemeColor } from "@/hooks/useThemeColor";
import { router, useLocalSearchParams } from "expo-router";
import { BlurView } from "expo-blur";
import { MessageOptions, Message } from "../../components/optionsOnMessage";
import { receivedMessages, sentMessages } from "../../data/chat"; // {{ edit_1 }}
import { currentUser } from "../../data/users";

const MessageBox = () => {
  const insets = useSafeAreaInsets();
  const { name, imageUrl, receiverId, keyboardInput } = useLocalSearchParams();
  const currentUserId = currentUser.id; // Use currentUser.id instead of "me"
  const backgroundColor = useThemeColor({}, "background");
  const [messages, setMessages] = useState([]); // {{ edit_1 }}

  // Combine received and sent messages for the current user
  useEffect(() => {
    const allMessages = [...receivedMessages, ...sentMessages];
    const filteredMessages = allMessages.filter(
      (msg) =>
        (msg.receiverId === currentUserId && msg.senderId === receiverId) ||
        (msg.senderId === currentUserId && msg.receiverId === receiverId)
    );

    // Sort messages by time
    const sortedMessages = filteredMessages.sort(
      (a, b) => new Date(a.time) - new Date(b.time)
    );
    setMessages(sortedMessages);
  }, [currentUserId, receiverId]); // Add receiverId to dependencies

  const [selectedMessage, setSelectedMessage] = useState(null);
  const flatListRef = React.useRef(null);

  const handleLongPress = useCallback((message) => {
    setSelectedMessage(message);
  }, []);

  const closeOptions = useCallback(() => {
    setSelectedMessage(null);
  }, []);

  const messageOptions = [
    { label: "Reply", onPress: () => {} },
    { label: "Forward", onPress: () => {} },
    { label: "Copy", onPress: () => {} },
    { label: "Delete", onPress: () => {} },
  ];

  // Scroll to bottom when new messages are added
  useEffect(() => {
    if (flatListRef.current && messages.length > 0) {
      flatListRef.current.scrollToEnd({ animated: true });
    }
  }, [messages]);

  const renderMessage = useCallback(
    ({ item }) => (
      <Message
        content={item.message}
        isUser={item.senderId === currentUserId}
        timestamp={new Date(item.time).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })}
        onLongPress={() => handleLongPress(item)}
        isSelected={selectedMessage && selectedMessage.id === item.id}
        style={{
          alignSelf:
            item.senderId === currentUserId ? "flex-end" : "flex-start",
        }}
      />
    ),
    [handleLongPress, selectedMessage]
  );

  const keyExtractor = useCallback((item) => {
    // Create a unique key using senderId, receiverId, and time
    return `${item.senderId}-${item.receiverId}-${item.time}`;
  }, []);

  const handleSendMessage = useCallback(
    (content) => {
      const newMessage = {
        id: Date.now().toString(),
        senderId: currentUserId,
        receiverId: receiverId, // Set the correct receiverId
        message: content,
        time: new Date().toISOString(),
      };
      // Add the new message and sort the messages again
      setMessages((prevMessages) => {
        const updatedMessages = [...prevMessages, newMessage];
        return updatedMessages.sort(
          (a, b) => new Date(a.time) - new Date(b.time)
        );
      });
    },
    [currentUserId, receiverId] // Add receiverId to dependencies
  );

  return (
    <KeyboardAvoidingView
      className={`flex-1 `}
      style={{ paddingTop: insets.top, backgroundColor: backgroundColor }}
      behavior={Platform.OS === "ios" ? "padding" : null}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 10}
    >
      <ProfileHeader
        name={name}
        image={imageUrl}
        BackButton={() => router.back()}
      />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className={`flex-1 bg-${backgroundColor}`}>
          <FlatList
            ref={flatListRef}
            data={messages}
            renderItem={renderMessage}
            keyExtractor={keyExtractor}
            contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 16 }}
          />
        </View>
      </TouchableWithoutFeedback>
      <MessageInput
        onShouldSend={handleSendMessage}
        keyboardInput={keyboardInput}
      />
      {selectedMessage && (
        <Modal transparent animationType="fade">
          <BlurView intensity={20} style={StyleSheet.absoluteFill}>
            <TouchableWithoutFeedback onPress={closeOptions}>
              <View className="flex-1 justify-center items-center">
                <View className="w-full px-4">
                  <Message
                    content={selectedMessage.message}
                    isUser={selectedMessage.senderId === currentUserId}
                    timestamp={new Date(
                      selectedMessage.time
                    ).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                    isSelected={true}
                  />
                </View>
                <MessageOptions
                  isVisible={true}
                  onClose={closeOptions}
                  options={messageOptions}
                />
              </View>
            </TouchableWithoutFeedback>
          </BlurView>
        </Modal>
      )}
    </KeyboardAvoidingView>
  );
};

export default MessageBox;
