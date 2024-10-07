import React from "react";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { imageDataURL } from "../../constants/ImageData";
import { useLocalSearchParams } from "expo-router";
import { getUserSkills } from "../../utils/databasefunctions";
import { userSkills } from "../../data/userSkills";
import { getUserTools } from "../../data/ToolsUsed";

const ProfileScreen = () => {
  const insets = useSafeAreaInsets();
  const {
    userId,
    userName,
    bio,
    rating,
    connectedFollowers,
    swappedWith,
    profileImage,
  } = useLocalSearchParams();

  const skills = getUserSkills(userId, userSkills); // Call the function to get skills
  const tools = getUserTools(userId); // Call the function to get tools

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#fff",
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
      }}
    >
      <ScrollView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
        {/* Header */}
        <View
          style={{ padding: 16, flexDirection: "row", alignItems: "center" }}
        >
          <TouchableOpacity>
            <Ionicons name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>
          <View style={{ flex: 1, alignItems: "center" }}>
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>Profile</Text>
          </View>
          <TouchableOpacity>
            <Ionicons name="ellipsis-vertical" size={24} color="#000" />
          </TouchableOpacity>
        </View>

        {/* Profile Picture and Info */}
        <View style={{ alignItems: "center", paddingVertical: 24 }}>
          <Image
            source={{ uri: profileImage }}
            style={{ width: 100, height: 100, borderRadius: 50 }}
          />
          <Text style={{ fontSize: 24, fontWeight: "bold", marginTop: 12 }}>
            {userName}
          </Text>
          <View className="flex-row justify-evenly ">
            {skills.length > 0 && (
              <>
                <Text>{skills[0]}</Text>
                {skills.length > 1 && (
                  <>
                    <Text
                      className="mr-3 ml-3"
                      style={{ fontSize: 14, color: "#888" }}
                    >
                      |
                    </Text>
                    {skills.slice(1, -1).map((skill) => (
                      <Text key={skill}>{skill}</Text>
                    ))}
                  </>
                )}
              </>
            )}
          </View>
        </View>

        {/* Connections and Swaps */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            paddingHorizontal: 32,
            paddingVertical: 16,
          }}
        >
          <View style={{ alignItems: "center" }}>
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>
              {connectedFollowers}
            </Text>
            <Text style={{ fontSize: 14, color: "#888" }}>Connected</Text>
          </View>
          <View style={{ alignItems: "center" }}>
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>
              {swappedWith}
            </Text>
            <Text style={{ fontSize: 14, color: "#888" }}>Swapped</Text>
          </View>
        </View>

        {/* Connect and Message Buttons */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginVertical: 16,
          }}
        >
          <TouchableOpacity
            style={{
              backgroundColor: "#F79E1B",
              paddingHorizontal: 32,
              paddingVertical: 12,
              borderRadius: 24,
              marginRight: 16,
            }}
          >
            <Text style={{ color: "#FFF", fontSize: 16 }}>Connect</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: "#000",
              paddingHorizontal: 32,
              paddingVertical: 12,
              borderRadius: 24,
            }}
          >
            <Text style={{ color: "#FFF", fontSize: 16 }}>Message</Text>
          </TouchableOpacity>
        </View>

        {/* About Section */}
        <View style={{ paddingHorizontal: 16, marginVertical: 16 }}>
          <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 8 }}>
            About
          </Text>
          <Text style={{ fontSize: 14, color: "#444" }}>{bio}</Text>
        </View>

        {/* Tools Section */}
        <View style={{ paddingHorizontal: 16, marginVertical: 16 }}>
          <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 8 }}>
            Tools
          </Text>
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              marginVertical: 8,
            }}
          >
            {tools.map((tool, index) => (
              <View
                key={index}
                style={{
                  backgroundColor: "#F3F4F6",
                  paddingHorizontal: 5,
                  paddingVertical: 8,
                  borderRadius: 8,
                  margin: 4,
                }}
              >
                <Text style={{ fontSize: 14 }}>{tool.toolName}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Works Section */}
        <View style={{ paddingHorizontal: 16, marginVertical: 16 }}>
          <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 8 }}>
            Works
          </Text>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Image
              source={{ uri: imageDataURL[9] }}
              style={{
                width: 150,
                height: 100,
                borderRadius: 12,
                marginRight: 8,
              }}
            />
            <Image
              source={{ uri: imageDataURL[10] }}
              style={{ width: 150, height: 100, borderRadius: 12 }}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default ProfileScreen;
