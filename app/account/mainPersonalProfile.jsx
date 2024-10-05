import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Modal,
} from "react-native";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { imageDataURL } from "../../constants/ImageData";
import { currentUser } from "../../data/users";
import { getUserSkills } from "../../utils/databasefunctions";
import { userSkills } from "../../data/userSkills";
import { connectedUsers } from "../../data/userConnection";
import { Video } from "expo-av"; // Import the Video component from expo-av
import { useVideoPlayer, VideoView } from "expo-video";
import { tools, getUserTools } from "../../data/ToolsUsed";
import { UserWorksUpload } from "../../data/userWorks";

const mainUserProfile = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const skills = getUserSkills(currentUser.id, userSkills); // Call the function to get skills
  const connectedUser =
    connectedUsers.find((connected) => connected.userId === currentUser.id) ||
    {}; // Fallback to an empty object if not found
  const connectedCount = connectedUser.connectedFollowers
    ? connectedUser.connectedFollowers.length
    : 0;
  const swappedCount = connectedUser.swappedWith
    ? connectedUser.swappedWith.length
    : 0;

  const userToolsList = getUserTools(currentUser.id); // Call the function to get the list of tools

  const insets = useSafeAreaInsets();

  // Filter and sort the works data to show only the current user's uploads, sorted by uploadedAt date (oldest to most recent)
  const currentUserWorks = UserWorksUpload.filter(
    (work) => work.uploaderId === currentUser.id
  ).sort((a, b) => new Date(a.uploadedAt) - new Date(b.uploadedAt));

  // Function to handle video thumbnail click
  const handleVideoPress = (videoUri) => {
    setSelectedVideo(videoUri);
    setModalVisible(true);
  };

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
        <View style={{ alignItems: "flex-start", paddingLeft: 16 }}>
          <Image
            source={{ uri: currentUser.profileImage }}
            style={{ width: 100, height: 100, borderRadius: 50 }}
          />
        </View>
        <View className="flex-row items-center">
          {/* Profile Picture and Info */}
          <View style={{ alignItems: "flex-start", paddingLeft: 16 }}>
            <Text style={{ fontSize: 17, fontWeight: "bold" }}>
              {currentUser.name}
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
              paddingHorizontal: 20,
              paddingBottom: 32,
            }}
          >
            <View
              style={{
                alignItems: "center",
                backgroundColor: "#fbfbfb",
                width: 110,
                height: 80,
                justifyContent: "center",
                borderRadius: 8,
                borderColor: "#A9A9A9",
                borderWidth: 1,
              }}
            >
              <Text
                style={{ fontSize: 20, fontWeight: "bold", color: "black" }}
              >
                {connectedCount}
              </Text>
              <Text style={{ fontSize: 14, color: "#000" }}>Connected</Text>
            </View>
            <View
              style={{
                alignItems: "center",
                backgroundColor: "#fbfbfb",
                width: 110,
                height: 80,
                justifyContent: "center",
                borderRadius: 8,
                marginLeft: 10,
                borderColor: "#A9A9A9",
                borderWidth: 1,
              }}
            >
              <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                {swappedCount}
              </Text>
              <Text style={{ fontSize: 14, color: "#000" }}>Swapped</Text>
            </View>
          </View>
        </View>

        {/* Connect and Message Buttons */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <TouchableOpacity
            style={{
              backgroundColor: "#000",
              paddingHorizontal: 32,
              paddingVertical: 12,
              borderRadius: 24,
              marginRight: 16,
              alignItems: "center",
              width: 180,
            }}
          >
            <Text
              className="font-JakartaSemiBold"
              style={{ color: "#FFF", fontSize: 14 }}
            >
              Edit Profile
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: "#000",
              paddingHorizontal: 32,
              paddingVertical: 12,
              borderRadius: 24,
              alignItems: "center",
              width: 180,
            }}
          >
            <Text
              className="font-JakartaSemiBold"
              style={{ color: "#FFF", fontSize: 14 }}
            >
              Upload
            </Text>
          </TouchableOpacity>
        </View>

        {/* About Section */}
        <View style={{ paddingHorizontal: 16, marginVertical: 16 }}>
          <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 8 }}>
            About
          </Text>
          <Text
            className="font-JakartaSemiBold"
            style={{ fontSize: 14, color: "#444" }}
          >
            {currentUser.bio}
          </Text>
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
            {userToolsList.map((tool, index) => (
              <View
                key={index}
                style={{
                  backgroundColor: "#F3F4F6",
                  paddingHorizontal: 8,
                  paddingVertical: 8,
                  borderRadius: 8,
                  margin: 4,
                }}
              >
                <Text className="font-JakartaSemiBold" style={{ fontSize: 13 }}>
                  {tool.toolName}
                </Text>
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
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "space-between",
            }}
          >
            {currentUserWorks.map((work, index) => (
              <View key={work.id} style={{ marginBottom: 16 }}>
                {work.type === "image" ? (
                  <Image
                    source={{ uri: work.uploadWork }}
                    style={{
                      width: 180,
                      height: 130,
                      borderRadius: 12,
                    }}
                  />
                ) : (
                  <TouchableOpacity
                    onPress={() => handleVideoPress(work.uploadWork)}
                  >
                    <Image
                      source={{ uri: work.thumbnail }} // Render the thumbnail for video
                      style={{
                        width: 180,
                        height: 130,
                        borderRadius: 12,
                      }}
                    />
                  </TouchableOpacity>
                )}
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Video
            source={{ uri: selectedVideo }}
            rate={1.0}
            volume={1.0}
            isMuted={false}
            resizeMode="contain"
            shouldPlay
            style={{ width: "90%", height: 300 }}
          />
          <TouchableOpacity
            onPress={() => setModalVisible(false)}
            style={{ marginTop: 20 }}
          >
            <Text style={{ color: "#fff", fontSize: 18 }}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

export default mainUserProfile;
