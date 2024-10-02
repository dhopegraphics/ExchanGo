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

const MessageBox = () => {
  const insets = useSafeAreaInsets();
  const [messages, setMessages] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const backgroundColor = useThemeColor({}, "background");
  const { name, imageUrl } = useLocalSearchParams();

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
        content={item.content}
        isUser={item.isUser}
        timestamp={item.timestamp}
        onLongPress={() => handleLongPress(item)}
        isSelected={selectedMessage && selectedMessage.id === item.id}
      />
    ),
    [handleLongPress, selectedMessage]
  );

  const keyExtractor = useCallback((item) => item.id.toString(), []);

  const handleSendMessage = useCallback((content) => {
    const newMessage = {
      id: Date.now(),
      content,
      isUser: true,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
    setMessages((prevMessages) => [...prevMessages, newMessage]);
  }, []);

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
      <MessageInput onShouldSend={handleSendMessage} />
      {selectedMessage && (
        <Modal transparent animationType="fade">
          <BlurView intensity={20} style={StyleSheet.absoluteFill}>
            <TouchableWithoutFeedback onPress={closeOptions}>
              <View className="flex-1 justify-center items-center">
                <View className="w-full px-4">
                  <Message
                    content={selectedMessage.content}
                    isUser={selectedMessage.isUser}
                    timestamp={selectedMessage.timestamp}
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
