import { router } from "expo-router";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const ForgotPasswordScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View
        className="flex-1  p-6 bg-gray-100"
        style={{ paddingTop: insets.top }}
      >
        <TouchableOpacity
          className="absolute top-4 left-4 z-10"
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <StatusBar style="dark" />
        <View className="flex flex-col items-start justify-start">
          <Text className="text-3xl font-bold mb-2 text-center text-gray-800">
            Forgot Password
          </Text>
          <Text className="text-sm text-gray-600 mb-8 text-left">
            Dont worry! Enter your Email and we will send you a link to reset
            your password
          </Text>
        </View>
        <View className="flex flex-col items-start justify-start">
          <Text className="text-base font-JakartaSemiBold text-gray-600 mb-2 ">
            Email
          </Text>
        </View>
        <View className="mb-4">
          <TextInput
            placeholder="Email"
            className="bg-white border border-gray-300 rounded-lg px-4 py-4 mb-2"
            keyboardType="email-address"
            value={email}
            onChangeText={(text) => setEmail(text)}
            placeholderTextColor="gray"
          />
        </View>

        <View className=" justify-center ">
          <TouchableOpacity
            className="bg-black rounded-lg py-3 mb-3 flex-row  justify-center items-center"
            activeOpacity={0.5}
            onPress={() => router.replace("/(auth)/verification")}
          >
            <Text className="text-white text-left font-semibold">
              Send Code
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default ForgotPasswordScreen;
