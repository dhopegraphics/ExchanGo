import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { router } from "expo-router";

const interests = [
  "Illustration",
  "Animation",
  "Photography",
  "Languages",
  "Cinematography",
  "UI Design",
  "UX Design",
  "Architecture",
  "Digital Marketing",
  "Music",
  "Graphic Design",
  "Web Development",
  "Other",
];

export default function FieldOfInterest() {
  const [activeTab, setActiveTab] = useState("Teach");
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
  return (
    <View className="flex-1 bg-white p-4" style={{ paddingTop: insets.top }}>
      <Text className="text-2xl font-bold mb-4">
        Pick Your Field Of Interest
      </Text>
      <Text className="text-gray-600 mb-6">
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

      <Text className="text-gray-500 text-center my-4">
        Note: you can change this later if your interest changes
      </Text>

      <TouchableOpacity
        className="bg-black py-4 rounded-lg"
        onPress={() => {
          console.log("Final Selection:");
          console.log("Teach Interests:", teachInterests);
          console.log("Learn Interests:", learnInterests);
        }}
      >
        <Text className="text-white text-center font-semibold">Continue</Text>
      </TouchableOpacity>
    </View>
  );
}
