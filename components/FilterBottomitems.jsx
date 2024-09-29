import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { Ionicons } from "@expo/vector-icons";
import Slider from "@react-native-community/slider";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const FilterScreen = () => {
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [timing, setTiming] = useState("");
  const [availability, setAvailability] = useState("");
  const [language, setLanguage] = useState("");
  const [rating, setRating] = useState(4);
  const [distance, setDistance] = useState(5);
  const insets = useSafeAreaInsets();

  const skills = [
    "Illustration",
    "Photography",
    "UI Design",
    "Graphic Design",
    "Animation",
    "UX Design",
    "Marketing",
    "Language",
  ];
  const timings = ["Morning - Noon", "Noon - Evening", "Evening - Night"];
  const availabilityOptions = ["Online", "Offline"];
  const languages = ["Tamil", "English", "Malayalam", "Hindi", "Other"];

  const toggleSkill = (skill) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter((s) => s !== skill));
    } else {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  return (
    <View style={{ paddingBottom: insets.bottom }} className="flex-1 bg-white">
      <ScrollView className="flex-1 bg-white p-4">
        <Text className="text-lg font-bold mb-2">Select City</Text>
        <TouchableOpacity className="bg-orange-400 rounded-full py-2 px-4 mb-4 flex-row items-center justify-center">
          <Ionicons name="add" size={20} color="white" />
          <Text className="text-white ml-2">Add Your City</Text>
        </TouchableOpacity>

        <Text className="text-lg font-bold mb-2">Skills</Text>
        <View className="flex-row flex-wrap mb-4">
          {skills.map((skill) => (
            <TouchableOpacity
              key={skill}
              onPress={() => toggleSkill(skill)}
              className={`rounded-full py-1 px-3 m-1 ${
                selectedSkills.includes(skill) ? "bg-orange-400" : "bg-gray-200"
              }`}
            >
              <Text
                className={
                  selectedSkills.includes(skill) ? "text-white" : "text-black"
                }
              >
                {skill}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text className="text-lg font-bold mb-2">Timing</Text>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <View className="flex-row mb-4">
            {timings.map((time) => (
              <TouchableOpacity
                key={time}
                onPress={() => setTiming(time)}
                className={`rounded-full py-2 px-4 mr-2 ${
                  timing === time ? "bg-orange-400" : "border border-gray-300"
                }`}
              >
                <Text className={timing === time ? "text-white" : "text-black"}>
                  {time}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
        <Text className="text-lg font-bold mb-2">Availability</Text>
        <View className="flex-row mb-4">
          {availabilityOptions.map((option) => (
            <TouchableOpacity
              key={option}
              onPress={() => setAvailability(option)}
              className={`rounded-full py-2 px-4 mr-2 ${
                availability === option
                  ? "bg-orange-400"
                  : "border border-gray-300"
              }`}
            >
              <Text
                className={
                  availability === option ? "text-white" : "text-black"
                }
              >
                {option}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text className="text-lg font-bold mb-2">Language</Text>
        <View className="flex-row flex-wrap mb-4">
          {languages.map((lang) => (
            <TouchableOpacity
              key={lang}
              onPress={() => setLanguage(lang)}
              className={`rounded-full py-2 px-4 m-1 ${
                language === lang ? "bg-orange-400" : "border border-gray-300"
              }`}
            >
              <Text className={language === lang ? "text-white" : "text-black"}>
                {lang}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text className="text-lg font-bold mb-2">Ratings</Text>
        <View className="flex-row items-center mb-4">
          {[1, 2, 3, 4, 5].map((star) => (
            <TouchableOpacity key={star} onPress={() => setRating(star)}>
              <Ionicons
                name={star <= rating ? "star" : "star-outline"}
                size={24}
                color={star <= rating ? "#FFA500" : "#000"}
              />
            </TouchableOpacity>
          ))}
          <Text className="ml-2">{rating} & Above</Text>
        </View>

        <Text className="text-lg font-bold mb-2">Distance</Text>
        <Slider
          style={{ width: "100%", height: 40 }}
          minimumValue={0}
          maximumValue={50}
          value={distance}
          onValueChange={setDistance}
          minimumTrackTintColor="#FFA500"
          maximumTrackTintColor="#000000"
        />
        <Text className="text-right">{distance.toFixed(1)} km</Text>
        <View className="pb-32">
          <Text className="text-lg font-bold mb-2">Sort By</Text>
          <TouchableOpacity className="border border-gray-300 rounded-md py-2 px-4 flex-row justify-between items-center">
            <Text>Select sorting option</Text>
            <Ionicons name="chevron-down" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default FilterScreen;
