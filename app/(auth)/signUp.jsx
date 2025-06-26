import { router } from "expo-router";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { useThemeColor } from "@/hooks/useThemeColor";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
import * as SecureStore from "expo-secure-store";
import { Client, Account, ID } from "react-native-appwrite";
import { useAuthStore } from "@/stores/useAuthStore";
import AsyncStorage from "@react-native-async-storage/async-storage";
const InputField = ({
  label,
  placeholder,
  value,
  textColor,
  cardBackground,
  tintText,
  onChangeText,
  error,
  secureTextEntry,
  isPasswordVisible,
  togglePasswordVisibility,
  keyboardType = "default",
  autoCapitalize = "none",
}) => {
  return (
    <View className="mb-4">
      <Text style={{ color: textColor }} className="text-sm font-semibold mb-2">
        {label}
      </Text>
      <View className="relative">
        <TextInput
          style={{
            backgroundColor: cardBackground,
            borderColor: error ? "#EF4444" : "#E5E7EB",
            color: textColor,
          }}
          className={`border rounded-xl px-4 py-4 pr-12 text-base ${
            error ? "border-red-500" : "border-gray-200"
          }`}
          placeholder={placeholder}
          placeholderTextColor={tintText}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          autoCorrect={false}
        />
        {togglePasswordVisibility && (
          <TouchableOpacity
            className="absolute right-4 top-4"
            onPress={togglePasswordVisibility}
          >
            <Ionicons
              name={isPasswordVisible ? "eye" : "eye-off"}
              size={20}
              color={tintText}
            />
          </TouchableOpacity>
        )}
      </View>
      {error && <Text className="text-red-500 text-xs mt-1 ml-1">{error}</Text>}
    </View>
  );
};

const SignUpScreen = () => {
  const backgroundColor = useThemeColor({}, "background");
  const textColor = useThemeColor({}, "text");
  const tintText = useThemeColor({}, "tintText");
  const cardBackground = useThemeColor({}, "cardBackground");

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const setUser = useAuthStore((state) => state.setUser);

  const scale = useSharedValue(1);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const client = new Client()
    .setEndpoint(process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT)
    .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID);

  const account = new Account(client);

  const handleSignUp = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    scale.value = withSpring(0.95);

    try {
      // Create user in Appwrite
      await account.create(
        ID.unique(),
        formData.email,
        formData.password,
        formData.fullName
      );

      // Create session (login)
      const session = await account.createEmailSession(
        formData.email,
        formData.password
      );

      // Store session token securely
      await SecureStore.setItemAsync("session", session.$id);

      // Get user info and update Zustand store
      const user = await account.get();
      setUser(user);

      Alert.alert("Success", "Account created successfully!");
      await AsyncStorage.setItem("hasOnboarded", "true");
      router.replace("account/profileCreation");
    } catch (error) {
      Alert.alert(
        "Error",
        error?.message || "Failed to create account. Please try again."
      );
    } finally {
      setIsLoading(false);
      scale.value = withSpring(1);
    }
  };

  const handleSocialLogin = (provider) => {
    Alert.alert("Coming Soon", `${provider} login will be available soon!`);
  };

  const updateFormData = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: null }));
    }
  };

  const animatedButtonStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const SocialButton = ({ icon, label, onPress, style = {} }) => (
    <TouchableOpacity
      style={[{ backgroundColor: cardBackground }, style]}
      className="border  border-gray-200 rounded-xl py-4 mb-3 flex-row justify-center items-center"
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View className="flex-row ml-40 items-center w-96">
        <Ionicons name={icon} size={20} color={textColor} />
        <Text
          style={{ color: textColor }}
          className="ml-3 font-semibold text-base"
        >
          {label}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <StatusBar style="auto" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <View className="flex-1 px-6 pt-16 pb-8">
          {/* Header */}
          <View className="mb-8">
            <Text
              style={{ color: textColor }}
              className="text-3xl font-bold mb-3"
            >
              Create Account
            </Text>
            <Text style={{ color: tintText }} className="text-base leading-5">
              Join ExchanGo and start trading with confidence. Fill in your
              details below.
            </Text>
          </View>

          {/* Form */}
          <View className="mb-6">
            <InputField
              label="Full Name"
              placeholder="Enter your full name"
              value={formData.fullName}
              onChangeText={(text) => updateFormData("fullName", text)}
              error={errors.fullName}
              autoCapitalize="words"
              textColor={textColor}
              cardBackground={cardBackground}
              tintText={tintText}
            />

            <InputField
              label="Email Address"
              placeholder="Enter your email"
              value={formData.email}
              onChangeText={(text) => updateFormData("email", text)}
              error={errors.email}
              keyboardType="email-address"
              textColor={textColor}
              cardBackground={cardBackground}
              tintText={tintText}
            />

            <InputField
              label="Password"
              placeholder="Create a password"
              value={formData.password}
              onChangeText={(text) => updateFormData("password", text)}
              error={errors.password}
              secureTextEntry={!isPasswordVisible}
              isPasswordVisible={isPasswordVisible}
              togglePasswordVisibility={() =>
                setIsPasswordVisible(!isPasswordVisible)
              }
              textColor={textColor}
              cardBackground={cardBackground}
              tintText={tintText}
            />

            <InputField
              label="Confirm Password"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChangeText={(text) => updateFormData("confirmPassword", text)}
              error={errors.confirmPassword}
              secureTextEntry={!isConfirmPasswordVisible}
              isPasswordVisible={isConfirmPasswordVisible}
              togglePasswordVisibility={() =>
                setIsConfirmPasswordVisible(!isConfirmPasswordVisible)
              }
              textColor={textColor}
              cardBackground={cardBackground}
              tintText={tintText}
            />
          </View>

          {/* Sign Up Button */}
          <Animated.View style={animatedButtonStyle}>
            <TouchableOpacity
              onPress={handleSignUp}
              disabled={isLoading}
              className={`bg-orange-400 rounded-xl py-4 mb-6 ${
                isLoading ? "opacity-70" : ""
              }`}
              activeOpacity={0.8}
            >
              <Text className="text-white text-center font-semibold text-base">
                {isLoading ? "Creating Account..." : "Create Account"}
              </Text>
            </TouchableOpacity>
          </Animated.View>

          {/* Divider */}
          <View className="flex-row items-center mb-6">
            <View className="flex-1 h-px bg-gray-300" />
            <Text
              style={{ color: tintText }}
              className="mx-4 font-medium text-sm"
            >
              Or continue with
            </Text>
            <View className="flex-1 h-px bg-gray-300" />
          </View>

          {/* Social Login */}
          <View className="mb-8">
            <SocialButton
              icon="logo-google"
              label="Continue with Google"
              onPress={() => handleSocialLogin("Google")}
            />
            <SocialButton
              icon="logo-apple"
              label="Continue with Apple"
              onPress={() => handleSocialLogin("Apple")}
            />
            <SocialButton
              icon="logo-facebook"
              label="Continue with Facebook"
              onPress={() => handleSocialLogin("Facebook")}
            />
          </View>

          {/* Terms */}
          <View className="mb-6">
            <Text
              style={{ color: tintText }}
              className="text-center text-sm leading-5"
            >
              By creating an account, you agree to our{" "}
              <Text className="text-orange-400 underline">
                Terms of Service
              </Text>{" "}
              and{" "}
              <Text className="text-orange-400 underline">Privacy Policy</Text>
            </Text>
          </View>

          {/* Login Link */}
          <View className="flex-row justify-center items-center">
            <Text style={{ color: tintText }} className="text-base">
              Already have an account?{" "}
            </Text>
            <TouchableOpacity onPress={() => router.push("/(auth)/logIn")}>
              <Text className="text-orange-400 font-semibold text-base">
                Sign In
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SignUpScreen;
