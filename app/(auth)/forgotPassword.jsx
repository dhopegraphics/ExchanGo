import { router } from "expo-router";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
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
    <View
      className="flex-1  p-6 bg-gray-100"
      style={{ paddingTop: insets.top }}
    >
      <StatusBar style="dark" />
      <View className="flex flex-col items-start justify-start">
        <Text className="text-3xl font-bold mb-2 text-center text-gray-800">
          Welcome Back
        </Text>
        <Text className="text-sm text-gray-600 mb-8 text-left">
          Create an account with ExchanGo. Enter your Email and Password
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
      <View className="flex flex-col items-start justify-start">
        <Text className="text-base font-JakartaSemiBold text-gray-600 mb-2 ">
          Password
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

      <TouchableOpacity
        onPress={() => router.replace("(main)/(tabs)/Explore")}
        className="bg-orange-400 rounded-lg py-4 mb-4"
      >
        <Text className="text-white text-center font-semibold">Log In</Text>
      </TouchableOpacity>

      <View className="flex justify-center items-center mt-1 mb-4">
        <TouchableOpacity
          onPress={() => router.navigate("/(auth)/forgotPassword")}
        >
          <Text className="text-black text-lg font-semibold">
            Forgot Password?
          </Text>
        </TouchableOpacity>
      </View>

      <View className="flex-row items-center mb-4">
        <View className="flex-1 h-px bg-gray-300" />
        <Text className="mx-4 font-JakartaBold text-gray-500">OR</Text>
        <View className="flex-1 h-px bg-gray-300" />
      </View>

      <View className=" justify-center ">
        <TouchableOpacity
          className="bg-black rounded-lg py-3 mb-3 flex-row  justify-center items-center"
          onPress={() => router.navigate("/(auth)/signUp")}
        >
          <Text className="text-white text-left font-semibold">
            Create An Account
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ForgotPasswordScreen;
