import { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  Image,
  TouchableOpacity,
  Modal,
} from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { SettingItem, SettingsGroup } from "@/components/SettingsSection";
import { router } from "expo-router";

const SettingsScreen = () => {
  const backgroundColor = useThemeColor({}, "background");
  const insets = useSafeAreaInsets();
  const [logoutModalVisible, setLogoutModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);

  const handlePress = (label: string) => {
    console.log(`Pressed: ${label}`);
    // Add your navigation or action logic here
  };

  const handleLogout = () => {
    // Handle logout logic here
    setLogoutModalVisible(false);
    // Add auth logout logic
    router.replace("/(auth)/logIn");
  };

  const handleDeleteAccount = () => {
    // Handle account deletion logic
    setDeleteModalVisible(false);
    // Add account deletion API call
    router.replace("/(auth)/signUp");
  };

  return (
    <View
      className="flex-1 p-4"
      style={{
        backgroundColor: backgroundColor,
        paddingTop: insets.top,
      }}
    >
      <ScrollView className="px-3" style={{}}>
        <Text className="text-white text-2xl font-bold my-3">Settings</Text>

        {/* Avatar Section */}
        <TouchableOpacity
          onPress={() => router.push("/account/mainPersonalProfile")}
        >
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
            icon={<Ionicons name="megaphone" size={20} color="white" />}
            label="Advertise"
            color="#8B5CF6"
            onPress={() => handlePress("Advertise")}
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
            icon={<Ionicons name="star" size={20} color="white" />}
            label="Starred messages"
            color="#FFCC00"
            onPress={() => handlePress("Starred messages")}
          />
          <SettingItem
            icon={<Ionicons name="people" size={20} color="white" />}
            label="Communities"
            color="#007AFF"
            onPress={() => router.push("/community/ManageCommunities")}
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
        </SettingsGroup>
      </ScrollView>
      <Modal
        animationType="fade"
        transparent={true}
        visible={logoutModalVisible}
        onRequestClose={() => setLogoutModalVisible(false)}
      >
        <View
          className="flex-1 justify-center items-center"
          style={{ backgroundColor: "rgba(0,0,0,0.7)" }}
        >
          <View className="bg-gray-800 p-6 rounded-xl w-5/6 max-w-md">
            <Text className="text-white text-xl font-bold mb-4">Log Out</Text>
            <Text className="text-gray-300 mb-6">
              Are you sure you want to log out of your account?
            </Text>
            <View className="flex-row justify-end space-x-3">
              <TouchableOpacity
                onPress={() => setLogoutModalVisible(false)}
                className="py-2 px-4 rounded-lg bg-gray-700"
              >
                <Text className="text-white font-medium">Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleLogout}
                className="py-2 px-4 rounded-lg bg-red-500"
              >
                <Text className="text-white font-medium">Log Out</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Delete Account Confirmation Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={deleteModalVisible}
        onRequestClose={() => setDeleteModalVisible(false)}
      >
        <View
          className="flex-1 justify-center items-center"
          style={{ backgroundColor: "rgba(0,0,0,0.7)" }}
        >
          <View className="bg-gray-800 p-6 rounded-xl w-5/6 max-w-md">
            <Text className="text-white text-xl font-bold mb-4">
              Delete Account
            </Text>
            <Text className="text-gray-300 mb-2">
              Are you sure you want to delete your account? This action cannot
              be undone.
            </Text>
            <Text className="text-red-400 mb-6">
              All your data will be permanently removed.
            </Text>
            <View className="flex-row justify-end space-x-3">
              <TouchableOpacity
                onPress={() => setDeleteModalVisible(false)}
                className="py-2 px-4 rounded-lg bg-gray-700"
              >
                <Text className="text-white font-medium">Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleDeleteAccount}
                className="py-2 px-4 rounded-lg bg-red-500"
              >
                <Text className="text-white font-medium">Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default SettingsScreen;
