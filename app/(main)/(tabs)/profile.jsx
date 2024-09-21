import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
} from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";
import Icon from "react-native-vector-icons/FontAwesome";
import { useColorScheme } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

const ProfileScreen = () => {
  const [selectedStatus, setSelectedStatus] = useState("Away");
  const [refreshing, setRefreshing] = useState(false);
  const theme = useColorScheme() ?? "light";
  const backgroundColor = useThemeColor({}, "background");
  const textColor = useThemeColor({}, "text");
  const insets = useSafeAreaInsets();

  const statuses = [
    { label: "😴 Away", value: "Away", bgColor: "bg-slate-100" },
    { label: "💻 At Work", value: "At Work", bgColor: "bg-green-200" },
    { label: "🎮 Gaming", value: "Gaming", bgColor: "bg-yellow-200" },
  ];

  const onRefresh = () => {
    setRefreshing(true);
    // Simulate a network request
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  return (
    <ScrollView
      className="flex-1"
      style={{ backgroundColor, paddingTop: insets.top }}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          tintColor={theme === "light" ? "#000" : "#fff"}
        />
      }
    >
      <StatusBar style="auto" />
      <View className="items-center mt-5 justify-items-center justify-center  flex-row">
        <View className="relative">
          <View className="shadow shadow-slate-400  shadow-opacity-5">
            <Image
              source={{
                uri: "https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671142.jpg",
              }}
              className="w-24 h-24 rounded-full "
              resizeMode="contain"
            />
          </View>

          <View className="absolute bottom-0 right-0 rounded-full shadow-md shadow-slate-900 p-1">
            <MaterialIcons name="verified" size={24} color="white" />
          </View>
        </View>
        <View className=" ml-5 mb-6 items-start justify-start flex-col">
          <Text
            className="text-xl font-JakartaBold mt-4"
            style={{ color: textColor }}
          >
            Edward Larry
          </Text>
          <Text
            className="text-sm font-JakartaSemiBold"
            style={{ color: textColor }}
          >
            Senior Designer
          </Text>
        </View>

        <View className="flex-row ml-5 ">
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
        <Text
          className="text-lg font-JakartaSemiBold"
          style={{ color: textColor }}
        >
          My Status
        </Text>

        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          className="pb-4 pl-4 mt-4"
        >
          <View className="flex-row space-x-4">
            {statuses.map((status) => (
              <TouchableOpacity
                key={status.value}
                onPress={() => setSelectedStatus(status.value)}
                style={{
                  shadowColor: "#000",
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },
                  shadowOpacity: 0.1,
                  shadowRadius: 3,
                }}
                className={`${status.bgColor} rounded-full px-4 py-2  ${
                  selectedStatus === status.value
                    ? "border-2 border-blue-300"
                    : ""
                }`}
              >
                <Text className="text-black font-JakartaSemiBold">
                  {status.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>

      <View className="mt-8 px-4">
        <Text
          className="text-lg font-JakartaSemiBold"
          style={{ color: textColor }}
        >
          Dashboard
        </Text>
        <View className="mt-4">
          <View className="flex-row items-center justify-between py-2">
            <View className="flex-row items-center">
              <View className="bg-blue-500 rounded-full w-14 h-14 items-center justify-center">
                <Icon
                  name="credit-card"
                  size={20}
                  color={theme === "light" ? "#000" : "#fff"}
                />
              </View>
              <Text
                className="ml-4 font-JakartaBold"
                style={{ color: textColor }}
              >
                Payments
              </Text>
            </View>

            <View className="bg-blue-500   rounded-full w-[80px] h-8 flex-row justify-center items-center">
              <Text className="text-white  text-sm font-JakartaSemiBold ">
                2 New
              </Text>
              <View>
                <MaterialIcons
                  name="arrow-forward-ios"
                  size={16}
                  color="white"
                />
              </View>
            </View>
          </View>
          <View className="flex-row items-center justify-between py-2">
            <View className="flex-row items-center">
              <View className="bg-yellow-500 rounded-full w-14 h-14 items-center justify-center">
                <Icon
                  name="trophy"
                  size={24}
                  color={theme === "light" ? "#000" : "#fff"}
                />
              </View>
              <Text
                className="ml-4 font-JakartaBold"
                style={{ color: textColor }}
              >
                Achievements
              </Text>
            </View>
          </View>
          <View className="flex-row items-center justify-between py-2">
            <View className="flex-row items-center">
              <View className="bg-green-700 rounded-full w-14 h-14 items-center justify-center">
                <Icon
                  name="lock"
                  size={24}
                  color={theme === "light" ? "#000" : "#fff"}
                />
              </View>
              <Text
                className="ml-4 font-JakartaBold"
                style={{ color: textColor }}
              >
                Privacy
              </Text>
            </View>
            <View className="bg-red-500  rounded-full w-36 h-8 items-center justify-center">
              <Text className="text-white font-JakartaSemiBold">
                Actions Needed
              </Text>
            </View>
          </View>
        </View>
      </View>

      <View className="mt-8 px-4">
        <Text className="text-lg font-semibold" style={{ color: textColor }}>
          My Account
        </Text>

        <View className="mt-4">
          <TouchableOpacity>
            <Text className="text-blue-500 font-JakartaBold text-base">
              Switch to Other Account
            </Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text className="text-red-400 mt-2 font-JakartaBold text-base">
              Log Out
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default ProfileScreen;
