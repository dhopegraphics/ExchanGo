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
import { useProfileStore } from "@/stores/useProfileStore";

export default function ProfileCreation() {
  const insets = useSafeAreaInsets();
  const backgroundColor = useThemeColor({}, "background");
  const textColor = useThemeColor({}, "text");
  const tintColor = useThemeColor({}, "tint");
  const cardBackground = useThemeColor({}, "cardBackground");
  const tintText = useThemeColor({}, "tintText");
  const [profilePicture, setProfilePicture] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [locationLoading, setLocationLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const setProfile = useProfileStore((state) => state.setProfile);
  const savedProfile = useProfileStore((state) => state.profile);

  React.useEffect(() => {
    if (savedProfile) {
      if (savedProfile.profilePicture)
        setProfilePicture(savedProfile.profilePicture);
      if (savedProfile.firstName) setFirstName(savedProfile.firstName);
      if (savedProfile.middleName) setMiddleName(savedProfile.middleName);
      if (savedProfile.lastName) setLastName(savedProfile.lastName);
      if (savedProfile.mobileNumber) setMobileNumber(savedProfile.mobileNumber);
      if (savedProfile.dateOfBirth) setDate(new Date(savedProfile.dateOfBirth));
      if (savedProfile.location) setLocation(savedProfile.location);
    }
  }, []);

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
    } catch (error) {
      Alert.alert("Error", "Could not fetch location.");
      setLocation("Unable to get location");
      setErrors((prev) => ({ ...prev, location: "Unable to get location" }));
    } finally {
      setLocationLoading(false);
    }
  };

  // Validation logic

  const validate = () => {
    const newErrors = {};
    if (!firstName.trim()) newErrors.firstName = "First name is required";
    if (!lastName.trim()) newErrors.lastName = "Last name is required";
    if (!mobileNumber.trim()) {
      newErrors.mobileNumber = "Mobile number is required";
    } else if (!/^\+?\d{7,15}$/.test(mobileNumber.trim())) {
      newErrors.mobileNumber = "Enter a valid mobile number";
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
  const handleContinue = () => {
    if (validate()) {
      // Save profile data persistently
      setProfile({
        profilePicture,
        firstName,
        middleName,
        lastName,
        mobileNumber,
        dateOfBirth: date.toISOString(),
        location,
      });
      router.replace("ProfileSetup/fieldOfInterest");
    } else {
      Alert.alert("Validation Error", "Please fix the errors in the form.");
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
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          style={{ backgroundColor, flex: 1 }}
          contentContainerStyle={{
            paddingTop: insets.top,
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
              className="h-14 rounded-2xl flex-row items-center justify-center mt-6"
              style={{ backgroundColor: tintColor }}
              activeOpacity={0.8}
              onPress={handleContinue}
            >
              <Text className="text-black text-base font-semibold mr-2">
                Continue
              </Text>
              <Icon name="arrow-forward" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
