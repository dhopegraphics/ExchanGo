import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, Switch } from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

const PrivacySettings = () => {
  const backgroundColor = useThemeColor({}, "background");
  const insets = useSafeAreaInsets();

  // Privacy settings states
  const [profileVisible, setProfileVisible] = useState("everyone");
  const [showOnlineStatus, setShowOnlineStatus] = useState(true);
  const [showReadReceipts, setShowReadReceipts] = useState(true);
  const [showLastSeen, setShowLastSeen] = useState(true);
  const [allowMessages, setAllowMessages] = useState("contacts");
  const [dataSharing, setDataSharing] = useState(false);
  const [locationSharing, setLocationSharing] = useState(false);

  // Section component for consistent styling
  const Section = ({ title, children }) => (
    <View className="mb-6">
      <Text className="text-gray-400 font-medium mb-2 ml-1">{title}</Text>
      <View className="bg-gray-800 rounded-xl overflow-hidden">{children}</View>
    </View>
  );

  // Switch item component
  const SwitchItem = ({
    icon,
    iconColor,
    title,
    description,
    value,
    onValueChange,
  }) => (
    <View className="flex-row items-center justify-between p-4 border-b border-gray-700">
      <View className="flex-row items-center flex-1 mr-4">
        <View
          style={{ backgroundColor: iconColor }}
          className="w-8 h-8 rounded-full items-center justify-center mr-3"
        >
          <Ionicons name={icon} size={18} color="white" />
        </View>
        <View className="flex-1">
          <Text className="text-white font-medium">{title}</Text>
          {description && (
            <Text className="text-gray-400 text-sm mt-0.5">{description}</Text>
          )}
        </View>
      </View>
      <Switch
        trackColor={{ false: "#4B5563", true: "#32ADE6" }}
        thumbColor="#FFFFFF"
        value={value}
        onValueChange={onValueChange}
      />
    </View>
  );

  // Option selector component
  const OptionSelector = ({
    icon,
    iconColor,
    title,
    description,
    options,
    value,
    onChange,
  }) => (
    <View className="p-4 border-b border-gray-700">
      <View className="flex-row items-center mb-3">
        <View
          style={{ backgroundColor: iconColor }}
          className="w-8 h-8 rounded-full items-center justify-center mr-3"
        >
          <Ionicons name={icon} size={18} color="white" />
        </View>
        <View>
          <Text className="text-white font-medium">{title}</Text>
          {description && (
            <Text className="text-gray-400 text-sm mt-0.5">{description}</Text>
          )}
        </View>
      </View>
      <View className="flex-row flex-wrap mt-2">
        {options.map((option) => (
          <TouchableOpacity
            key={option.value}
            className={`py-2 px-4 rounded-full mr-2 mb-2 ${
              value === option.value ? "bg-blue-600" : "bg-gray-700"
            }`}
            onPress={() => onChange(option.value)}
          >
            <Text className="text-white">{option.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  // Action button component
  const ActionButton = ({ icon, iconColor, title, onPress }) => (
    <TouchableOpacity
      className="flex-row items-center p-4 border-b border-gray-700"
      onPress={onPress}
    >
      <View
        style={{ backgroundColor: iconColor }}
        className="w-8 h-8 rounded-full items-center justify-center mr-3"
      >
        <Ionicons name={icon} size={18} color="white" />
      </View>
      <Text className="text-white font-medium">{title}</Text>
      <View className="flex-1" />
      <Ionicons name="chevron-forward" size={20} color="#6B7280" />
    </TouchableOpacity>
  );

  return (
    <View
      className="flex-1 p-4"
      style={{
        backgroundColor,
        paddingTop: insets.top,
      }}
    >
      {/* Header */}
      <View className="flex-row items-center mb-6">
        <TouchableOpacity onPress={() => router.back()} className="pr-4">
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text className="text-white text-2xl font-bold">Privacy</Text>
      </View>

      <ScrollView className="px-1">
        {/* Profile Privacy */}
        <Section title="PROFILE PRIVACY">
          <OptionSelector
            icon="person"
            iconColor="#32ADE6"
            title="Profile Visibility"
            description="Who can see your profile information"
            value={profileVisible}
            onChange={setProfileVisible}
            options={[
              { label: "Everyone", value: "everyone" },
              { label: "Contacts", value: "contacts" },
              { label: "Nobody", value: "nobody" },
            ]}
          />

          <SwitchItem
            icon="radio"
            iconColor="#32ADE6"
            title="Online Status"
            description="Show when you're active on ExchanGo"
            value={showOnlineStatus}
            onValueChange={setShowOnlineStatus}
          />

          <SwitchItem
            icon="time"
            iconColor="#32ADE6"
            title="Last Seen"
            description="Show when you last used the app"
            value={showLastSeen}
            onValueChange={setShowLastSeen}
          />
        </Section>

        {/* Message Privacy */}
        <Section title="MESSAGE PRIVACY">
          <SwitchItem
            icon="checkmark-done"
            iconColor="#FF9500"
            title="Read Receipts"
            description="Let others know when you've read their messages"
            value={showReadReceipts}
            onValueChange={setShowReadReceipts}
          />

          <OptionSelector
            icon="chatbubble"
            iconColor="#FF9500"
            title="Who Can Message Me"
            description="Control who can send you direct messages"
            value={allowMessages}
            onChange={setAllowMessages}
            options={[
              { label: "Everyone", value: "everyone" },
              { label: "Contacts", value: "contacts" },
              { label: "Nobody", value: "nobody" },
            ]}
          />

          <ActionButton
            icon="ban"
            iconColor="#FF3B30"
            title="Blocked Accounts"
            onPress={() => router.push("/account/blockedAccounts")}
          />
        </Section>

        {/* Data Privacy */}
        <Section title="DATA PRIVACY">
          <SwitchItem
            icon="analytics"
            iconColor="#5856D6"
            title="Data Sharing"
            description="Allow anonymous usage data for app improvements"
            value={dataSharing}
            onValueChange={setDataSharing}
          />

          <SwitchItem
            icon="location"
            iconColor="#5856D6"
            title="Location Sharing"
            description="Share your location with nearby communities"
            value={locationSharing}
            onValueChange={setLocationSharing}
          />

          <ActionButton
            icon="download"
            iconColor="#34C759"
            title="Download Your Data"
            onPress={() => router.push("/account/downloadData")}
          />

          <ActionButton
            icon="eye"
            iconColor="#34C759"
            title="App Permissions"
            onPress={() => router.push("/account/appPermissions")}
          />
        </Section>
      </ScrollView>
    </View>
  );
};

export default PrivacySettings;
