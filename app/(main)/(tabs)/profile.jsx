import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";
import Icon from "react-native-vector-icons/FontAwesome";
import { useColorScheme } from "react-native";

const ProfileScreen = () => {
  const theme = useColorScheme() ?? "light";
  const backgroundColor = useThemeColor({}, "background");
  const textColor = useThemeColor({}, "text");

  return (
    <View className="flex-1" style={{ backgroundColor }}>
      <View className="items-center justify-center mt-10 flex-row">
        <Image
          source={{
            uri: "https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671142.jpg",
          }} // Replace with actual image URL
          className="w-24 h-24 rounded-full"
        />
        <View className=" ml-5 items-start justify-start flex-col">
          <Text className="text-xl font-bold mt-4" style={{ color: textColor }}>
            Edward Larry
          </Text>
          <Text className="text-sm" style={{ color: textColor }}>
            Senior Designer
          </Text>
        </View>
        <View className="flex-row ml-5 mt-7">
          <TouchableOpacity>
            <Icon
              name="edit"
              size={24}
              color={theme === "light" ? "#000" : "#fff"}
            />
          </TouchableOpacity>
        </View>
      </View>

      <View className="mt-8 px-4">
        <Text className="text-lg font-semibold" style={{ color: textColor }}>
          My Status
        </Text>
        <View className="flex-row mt-4 space-x-4">
          <View className="bg-black rounded-full px-4 py-2">
            <Text className="text-white">Away</Text>
          </View>
          <View className="bg-green-200 rounded-full px-4 py-2">
            <Text className="text-black">At Work</Text>
          </View>
          <View className="bg-yellow-200 rounded-full px-4 py-2">
            <Text className="text-black">Gaming</Text>
          </View>
        </View>
      </View>

      <View className="mt-8 px-4">
        <Text className="text-lg font-semibold" style={{ color: textColor }}>
          Dashboard
        </Text>
        <View className="mt-4">
          <View className="flex-row items-center justify-between py-2">
            <View className="flex-row items-center">
              <Icon
                name="credit-card"
                size={24}
                color={theme === "light" ? "#000" : "#fff"}
              />
              <Text className="ml-4" style={{ color: textColor }}>
                Payments
              </Text>
            </View>
            <View className="bg-blue-500 rounded-full px-2 py-1">
              <Text className="text-white">2 New</Text>
            </View>
          </View>
          <View className="flex-row items-center justify-between py-2">
            <View className="flex-row items-center">
              <Icon
                name="trophy"
                size={24}
                color={theme === "light" ? "#000" : "#fff"}
              />
              <Text className="ml-4" style={{ color: textColor }}>
                Achievements
              </Text>
            </View>
          </View>
          <View className="flex-row items-center justify-between py-2">
            <View className="flex-row items-center">
              <Icon
                name="lock"
                size={24}
                color={theme === "light" ? "#000" : "#fff"}
              />
              <Text className="ml-4" style={{ color: textColor }}>
                Privacy
              </Text>
            </View>
            <View className="bg-red-500 rounded-full px-2 py-1">
              <Text className="text-white">Actions Needed</Text>
            </View>
          </View>
        </View>
      </View>

      <View className="mt-8 px-4">
        <Text className="text-lg font-semibold" style={{ color: textColor }}>
          My Account
        </Text>
        <View className="mt-4">
          <Text className="text-blue-500">Switch to Other Account</Text>
          <Text className="text-red-500 mt-2">Log Out</Text>
        </View>
      </View>
    </View>
  );
};

export default ProfileScreen;
