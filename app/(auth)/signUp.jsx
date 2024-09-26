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

const SignUpScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <View className="flex-1 justify-center p-6 bg-gray-100">
      <StatusBar style="dark" />
      <View className="flex flex-col items-start justify-start">
        <Text className="text-3xl font-bold mb-2 text-center text-gray-800">
          Create an account
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
        onPress={() => router.replace("account/profileCreation")}
        className="bg-orange-400 rounded-lg py-3 mb-4"
      >
        <Text className="text-white text-center font-semibold">
          Create an account
        </Text>
      </TouchableOpacity>

      <View className="flex-row items-center mb-4">
        <View className="flex-1 h-px bg-gray-300" />
        <Text className="mx-4 font-JakartaBold text-gray-500">OR</Text>
        <View className="flex-1 h-px bg-gray-300" />
      </View>

      <View className=" justify-center ">
        <TouchableOpacity
          className="bg-black rounded-lg py-3 mb-3 flex-row  justify-center items-center"
          activeOpacity={0.8}
        >
          <View className="ml-2 flex-row items-center justify-center">
            <Ionicons name="logo-google" size={24} color="white" />
            <Text className="text-white ml-6 text-left font-semibold">
              Continue with Google
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          className="bg-black rounded-lg py-3 mb-3 flex-row  justify-center items-center"
          activeOpacity={0.8}
        >
          <View className="ml-5 flex-row items-center justify-center">
            <Ionicons name="logo-facebook" size={24} color="white" />
            <Text className="text-white ml-6 text-left font-semibold">
              Continue with Facebook
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          className="bg-black rounded-lg py-3 mb-6 flex-row  justify-center items-center"
          activeOpacity={0.8}
        >
          <View className="mr-2 flex-row items-center justify-center">
            <Ionicons
              name="logo-apple"
              size={24}
              color="white"
              className="mr-2"
            />

            <Text className="text-white ml-6 text-left font-semibold">
              Continue with Apple
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      <View className="justify-center items-center ">
        <Text className="text-gray-600">
          By creating an account, you agree to our{" "}
        </Text>

        <View className="flex flex-row">
          <TouchableOpacity>
            <Text className="text-orange-400 underline">Privacy Policy</Text>
          </TouchableOpacity>
          <Text className="text-gray-600"> and </Text>
          <TouchableOpacity>
            <Text className="text-orange-400 underline">Terms of Service</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View className="flex flex-row justify-center items-center mt-4">
        <Text className="text-center text-gray-600">
          Already have an account?{" "}
          <View className="flex flex-row -mt-1">
            <TouchableOpacity onPress={() => router.push("/(auth)/logIn")}>
              <Text className="text-orange-400  font-semibold">Log In</Text>
            </TouchableOpacity>
          </View>
        </Text>
      </View>
    </View>
  );
};

export default SignUpScreen;
