import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

const ResetPassword = () => {
  const backgroundColor = useThemeColor({}, "background");
  const textColor = useThemeColor({}, "text");
  const insets = useSafeAreaInsets();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);

  const toggleConfirmPasswordVisibility = () => {
    setIsConfirmPasswordVisible(!isConfirmPasswordVisible);
  };

  return (
    <>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View
          style={{
            flex: 1,
            paddingTop: insets.top,
            paddingBottom: insets.bottom,
            backgroundColor: backgroundColor,
            padding: 20,
          }}
        >
          <StatusBar style="auto" />
          <View className="flex flex-col items-start justify-start">
            <Text
              style={{ color: textColor }}
              className="text-3xl font-bold mb-2 text-center "
            >
              Reset Password
            </Text>
            <Text
              style={{ color: textColor }}
              className="text-sm  mb-8 text-left"
            >
              Enter your new password
            </Text>
          </View>
          <View className="flex flex-col items-start justify-start">
            <Text
              style={{ color: textColor }}
              className="text-base font-JakartaSemiBold  mb-2 "
            >
              New Password
            </Text>
          </View>
          <View className="mb-6 relative">
            <TextInput
              placeholder="Password"
              className="bg-white border border-gray-300 rounded-lg px-4 py-4 pr-10"
              secureTextEntry={!isPasswordVisible}
              placeholderTextColor="gray"
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity
              className="absolute right-5 top-3"
              onPress={togglePasswordVisibility}
            >
              <Ionicons
                name={isPasswordVisible ? "eye" : "eye-off"}
                size={24}
                color="gray"
              />
            </TouchableOpacity>
          </View>
          <View className="flex flex-col items-start justify-start">
            <Text
              style={{ color: textColor }}
              className="text-base font-JakartaSemiBold  mb-2 "
            >
              Confirm Password
            </Text>
          </View>
          <View className="mb-6 relative">
            <TextInput
              placeholder="Confirm Password"
              className="bg-white border border-gray-300 rounded-lg px-4 py-4 pr-10"
              secureTextEntry={!isConfirmPasswordVisible}
              placeholderTextColor="gray"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
            <TouchableOpacity
              className="absolute right-5 top-3"
              onPress={toggleConfirmPasswordVisibility}
            >
              <Ionicons
                name={isConfirmPasswordVisible ? "eye" : "eye-off"}
                size={24}
                color="gray"
              />
            </TouchableOpacity>
          </View>

          <View className=" justify-center ">
            <TouchableOpacity
              className="bg-orange-400 rounded-lg py-4 mb-3 flex-row  justify-center items-center"
              onPress={() => router.navigate("/(auth)/logIn")}
            >
              <Text className="text-white text-left font-semibold">
                Confirm Password
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </>
  );
};

export default ResetPassword;
