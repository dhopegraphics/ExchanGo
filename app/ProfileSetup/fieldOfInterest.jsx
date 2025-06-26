import { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { router } from "expo-router";
import { useThemeColor } from "@/hooks/useThemeColor";
import { interests } from "@/constants/data";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Client, Databases, Account, ID } from "react-native-appwrite";
import {
  usersDatabaseId,
  fieldOfInterestCollectionId,
} from "@/constants/queryIdsExport";
import * as Haptics from "expo-haptics";

export default function FieldOfInterest() {
  const backgroundColor = useThemeColor({}, "background");
  const textColor = useThemeColor({}, "text");
  const tintText = useThemeColor({}, "tintText");
  const [activeTab, setActiveTab] = useState("Teach");
  const [error, setError] = useState("");
  const insets = useSafeAreaInsets();
  const [teachInterests, setTeachInterests] = useState([]);
  const [learnInterests, setLearnInterests] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [progress, setProgress] = useState(0);
  const [totalItems, setTotalItems] = useState(0);

  const client = new Client()
    .setEndpoint(process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT)
    .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID);

  const databases = new Databases(client);
  const account = new Account(client);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    console.log(`Active Tab: ${tab}`);
    console.log(
      `${tab} Interests:`,
      tab === "Teach" ? teachInterests : learnInterests
    );
  };
  const toggleInterest = (interest) => {
    if (activeTab === "Teach") {
      setTeachInterests((prevSelected) =>
        prevSelected.includes(interest)
          ? prevSelected.filter((item) => item !== interest)
          : [...prevSelected, interest]
      );
    } else {
      setLearnInterests((prevSelected) =>
        prevSelected.includes(interest)
          ? prevSelected.filter((item) => item !== interest)
          : [...prevSelected, interest]
      );
    }
  };

  const handleContinue = async () => {
    if (teachInterests.length === 0 || learnInterests.length === 0) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      setError(
        "Please select at least one interest for both Teach and Learn categories."
      );
      return;
    }

    try {
      // Start submission process
      setError("");
      setIsSubmitting(true);
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

      // Calculate total items for progress tracking
      const totalInterests = teachInterests.length + learnInterests.length;
      setTotalItems(totalInterests);
      setProgress(0);

      // Get current user
      setStatusMessage("Getting account information...");
      const user = await account.get();

      // Upload teach interests with progress
      setStatusMessage("Saving your teaching interests...");
      let currentProgress = 0;

      // Create a document for each Teach interest
      for (const interest of teachInterests) {
        await databases.createDocument(
          usersDatabaseId,
          fieldOfInterestCollectionId,
          ID.unique(),
          {
            user_id: user.$id,
            name: interest,
            type: "Teach",
          }
        );
        currentProgress++;
        setProgress(Math.floor((currentProgress / totalInterests) * 100));
      }

      // Create a document for each Learn interest
      setStatusMessage("Saving your learning interests...");
      for (const interest of learnInterests) {
        await databases.createDocument(
          usersDatabaseId,
          fieldOfInterestCollectionId,
          ID.unique(),
          {
            user_id: user.$id,
            name: interest,
            type: "Learn",
          }
        );
        currentProgress++;
        setProgress(Math.floor((currentProgress / totalInterests) * 100));
      }

      // Update onboarding stage
      setStatusMessage("Completing setup...");
      await AsyncStorage.setItem("onboardingStage", "done");

      // Show success message before navigation
      setStatusMessage("Your interests have been saved!");
      setProgress(100);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);

      // Short delay to show success state before navigating
      setTimeout(() => {
        router.replace("/(main)/Explore");
      }, 1200);
    } catch (error) {
      console.error("Interest setup error:", error);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);

      if (error.code === 401) {
        setError("Session expired. Please sign in again.");
      } else {
        setError("Failed to save interests. Please try again.");
      }

      setIsSubmitting(false);
      setStatusMessage("");
    }
  };

  return (
    <View
      className="flex-1  p-4"
      style={{ paddingTop: insets.top, backgroundColor: backgroundColor }}
    >
      <View className="flex-row items-center justify-between mx-5 mb-6">
        <View className="flex-row items-center">
          <View className="h-8 w-8 rounded-full bg-gray-300  items-center justify-center">
            <Text className=" text-gray-600  font-bold">1</Text>
          </View>
          <View className="h-1 w-8 bg-orange-400 mx-1" />
          <View className="h-8 w-8 rounded-full bg-orange-400 items-center justify-center">
            <Text className="text-white font-bold">2</Text>
          </View>
          <View className="h-1 w-8 bg-gray-300 mx-1" />
        </View>
        <Text style={{ color: tintText }} className="text-sm">
          Step 2 of 2
        </Text>
      </View>

      <Text
        style={{ color: textColor }}
        className="text-2xl font-JakartaSemiBold mb-4"
      >
        Pick Your Field Of Interest
      </Text>
      <Text style={{ color: tintText }} className="text-gray-600 mb-6">
        Select your area of interest you like to teach and learn, you can also
        choose any one as you prefer
      </Text>
      {error ? (
        <Text className="text-red-500 text-center mb-4">{error}</Text>
      ) : null}
      <View className="flex-row mb-6 gap-4 space-x-6">
        <TouchableOpacity
          className={`flex-1 py-3 rounded-md ${
            activeTab === "Teach" ? "bg-orange-400" : "bg-gray-200"
          }`}
          onPress={() => handleTabChange("Teach")}
        >
          <Text
            className={`text-center font-semibold ${
              activeTab === "Teach" ? "text-white" : "text-gray-700"
            }`}
          >
            Teach & Swap
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className={`flex-1 py-3 rounded-md ${
            activeTab === "Learn" ? "bg-orange-400" : "bg-gray-200"
          }`}
          onPress={() => handleTabChange("Learn")}
        >
          <Text
            className={`text-center font-semibold ${
              activeTab === "Learn" ? "text-white" : "text-gray-700"
            }`}
          >
            Learn
          </Text>
        </TouchableOpacity>
      </View>

      <View className=" bg-gray-100  rounded-lg p-6 px-4 h-[320px]">
        <ScrollView
          className=" "
          contentContainerStyle={{
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "flex-start",
            gap: 8,
          }}
        >
          {interests.map((interest, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => toggleInterest(interest)}
            >
              <View
                className={`w-[100%] h-[45px] flex-1   mb-4 p-4 justify-center items-center rounded-lg  ${
                  (activeTab === "Teach"
                    ? teachInterests
                    : learnInterests
                  ).includes(interest)
                    ? "bg-orange-400"
                    : "bg-white"
                }`}
              >
                <Text
                  className={`text-center pb-4  ${
                    (activeTab === "Teach"
                      ? teachInterests
                      : learnInterests
                    ).includes(interest)
                      ? "text-white"
                      : "text-black"
                  }`}
                >
                  {interest}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <Text
        style={{ color: tintText }}
        className="text-gray-500 text-center my-4"
      >
        Note: you can change this later if your interest changes
      </Text>

      <TouchableOpacity
        className={`py-4 rounded-lg ${
          teachInterests.length > 0 && learnInterests.length > 0
            ? "bg-orange-400"
            : "bg-gray-300"
        }`}
        onPress={handleContinue}
        disabled={
          isSubmitting ||
          teachInterests.length === 0 ||
          learnInterests.length === 0
        }
      >
        <Text className="text-white text-center font-semibold">
          {isSubmitting ? "Saving..." : "Continue"}
        </Text>
      </TouchableOpacity>

      {/* Loading Overlay */}
      {isSubmitting && (
        <View
          className="absolute inset-0 bg-black/40 flex items-center justify-center"
          style={{ zIndex: 1000 }}
        >
          <View className="bg-white dark:bg-gray-800 rounded-xl p-6 w-4/5 items-center">
            <View className="w-full mb-3">
              <Text
                className="text-center font-semibold mb-2"
                style={{ color: textColor }}
              >
                {statusMessage}
              </Text>
              <View>
                <Text
                  className="text-center text-sm mb-2"
                  style={{ color: tintText }}
                >
                  {totalItems > 0
                    ? `Saving ${totalItems} interest${
                        totalItems > 1 ? "s" : ""
                      }`
                    : "Saving interests..."}
                </Text>
              </View>
              {/* Progress bar */}
              <View className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                <View
                  className="h-full bg-orange-400"
                  style={{ width: `${progress}%` }}
                />
              </View>

              <Text
                className="text-center text-sm mt-1"
                style={{ color: tintText }}
              >
                {progress}% Complete
              </Text>
            </View>

            {progress === 100 ? (
              <View className="items-center">
                <View className="h-16 w-16 rounded-full bg-green-100 items-center justify-center mb-2">
                  <Text className="text-2xl">✓</Text>
                </View>
                <Text className="text-green-600 font-semibold">All set!</Text>
              </View>
            ) : (
              <View className="h-10 w-10 rounded-full border-4 border-t-orange-400 border-r-gray-200 border-b-gray-200 border-l-gray-200 animate-spin" />
            )}
          </View>
        </View>
      )}
    </View>
  );
}
