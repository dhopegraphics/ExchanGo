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
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useThemeColor } from "@/hooks/useThemeColor";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
} from "react-native-reanimated";

const LogInScreen = () => {
  const insets = useSafeAreaInsets();
  const backgroundColor = useThemeColor({}, "background");
  const textColor = useThemeColor({}, "text");
  const tintText = useThemeColor({}, "tintText");
  const cardBackground = useThemeColor({}, "cardBackground");
  const tintColor = useThemeColor({}, "tint");

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);

  const scale = useSharedValue(1);
  const emailScale = useSharedValue(1);
  const passwordScale = useSharedValue(1);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    scale.value = withSpring(0.95);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      router.replace("(main)/(tabs)/Explore");
    } catch (error) {
      Alert.alert("Error", "Invalid credentials. Please try again.");
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

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const animatedButtonStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const emailAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: emailScale.value }],
  }));

  const passwordAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: passwordScale.value }],
  }));

  const InputField = ({
    label,
    placeholder,
    value,
    onChangeText,
    error,
    secureTextEntry,
    keyboardType = "default",
    autoCapitalize = "none",
    onFocus,
    onBlur,
    animatedStyle,
  }) => (
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
          className={`border-2 rounded-xl px-4 py-4 pr-12 text-base ${
            error ? "border-red-500" : "border-gray-200"
          }`}
          placeholder={placeholder}
          placeholderTextColor={tintText}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          autoCorrect={false}
        />
        {secureTextEntry !== undefined && (
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
  const SocialButton = ({ icon, label, onPress, bgColor = cardBackground }) => (
    <TouchableOpacity
      style={{ backgroundColor: bgColor }}
      className="border border-gray-200 rounded-xl py-4 mb-3 flex-row justify-center items-center"
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Ionicons name={icon} size={20} color={textColor} />
      <Text
        style={{ color: textColor }}
        className="ml-3 font-semibold text-base"
      >
        {label}
      </Text>
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
        <View
          className="flex-1 px-6 pb-8"
          style={{ paddingTop: insets.top + 32 }}
        >
          {/* Header */}
          <View className="mb-8">
            <Text
              style={{ color: textColor }}
              className="text-3xl font-bold mb-3"
            >
              Welcome Back
            </Text>
            <Text style={{ color: tintText }} className="text-base leading-5">
              Sign in to your ExchanGo account to continue your trading journey
            </Text>
          </View>

          {/* Form */}
          <View className="mb-6">
            <InputField
              label="Email Address"
              placeholder="Enter your email"
              value={formData.email}
              onChangeText={(text) => updateFormData("email", text)}
              error={errors.email}
              keyboardType="email-address"
            />

            <InputField
              label="Password"
              placeholder="Enter your password"
              value={formData.password}
              onChangeText={(text) => updateFormData("password", text)}
              error={errors.password}
              secureTextEntry={!isPasswordVisible}
            />
          </View>

          {/* Forgot Password */}
          <View className="mb-6">
            <TouchableOpacity
              onPress={() => router.push("/(auth)/forgotPassword")}
              className="self-end"
            >
              <Text className="text-orange-400 font-semibold text-sm">
                Forgot Password?
              </Text>
            </TouchableOpacity>
          </View>

          {/* Login Button */}
          <Animated.View style={animatedButtonStyle}>
            <TouchableOpacity
              onPress={handleLogin}
              disabled={isLoading}
              className={`bg-orange-400 rounded-xl py-4 mb-6 ${
                isLoading ? "opacity-70" : ""
              }`}
              activeOpacity={0.8}
            >
              <Text className="text-white text-center font-semibold text-base">
                {isLoading ? "Signing In..." : "Sign In"}
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

          {/* Sign Up Link */}
          <View className="flex-row justify-center items-center mt-auto">
            <Text style={{ color: tintText }} className="text-base">
              Don&apos;t have an account?{" "}
            </Text>
            <TouchableOpacity onPress={() => router.push("/(auth)/signUp")}>
              <Text className="text-orange-400 font-semibold text-base">
                Sign Up
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default LogInScreen;
