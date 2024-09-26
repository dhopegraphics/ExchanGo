import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Keyboard,
  Platform,
  TouchableWithoutFeedback,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useThemeColor } from "@/hooks/useThemeColor";
import { StatusBar } from "expo-status-bar";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import DateTimePicker from "@react-native-community/datetimepicker";
import { router } from "expo-router";

export default function ProfileCreation() {
  const insets = useSafeAreaInsets();
  const backgroundColor = useThemeColor({}, "background");
  const textColor = useThemeColor({}, "text");
  const [profilePicture, setProfilePicture] = useState(null);
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(Platform.OS === "ios");
    setDate(currentDate);
  };

  const showDatepicker = () => {
    setShowDatePicker(true);
  };

  return (
    <KeyboardAvoidingView
      style={{
        flex: 1,
        backgroundColor: backgroundColor,
      }}
      // Behavior: Adjust the content when the keyboard appears (only on iOS)
      behavior={Platform.OS === "ios" ? "padding" : null}
      keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 100}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          style={{ backgroundColor: backgroundColor, flex: 1 }}
          contentContainerStyle={{
            paddingTop: insets.top,
          }}
        >
          <StatusBar style="auto" />
          <View className="px-4 py-6">
            <Text
              style={{ color: textColor }}
              className="text-2xl font-bold mb-2"
            >
              Create Profile
            </Text>
            <Text style={{ color: textColor }} className="text-gray-600 mb-6">
              Set up your profile and introduce yourself, let's connect together
            </Text>

            <View className="items-center mb-6 flex-row justify-start">
              <TouchableOpacity
                className="w-32 h-32 rounded-2xl bg-gray-200 justify-center items-center"
                activeOpacity={0.8}
                onPress={() => {
                  /* Handle image picker */
                }}
              >
                {profilePicture ? (
                  <Image
                    source={{ uri: profilePicture }}
                    className="w-full h-full rounded-2xl"
                  />
                ) : (
                  <Icon name="add-a-photo" size={40} color="black" />
                )}
              </TouchableOpacity>
              <Text
                style={{ color: textColor }}
                className="mt-2 ml-4 font-JakartaBold text-lg text-gray-600"
              >
                Profile Picture
              </Text>
            </View>

            <View className="space-y-4">
              <View>
                <Text
                  style={{ color: textColor }}
                  className="text-gray-700 mb-1"
                >
                  First Name
                </Text>
                <TextInput
                  className="border border-gray-300 rounded-md p-2"
                  placeholder="First Name"
                  placeholderTextColor={textColor}
                  style={{ color: textColor }}
                />
              </View>

              <View>
                <Text
                  style={{ color: textColor }}
                  className="text-gray-700 mb-1"
                >
                  Last Name
                </Text>
                <TextInput
                  className="border border-gray-300 rounded-md p-2"
                  placeholder="Last Name"
                  placeholderTextColor={textColor}
                  style={{ color: textColor }}
                />
              </View>

              <View>
                <Text
                  style={{ color: textColor }}
                  className="text-gray-700 mb-1"
                >
                  Mobile Number
                </Text>
                <TextInput
                  className="border border-gray-300 rounded-md p-2"
                  placeholder="Mobile Number"
                  keyboardType="phone-pad"
                  placeholderTextColor={textColor}
                  style={{ color: textColor }}
                />
              </View>

              <View>
                <Text
                  style={{ color: textColor }}
                  className="text-gray-700 mb-1"
                >
                  Date of Birth
                </Text>
                <TouchableOpacity
                  className="border border-gray-300 rounded-md p-2 flex-row justify-between items-center"
                  onPress={showDatepicker}
                >
                  <Text style={{ color: textColor }} className="text-gray-500">
                    {date.toLocaleDateString()}
                  </Text>
                  <Icon name="calendar-today" size={24} color={textColor} />
                </TouchableOpacity>
                {showDatePicker && (
                  <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode="date"
                    is24Hour={true}
                    display="default"
                    onChange={onDateChange}
                  />
                )}
              </View>

              <View>
                <Text
                  style={{ color: textColor }}
                  className="text-gray-700 mb-1"
                >
                  Location
                </Text>
                <TouchableOpacity className="border border-gray-300 rounded-md p-2 flex-row justify-between items-center">
                  <Text style={{ color: textColor }} className="text-gray-500">
                    Location
                  </Text>
                  <Icon name="location-on" size={24} color={textColor} />
                </TouchableOpacity>
              </View>
            </View>

            <TouchableOpacity
              activeOpacity={0.8}
              className="bg-orange-400 rounded-md py-3 mt-8"
              onPress={() => router.navigate("ProfileSetup/fieldOfInterest")}
            >
              <Text className="text-white text-center font-semibold">
                Continue
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
