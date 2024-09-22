import React from "react";
import { View, Text, ScrollView, TouchableHighlight } from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

export const SettingItem = ({ icon, label, color, onPress }) => (
  <TouchableHighlight
    onPress={onPress}
    underlayColor="#3a3a3a"
    className="py-2 border-b border-gray-700"
  >
    <View className="flex-row items-center">
      <View
        className={`w-8 h-8 rounded-lg ml-5 mr-3 items-center justify-center`}
        style={{ backgroundColor: color }}
      >
        {icon}
      </View>
      <Text className="text-white text-base flex-1">{label}</Text>
      <View className="mr-5">
        <Ionicons name="chevron-forward" size={16} color="gray" />
      </View>
    </View>
  </TouchableHighlight>
);

export const SettingsGroup = ({ children, SectionHeader }) => (
  <>
    <Text className="text-white text-lg font-JakartaBold mb-3">
      {SectionHeader}
    </Text>
    <View className="bg-gray-800 rounded-xl mb-3  overflow-hidden">
      {children}
    </View>
  </>
);
