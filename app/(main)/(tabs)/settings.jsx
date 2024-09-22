import React from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  Image,
  TouchableOpacity,
} from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { SettingItem, SettingsGroup } from "@/components/SettingsSection";

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
      style={{
        backgroundColor: backgroundColor,
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
      }}
    >
      <ScrollView className="px-3" style={{ marginBottom: 100 }}>
        <Text className="text-white text-2xl font-bold my-3">Settings</Text>
        {/* Search Bar */}
        <View className="bg-gray-800 rounded-lg mb-4">
          <TextInput
            className="text-white p-3"
            placeholder="Search"
            placeholderTextColor="#999"
          />
        </View>

        {/* Avatar Section */}
        <TouchableOpacity>
          <View className="bg-gray-800 rounded-xl mb-4 p-4 flex-row items-center">
            <Image
              source={{
                uri: "https://cdn.pixabay.com/photo/2023/07/23/20/09/female-8145765_1280.jpg",
              }}
              className="w-16 h-16 rounded-full mr-4"
            />
            <View className="flex-1">
              <Text className="text-white text-lg font-semibold">
                Dhope Graphics
              </Text>
              <Text className="text-gray-400">
                I am skilled with programs...
              </Text>
            </View>
            <TouchableOpacity className="p-2">
              <Ionicons name="share-outline" size={24} color="#3B82F6" />
            </TouchableOpacity>
          </View>
        </TouchableOpacity>

        {/* New Section */}
        <SettingsGroup SectionHeader="Profile">
          <SettingItem
            icon={<Ionicons name="person" size={20} color="white" />}
            label="Avatar"
            color="#3B82F6"
            onPress={() => handlePress("Avatar")}
          />
          <SettingItem
            icon={<Ionicons name="megaphone" size={20} color="white" />}
            label="Advertise"
            color="#8B5CF6"
            onPress={() => handlePress("Advertise")}
          />
          <SettingItem
            icon={<Ionicons name="briefcase" size={20} color="white" />}
            label="Business tools"
            color="#3B82F6"
            onPress={() => handlePress("Business tools")}
          />
          <SettingItem
            icon={<Ionicons name="checkmark-circle" size={20} color="white" />}
            label="Meta Verified"
            color="#3B82F6"
            onPress={() => handlePress("Meta Verified")}
          />
        </SettingsGroup>

        <SettingsGroup SectionHeader="General">
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

        <SettingsGroup SectionHeader="Account">
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

        <SettingsGroup SectionHeader="Help">
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
