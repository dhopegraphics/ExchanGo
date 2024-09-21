import React from "react";
import { View, Text, ScrollView, TouchableHighlight } from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

const SettingItem = ({ icon, label, color, onPress }) => (
  <TouchableHighlight
    onPress={onPress}
    underlayColor="#3a3a3a"
    className="py-2 border-b border-gray-700"
  >
    <View className="flex-row items-center">
      <View
        className={`w-8 h-8 rounded-lg ml-5 mr-3 items-center justify-center`}
        style={{ backgroundColor: color }}
      >
        {icon}
      </View>
      <Text className="text-white text-base flex-1">{label}</Text>
      <View className="mr-5">
        <Ionicons name="chevron-forward" size={16} color="gray" />
      </View>
    </View>
  </TouchableHighlight>
);

const SettingsGroup = ({ children }) => (
  <View className="bg-gray-800 rounded-xl mb-3  overflow-hidden">
    {children}
  </View>
);

const SettingsScreen = () => {
  const backgroundColor = useThemeColor({}, "background");
  const insets = useSafeAreaInsets();

  const handlePress = (label) => {
    console.log(`Pressed: ${label}`);
    // Add your navigation or action logic here
  };

  return (
    <View
      className="flex-1 p-4"
      style={{ backgroundColor: backgroundColor, paddingTop: insets.top }}
    >
      <ScrollView className="px-3">
        <Text className="text-white text-2xl font-bold my-3">Settings</Text>

        <SettingsGroup>
          <SettingItem
            icon={<Ionicons name="heart" size={20} color="white" />}
            label="Favourites"
            color="#FF2D55"
            onPress={() => handlePress("Favourites")}
          />
          <SettingItem
            icon={<Ionicons name="megaphone" size={20} color="white" />}
            label="Broadcast lists"
            color="#4CD964"
            onPress={() => handlePress("Broadcast lists")}
          />
          <SettingItem
            icon={<Ionicons name="star" size={20} color="white" />}
            label="Starred messages"
            color="#FFCC00"
            onPress={() => handlePress("Starred messages")}
          />
          <SettingItem
            icon={<Ionicons name="people" size={20} color="white" />}
            label="Communities"
            color="#007AFF"
            onPress={() => handlePress("Communities")}
          />
          <SettingItem
            icon={<Ionicons name="laptop-outline" size={20} color="white" />}
            label="Linked devices"
            color="#5AC8FA"
            onPress={() => handlePress("Linked devices")}
          />
        </SettingsGroup>

        <SettingsGroup>
          <SettingItem
            icon={<Ionicons name="key" size={20} color="white" />}
            label="Account"
            color="#007AFF"
            onPress={() => handlePress("Account")}
          />
          <SettingItem
            icon={<Ionicons name="lock-closed" size={20} color="white" />}
            label="Privacy"
            color="#32ADE6"
            onPress={() => handlePress("Privacy")}
          />
          <SettingItem
            icon={<Ionicons name="chatbubbles" size={20} color="white" />}
            label="Chats"
            color="#25D366"
            onPress={() => handlePress("Chats")}
          />
          <SettingItem
            icon={<Ionicons name="notifications" size={20} color="white" />}
            label="Notifications"
            color="#FF3B30"
            onPress={() => handlePress("Notifications")}
          />
          <SettingItem
            icon={<Ionicons name="server" size={20} color="white" />}
            label="Storage and data"
            color="#34C759"
            onPress={() => handlePress("Storage and data")}
          />
        </SettingsGroup>

        <SettingsGroup>
          <SettingItem
            icon={
              <Ionicons name="information-circle" size={20} color="white" />
            }
            label="Help"
            color="#007AFF"
            onPress={() => handlePress("Help")}
          />
          <SettingItem
            icon={<Ionicons name="person-add" size={20} color="white" />}
            label="Invite a contact"
            color="#FFCC00"
            onPress={() => handlePress("Invite a contact")}
          />
        </SettingsGroup>
      </ScrollView>
    </View>
  );
};

export default SettingsScreen;
