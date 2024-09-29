import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { router } from "expo-router";
import { useThemeColor } from "@/hooks/useThemeColor";
import { interests } from "@/constants/data";

export default function FieldOfInterest() {
  const backgroundColor = useThemeColor({}, "background");
  const textColor = useThemeColor({}, "text");
  const tintText = useThemeColor({}, "tintText");
  const [activeTab, setActiveTab] = useState("Teach");
  const [error, setError] = useState("");
  const insets = useSafeAreaInsets();
  const [teachInterests, setTeachInterests] = useState([]);
  const [learnInterests, setLearnInterests] = useState([]);

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

  const handleContinue = () => {
    if (teachInterests.length === 0 || learnInterests.length === 0) {
      setError(
        "Please select at least one interest for both Teach and Learn categories."
      );
    } else {
      setError("");
      console.log("Final Selection:");
      console.log("Teach Interests:", teachInterests);
      console.log("Learn Interests:", learnInterests);
      router.replace("/(main)/(tabs)/Explore");
      // Add navigation logic here
    }
  };

  return (
    <View
      className="flex-1  p-4"
      style={{ paddingTop: insets.top, backgroundColor: backgroundColor }}
    >
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

      <View className="flex-row mb-6 space-x-6">
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
            Teach
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
        disabled={teachInterests.length === 0 || learnInterests.length === 0}
      >
        <Text className="text-white text-center font-semibold">Continue</Text>
      </TouchableOpacity>
    </View>
  );
}
