import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Modal,
  StatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { currentUser } from "@/data/users";
import { getUserSkills } from "@/utils/databasefunctions";
import { userSkills } from "@/data/userSkills";
import { connectedUsers } from "@/data/userConnection";
import { getUserTools } from "@/data/ToolsUsed";
import { UserWorksUpload } from "@/data/userWorks";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useRouter } from "expo-router";

const MainUserProfile = () => {
  // Theme colors
  const backgroundColor = useThemeColor({}, "background");
  const textColor = useThemeColor({}, "text");
  const tintText = useThemeColor({}, "tintText");
  const cardBackground = useThemeColor({}, "cardBackground");
  const tintColor = useThemeColor({}, "tint");

  const router = useRouter();
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);

  // Data fetching
  const skills = getUserSkills(currentUser.id, userSkills);
  const connectedUser =
    connectedUsers.find((connected) => connected.userId === currentUser.id) ||
    {};
  const connectedCount = connectedUser.connectedFollowers?.length || 0;
  const swappedCount = connectedUser.swappedWith?.length || 0;
  const userToolsList = getUserTools(currentUser.id);

  // Sort works by date
  const currentUserWorks = UserWorksUpload.filter(
    (work) => work.uploaderId === currentUser.id
  ).sort((a, b) => new Date(a.uploadedAt) - new Date(b.uploadedAt));

  const insets = useSafeAreaInsets();

  // Video handling
  const handleVideoPress = (videoUri) => {
    setSelectedVideo(videoUri);
    setModalVisible(true);
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: backgroundColor,
        paddingTop: insets.top,
      }}
    >
      <StatusBar
        barStyle={backgroundColor === "#fff" ? "dark-content" : "light-content"}
      />

      {/* Header */}
      <View className="px-4 py-3 flex-row items-center justify-between border-b border-gray-200 dark:border-gray-800">
        <TouchableOpacity
          className="p-2 rounded-full"
          onPress={() => router.back()}
          style={{ backgroundColor: `${tintColor}10` }}
        >
          <Ionicons name="arrow-back" size={22} color={tintColor} />
        </TouchableOpacity>

        <Text className="font-JakartaBold text-lg" style={{ color: textColor }}>
          My Profile
        </Text>

        <TouchableOpacity
          className="p-2 rounded-full"
          style={{ backgroundColor: `${tintColor}10` }}
        >
          <Ionicons name="settings-outline" size={22} color={tintColor} />
        </TouchableOpacity>
      </View>

      <ScrollView
        className="flex-1"
        style={{ backgroundColor: backgroundColor }}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Banner and Info Section */}
        <View className="mb-6">
          {/* Banner Image */}
          <View className="h-32 w-full bg-gray-200 dark:bg-gray-800" />

          {/* Profile Picture */}
          <View className="px-5 mt-[-50px]">
            <Image
              source={{ uri: currentUser.profileImage }}
              className="h-[100px] w-[100px] rounded-full border-4"
              style={{ borderColor: backgroundColor }}
            />
          </View>

          {/* Name and Skills */}
          <View className="px-5 mt-2">
            <Text
              className="font-JakartaBold text-xl mb-1"
              style={{ color: textColor }}
            >
              {currentUser.name}
            </Text>

            <View className="flex-row flex-wrap mb-4">
              {skills.map((skill, index) => (
                <React.Fragment key={skill}>
                  <Text
                    className="font-JakartaMedium text-sm"
                    style={{ color: tintText }}
                  >
                    {skill}
                  </Text>
                  {index < skills.length - 1 && (
                    <Text
                      className="mx-2 font-JakartaMedium text-sm"
                      style={{ color: tintText }}
                    >
                      •
                    </Text>
                  )}
                </React.Fragment>
              ))}
            </View>
          </View>

          {/* Stats Cards */}
          <View className="flex-row justify-center px-5 mb-4">
            <View
              className="flex-1 mr-3 p-4 rounded-xl items-center"
              style={{ backgroundColor: cardBackground }}
            >
              <Text
                className="font-JakartaBold text-2xl"
                style={{ color: tintColor }}
              >
                {connectedCount}
              </Text>
              <Text
                className="font-JakartaMedium text-sm"
                style={{ color: tintText }}
              >
                Connected
              </Text>
            </View>

            <View
              className="flex-1 ml-3 p-4 rounded-xl items-center"
              style={{ backgroundColor: cardBackground }}
            >
              <Text
                className="font-JakartaBold text-2xl"
                style={{ color: tintColor }}
              >
                {swappedCount}
              </Text>
              <Text
                className="font-JakartaMedium text-sm"
                style={{ color: tintText }}
              >
                Swapped
              </Text>
            </View>
          </View>

          {/* Action Buttons */}
          <View className="flex-row justify-between px-5">
            <TouchableOpacity
              className="flex-1 mr-2 py-3 rounded-full flex-row justify-center items-center"
              style={{ backgroundColor: tintColor }}
            >
              <Ionicons
                name="pencil"
                size={18}
                color="#FFF"
                style={{ marginRight: 6 }}
              />
              <Text className="font-JakartaSemiBold text-white">
                Edit Profile
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="flex-1 ml-2 py-3 rounded-full flex-row justify-center items-center"
              style={{ backgroundColor: `${tintColor}20` }}
            >
              <Ionicons
                name="cloud-upload-outline"
                size={18}
                color={tintColor}
                style={{ marginRight: 6 }}
              />
              <Text
                className="font-JakartaSemiBold"
                style={{ color: tintColor }}
              >
                Upload Work
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* About Section */}
        <View
          className="mx-5 p-4 rounded-xl mb-6"
          style={{ backgroundColor: cardBackground }}
        >
          <Text
            className="font-JakartaBold text-lg mb-2"
            style={{ color: textColor }}
          >
            About
          </Text>
          <Text
            className="font-JakartaMedium text-sm leading-5"
            style={{ color: tintText }}
          >
            {currentUser.bio ||
              "No bio available yet. Add something about yourself by editing your profile."}
          </Text>
        </View>

        {/* Tools Section */}
        <View className="mx-5 mb-6">
          <View className="flex-row justify-between items-center mb-3">
            <Text
              className="font-JakartaBold text-lg"
              style={{ color: textColor }}
            >
              Tools & Software
            </Text>
            <TouchableOpacity>
              <Text
                className="font-JakartaMedium text-sm"
                style={{ color: tintColor }}
              >
                Edit
              </Text>
            </TouchableOpacity>
          </View>

          <View className="flex-row flex-wrap">
            {userToolsList.map((tool, index) => (
              <View
                key={index}
                className="mr-2 mb-2 px-3 py-2 rounded-lg"
                style={{ backgroundColor: `${tintColor}15` }}
              >
                <Text
                  className="font-JakartaMedium text-sm"
                  style={{ color: tintColor }}
                >
                  {tool.toolName}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Works Section */}
        <View className="mx-5 mb-8">
          <View className="flex-row justify-between items-center mb-3">
            <Text
              className="font-JakartaBold text-lg"
              style={{ color: textColor }}
            >
              Portfolio
            </Text>
            <TouchableOpacity>
              <Text
                className="font-JakartaMedium text-sm"
                style={{ color: tintColor }}
              >
                See All
              </Text>
            </TouchableOpacity>
          </View>

          <View className="flex-row flex-wrap justify-between">
            {currentUserWorks.map((work) => (
              <TouchableOpacity
                key={work.id}
                className="mb-4 rounded-2xl overflow-hidden"
                style={{ width: "48%" }}
                onPress={() =>
                  work.type === "video" && handleVideoPress(work.uploadWork)
                }
              >
                <Image
                  source={{
                    uri:
                      work.type === "video" ? work.thumbnail : work.uploadWork,
                  }}
                  className="w-full h-[120px]"
                />

                {work.type === "video" && (
                  <View className="absolute inset-0 flex items-center justify-center">
                    <View className="bg-black/30 h-10 w-10 rounded-full items-center justify-center">
                      <Ionicons name="play" size={20} color="#FFF" />
                    </View>
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Video Modal */}
      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View className="flex-1 bg-black/90 justify-center items-center">
          <View className="w-full h-[40%] items-center justify-center">
            {/* Replace with actual Video component */}
            <View className="bg-gray-800 w-[90%] h-[250px] rounded-lg items-center justify-center">
              <Text className="text-white">Video Player Here</Text>
            </View>
          </View>

          <TouchableOpacity
            onPress={() => setModalVisible(false)}
            className="mt-6 bg-white/20 py-2 px-6 rounded-full"
          >
            <Text className="text-white font-JakartaMedium">Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

export default MainUserProfile;
