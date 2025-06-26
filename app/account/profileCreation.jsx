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
  Alert,
} from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";
import { StatusBar } from "expo-status-bar";
import Icon from "react-native-vector-icons/MaterialIcons";
import * as ImagePicker from "expo-image-picker";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import DateTimePicker from "@react-native-community/datetimepicker";
import { router } from "expo-router";
import * as Location from "expo-location";
import { Client, Databases, Account, ID, Storage } from "react-native-appwrite";
import {
  usersCollectionId,
  usersDatabaseId,
  avatarsBucketStorageId,
} from "@/constants/queryIdsExport";
import { getCountryCallingCode } from "libphonenumber-js";
import * as Localization from "expo-localization";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Haptics from "expo-haptics";

export default function ProfileCreation() {
  const insets = useSafeAreaInsets();
  const backgroundColor = useThemeColor({}, "background");
  const textColor = useThemeColor({}, "text");
  const tintColor = useThemeColor({}, "tint");
  const tintText = useThemeColor({}, "tintText");
  const [profilePicture, setProfilePicture] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [location, setLocation] = useState("");
  const locales = Localization.getLocales();
  const countryCode = locales[0]?.country || "US";
  const dialingCode = getCountryCallingCode(countryCode);
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [locationLoading, setLocationLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [errors, setErrors] = useState({});
  const [coords, setCoords] = useState({ latitude: null, longitude: null });
  const client = new Client()
    .setEndpoint(process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT)
    .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID);
  const databases = new Databases(client);
  const account = new Account(client);
  const storage = new Storage(client);

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(Platform.OS === "ios");
    setDate(currentDate);
  };

  const showDatepicker = () => {
    setShowDatePicker(true);
  };

  // Handle profile picture selection
  const handleImagePicker = async () => {
    // Request permission to access the media library
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {
      alert("Sorry, we need camera roll permissions to make this work!");
      return;
    }

    // Launch the image picker
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setProfilePicture(result.assets[0].uri);
    }
  };

  const uploadProfilePicture = async (uri) => {
    if (!uri) return null;

    try {
      // Show loading state for image upload
      setIsUploading(true);

      // Extract file information
      const fileName = uri.split("/").pop();
      const extension = fileName.split(".").pop().toLowerCase();

      // Validate file type
      const validTypes = ["jpg", "jpeg", "png"];
      const fileType = validTypes.includes(extension)
        ? `image/${extension === "jpg" ? "jpeg" : extension}`
        : "image/jpeg";

      // Create file object with properly structured data
      const fileObject = {
        name: fileName,
        type: fileType,
        size: 0, // Actual size is determined by the SDK
        uri: uri,
      };

      // Log upload attempt
      console.log(
        `Uploading ${fileType} file to bucket: ${avatarsBucketStorageId}`
      );

      // Upload file to Appwrite storage
      const response = await storage.createFile(
        avatarsBucketStorageId,
        ID.unique(),
        fileObject
      );

      console.log("Upload successful:", response.$id);
      return response?.$id;
    } catch (error) {
      // Detailed error logging
      console.log("Image upload error:", error);

      // User-friendly error messages based on error type
      if (error.code === 401) {
        Alert.alert(
          "Authentication Error",
          "Please sign in again to continue."
        );
      } else if (error.code === 413) {
        Alert.alert("File Too Large", "Please choose a smaller image.");
      } else {
        Alert.alert(
          "Upload Failed",
          "We couldn't upload your profile picture. Please try again."
        );
      }
      return null;
    } finally {
      // Always reset loading state
      setIsUploading(false);
    }
  };

  const handleGetLocation = async () => {
    try {
      setLocationLoading(true);
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission denied", "Location permission is required.");
        setLocationLoading(false);
        setErrors((prev) => ({
          ...prev,
          location: "Location permission denied",
        }));
        return;
      }
      let loc = await Location.getCurrentPositionAsync({});
      setCoords({
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
      });
      let addresses = await Location.reverseGeocodeAsync({
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
      });
      if (addresses && addresses.length > 0) {
        const place = addresses[0];
        const addressString = [
          place.name,
          place.street,
          place.city,
          place.region,
          place.country,
        ]
          .filter(Boolean)
          .join(", ");
        setLocation(addressString);
        setErrors((prev) => ({ ...prev, location: undefined }));
      } else {
        setLocation("Location found, but address unavailable");
        setErrors((prev) => ({ ...prev, location: "Address unavailable" }));
      }
    } catch (_error) {
      Alert.alert("Error", "Could not fetch location.");
      setLocation("Unable to get location");
      setErrors((prev) => ({ ...prev, location: "Unable to get location" }));
    } finally {
      setLocationLoading(false);
    }
  };

  let formattedNumber = mobileNumber.trim();
  // If the number doesn't start with the dialing code, prepend it
  if (!formattedNumber.startsWith(dialingCode)) {
    formattedNumber = `${dialingCode}${formattedNumber.replace(/^0+/, "")}`;
  }

  // Validation logic
  const validate = () => {
    const newErrors = {};
    if (!firstName.trim()) newErrors.firstName = "First name is required";
    if (!lastName.trim()) newErrors.lastName = "Last name is required";

    if (!profilePicture) {
      newErrors.profilePicture = "Profile picture is required";
    }
    if (!/^\d{7,15}$/.test(formattedNumber)) {
      newErrors.mobileNumber = "Enter a valid mobile number with country code";
    }
    if (!date || isNaN(date.getTime()))
      newErrors.date = "Date of birth is required";
    if (
      !location ||
      location.startsWith("Unable") ||
      location.startsWith("Location found")
    ) {
      newErrors.location = "Location is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle continue
  const handleContinue = async () => {
    // First validate all form fields
    if (!validate()) {
      // Show validation errors with visual feedback
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      Alert.alert(
        "Please Fix Errors",
        "Some information is missing or incorrect."
      );
      return;
    }

    try {
      // Begin submission - show loading state
      setIsSubmitting(true);
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

      // Get current user
      const user = await account.get();

      // Handle profile picture upload with visual feedback
      let avatarUrl = "";
      let fileId = null;

      if (profilePicture) {
        // Update status message
        setStatusMessage("Uploading profile picture...");

        // Upload profile picture
        fileId = await uploadProfilePicture(profilePicture);

        if (fileId) {
          // Generate URL for database storage
          avatarUrl = storage.getFileDownloadURL(
            avatarsBucketStorageId,
            fileId
          );
        }
      }

      // Update status for database operation
      setStatusMessage("Saving your profile...");

      // Create user profile document
      await databases.createDocument(
        usersDatabaseId,
        usersCollectionId,
        ID.unique(),
        {
          user_id: user.$id,
          first_name: firstName.trim(),
          middle_name: middleName.trim(),
          last_name: lastName.trim(),
          phone_number: formattedNumber,
          date_of_birth: date.toISOString(),
          latitude: coords.latitude,
          longitude: coords.longitude,
          address: location,
          avatar_url: avatarUrl || null,
        }
      );

      // Update onboarding progress
      await AsyncStorage.setItem("onboardingStage", "interests");

      // Show success feedback before navigation
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      setStatusMessage("Profile created successfully!");

      // Small delay for user to see success message
      setTimeout(() => {
        // Navigate to next screen with smooth transition
        router.replace("ProfileSetup/fieldOfInterest");
      }, 500);
    } catch (error) {
      // Handle errors with appropriate feedback
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      console.log("Profile save error:", error);

      // Show specific error message based on error type
      if (error.code === 401) {
        Alert.alert("Session Expired", "Please sign in again to continue.");
      } else {
        Alert.alert(
          "Couldn't Save Profile",
          error.message || "Please check your connection and try again."
        );
      }
    } finally {
      // Always cleanup loading state
      setIsSubmitting(false);
      setStatusMessage("");
    }
  };

  return (
    <KeyboardAvoidingView
      style={{
        flex: 1,
        backgroundColor: backgroundColor,
      }}
      behavior={Platform.OS === "ios" ? "padding" : null}
      keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 100}
    >
      <View className="flex-row  items-center  justify-between  pt-20 px-8 mb-2">
        <View className="flex-row items-center">
          <View className="h-8 w-8 rounded-full bg-orange-400 items-center justify-center">
            <Text className="text-white font-bold">1</Text>
          </View>
          <View className="h-1 w-8 bg-orange-400 mx-1" />
          <View className="h-8 w-8 rounded-full bg-gray-300 items-center justify-center">
            <Text className="text-gray-600 font-bold">2</Text>
          </View>
        </View>
        <View className="h-1 w-8 bg-gray-300 mx-1" />
        <Text style={{ color: tintText }} className="text-sm">
          Step 1 of 2
        </Text>
      </View>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          style={{ backgroundColor, flex: 1 }}
          contentContainerStyle={{
            paddingBottom: 40,
          }}
          showsVerticalScrollIndicator={false}
        >
          <StatusBar style="auto" />

          {/* Header */}
          <View className="px-5 py-4 flex-row items-center">
            <TouchableOpacity
              className="w-10 h-10 rounded-full justify-center items-center mr-2"
              onPress={() => router.replace("/(auth)/signUp")}
            >
              <Icon name="arrow-back-ios" size={22} color={textColor} />
            </TouchableOpacity>
            <View className="flex-1">
              <Text
                className="text-2xl font-bold mb-1"
                style={{ color: textColor }}
              >
                Create Profile
              </Text>
              <Text className="text-base" style={{ color: tintText }}>
                Set up your profile to connect with others
              </Text>
            </View>
          </View>

          {/* Profile Picture Selection */}
          <View className="items-center justify-center my-5">
            <TouchableOpacity
              className="w-20 h-20 rounded-full overflow-hidden justify-center items-center mb-3 relative"
              activeOpacity={0.8}
              onPress={handleImagePicker}
            >
              {profilePicture ? (
                <>
                  <Image
                    source={{ uri: profilePicture }}
                    className="w-full h-full rounded-full"
                  />
                  <View className="absolute right-0 bottom-0 bg-[#0a7ea4] w-8 h-8 rounded-full justify-center items-center border-2 border-white">
                    <Icon name="edit" size={18} color="#fff" />
                  </View>
                </>
              ) : (
                <>
                  <View
                    className="w-full h-full rounded-full justify-center items-center"
                    style={{ backgroundColor: tintColor + "20" }}
                  >
                    <Icon name="person" size={50} color={tintColor} />
                  </View>
                  <View
                    className="absolute  left-12 bottom-2 w-6 h-6 rounded-full justify-center items-center border-2 border-white"
                    style={{ backgroundColor: tintColor }}
                  >
                    <Icon name="add" size={18} color="black" />
                  </View>
                </>
              )}
            </TouchableOpacity>
            <View>
              {isUploading && (
                <Text className="text-xs text-gray-500 mt-1">Uploading...</Text>
              )}
              {errors.profilePicture && (
                <Text className="text-xs text-red-500 mt-1">
                  {errors.profilePicture}
                </Text>
              )}
            </View>
            <Text
              className="text-base font-medium"
              style={{ color: textColor }}
            >
              Upload Profile Picture
            </Text>
          </View>

          {/* Form Fields */}
          <View className="px-5">
            {/* Personal Information Section */}
            <View className="mb-6">
              <Text
                className="text-lg font-semibold mb-4"
                style={{ color: textColor }}
              >
                Personal Information
              </Text>

              <View className="mb-4">
                <Text
                  className="text-sm mb-2 font-medium"
                  style={{ color: tintText }}
                >
                  First Name
                </Text>
                <TextInput
                  className="h-12 border rounded-xl px-4 text-base"
                  style={{ color: textColor, borderColor: tintText + "40" }}
                  placeholder="Enter your first name"
                  placeholderTextColor={tintText}
                  onChangeText={setFirstName}
                />
                {errors.firstName && (
                  <Text className="text-xs text-red-500 mt-1">
                    {errors.firstName}
                  </Text>
                )}
              </View>

              <View className="mb-4">
                <Text
                  className="text-sm mb-2 font-medium"
                  style={{ color: tintText }}
                >
                  Middle Name
                </Text>
                <TextInput
                  className="h-12 border rounded-xl px-4 text-base"
                  style={{ color: textColor, borderColor: tintText + "40" }}
                  placeholder="Enter your first name"
                  placeholderTextColor={tintText}
                  onChangeText={setMiddleName}
                />
              </View>

              <View className="mb-4">
                <Text
                  className="text-sm mb-2 font-medium"
                  style={{ color: tintText }}
                >
                  Last Name
                </Text>
                <TextInput
                  className="h-12 border rounded-xl px-4 text-base"
                  style={{ color: textColor, borderColor: tintText + "40" }}
                  placeholder="Enter your last name"
                  placeholderTextColor={tintText}
                  onChangeText={setLastName}
                />
                {errors.lastName && (
                  <Text className="text-xs text-red-500 mt-1">
                    {errors.lastName}
                  </Text>
                )}
              </View>

              <View className="mb-4">
                <Text
                  className="text-sm mb-2 font-medium"
                  style={{ color: tintText }}
                >
                  Mobile Number
                </Text>
                <TextInput
                  className="h-12 border rounded-xl px-4 text-base"
                  style={{ color: textColor, borderColor: tintText + "40" }}
                  placeholder="Enter your mobile number"
                  placeholderTextColor={tintText}
                  keyboardType="phone-pad"
                  onChangeText={setMobileNumber}
                />
                {errors.mobileNumber && (
                  <Text className="text-xs text-red-500 mt-1">
                    {errors.mobileNumber}
                  </Text>
                )}
              </View>

              <View className="mb-4">
                <Text
                  className="text-sm mb-2 font-medium"
                  style={{ color: tintText }}
                >
                  Date of Birth
                </Text>
                <TouchableOpacity
                  className="h-12 border rounded-xl px-4 flex-row items-center justify-between py-3"
                  style={{ borderColor: tintText + "40" }}
                  onPress={showDatepicker}
                >
                  <Text style={{ color: textColor }}>
                    {date.toLocaleDateString()}
                  </Text>
                  <Icon name="calendar-today" size={20} color={tintColor} />
                </TouchableOpacity>
                {showDatePicker && (
                  <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode="date"
                    is24Hour={true}
                    display="default"
                    onChange={onDateChange}
                    maximumDate={new Date()}
                  />
                )}
                {errors.date && (
                  <Text className="text-xs text-red-500 mt-1">
                    {errors.date}
                  </Text>
                )}
              </View>

              <View className="mb-4">
                <Text
                  className="text-sm mb-2 font-medium"
                  style={{ color: tintText }}
                >
                  Location
                </Text>
                <TouchableOpacity
                  className="h-12 border rounded-xl px-4 flex-row items-center justify-between py-3"
                  style={{ borderColor: tintText + "40" }}
                  onPress={handleGetLocation}
                  disabled={locationLoading}
                >
                  <Text
                    style={{ color: tintText }}
                    numberOfLines={1}
                    ellipsizeMode="tail"
                  >
                    {locationLoading
                      ? "Getting location..."
                      : location
                      ? location
                      : "Set your location"}
                  </Text>
                  <Icon name="location-on" size={20} color={tintColor} />
                </TouchableOpacity>
                {errors.location && (
                  <Text className="text-xs text-red-500 mt-1">
                    {errors.location}
                  </Text>
                )}
              </View>
            </View>

            {/* Continue Button */}
            <TouchableOpacity
              className={`h-14 rounded-2xl flex-row items-center justify-center mt-6 ${
                isSubmitting ? "opacity-70" : ""
              }`}
              style={{ backgroundColor: tintColor }}
              activeOpacity={0.8}
              onPress={handleContinue}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <View className="h-5 w-5 rounded-full border-2 border-t-white border-r-transparent border-b-white border-l-transparent animate-spin mr-2" />
              ) : null}
              <Text className="text-black text-base font-semibold mr-2">
                {isSubmitting ? "Saving..." : "Continue"}
              </Text>
              {!isSubmitting && (
                <Icon name="arrow-forward" size={20} color="#fff" />
              )}
            </TouchableOpacity>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>

      {/* Status Message Toast */}
      {statusMessage && !isUploading && !isSubmitting && (
        <View
          className="absolute bottom-10 left-0 right-0 mx-auto w-4/5 bg-white dark:bg-gray-800 rounded-xl p-4 shadow-xl"
          style={{ zIndex: 1000 }}
        >
          <View className="flex-row items-center">
            <Icon
              name={statusMessage.includes("success") ? "check-circle" : "info"}
              size={24}
              color={statusMessage.includes("success") ? "#4ade80" : tintColor}
              style={{ marginRight: 10 }}
            />
            <Text className="text-base flex-1" style={{ color: textColor }}>
              {statusMessage}
            </Text>
          </View>
        </View>
      )}
      {/* Loading Overlay */}
      {(isUploading || isSubmitting) && (
        <View
          className="absolute inset-0 bg-black/30 flex items-center justify-center"
          style={{ zIndex: 1000 }}
        >
          <View className="bg-white dark:bg-gray-800 rounded-xl p-6 w-4/5 items-center">
            {isUploading && (
              <View className="items-center">
                <View className="h-16 w-16 rounded-full border-4 border-t-orange-400 border-gray-200 animate-spin mb-3" />
                <Text
                  className="text-base font-medium"
                  style={{ color: textColor }}
                >
                  Uploading Image...
                </Text>
              </View>
            )}

            {isSubmitting && !isUploading && (
              <View className="items-center">
                <View className="h-16 w-16 rounded-full border-4 border-t-orange-400 border-gray-200 animate-spin mb-3" />
                <Text
                  className="text-base font-medium"
                  style={{ color: textColor }}
                >
                  {statusMessage || "Saving profile..."}
                </Text>
              </View>
            )}
          </View>
        </View>
      )}
    </KeyboardAvoidingView>
  );
}
