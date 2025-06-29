import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Ionicons, MaterialCommunityIcons, Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { useAppwrite } from "@/Context/useAppwrite";
import {
  usersDatabaseId,
  communitiesCollectionId,
  communityRulesCollectionId,
  avatarsBucketStorageId,
} from "@/constants/queryIdsExport";
import { Query } from "react-native-appwrite";
import * as ImagePicker from "expo-image-picker";

const ManageCommunities = () => {
  const insets = useSafeAreaInsets();
  const backgroundColor = useThemeColor({}, "background");
  const cardBackground = useThemeColor({}, "cardBackground");
  const textColor = useThemeColor({}, "text");
  const mutedTextColor = useThemeColor({}, "tint");
  const tintColor = useThemeColor({}, "tint");

  const {
    currentUser,
    getDocuments,
    createDocument,
    uploadFile,
    getFilePreview,
  } = useAppwrite();
  const [myCommunities, setMyCommunities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);
  // Create community states
  const [newCommunity, setNewCommunity] = useState({
    name: "",
    bio: "",
    community_profile: null,
  });
  const [creatingCommunity, setCreatingCommunity] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const createCommunitySheetRef = useRef(null);
  const manageCommunitySheetRef = useRef(null);
  const [selectedCommunity, setSelectedCommunity] = useState(null);

  const fetchMyCommunities = async () => {
    if (!currentUser) return;
    setLoading(true);
    try {
      const response = await getDocuments(
        usersDatabaseId,
        communitiesCollectionId,
        [Query.equal("created_by", currentUser.user_id)]
      );

      setMyCommunities(response || []);
    } catch (error) {
      console.error("Error fetching communities:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyCommunities();
  }, [currentUser]);

  const saveRule = async (communityId, ruleText) => {
    await createDocument(usersDatabaseId, communityRulesCollectionId, {
      communityId,
      rule: ruleText,
      created_by: currentUser?.user_id,
    });
  };

  const handleCreateCommunity = async () => {
    if (
      !newCommunity.name.trim() ||
      !newCommunity.bio.trim() ||
      !profilePicture
    ) {
      return;
    }
    let fileId = null;

    fileId = await uploadProfilePicture(profilePicture);
    if (!fileId) {
      Alert.alert("Upload Failed", "Please try uploading your image again.");
      return;
    }

    const filePreviewUrl = await getFilePreview(
      avatarsBucketStorageId,
      fileId,
      2000,
      2000
    );

    setCreatingCommunity(true);
    try {
      await createDocument(usersDatabaseId, communitiesCollectionId, {
        name: newCommunity.name,
        bio: newCommunity.bio,
        community_profile: filePreviewUrl,
        created_by: currentUser.user_id,
      });
      setNewCommunity({ name: "", bio: "", community_profile: null });
      createCommunitySheetRef.current?.close();
      fetchMyCommunities();
    } catch (error) {
      console.error("Error creating community:", error);
    } finally {
      setCreatingCommunity(false);
    }
  };

  const handleSelectCommunity = (community) => {
    setSelectedCommunity(community);
    manageCommunitySheetRef.current?.expand();
  };

  console.log("My Communities:", myCommunities);

  const filteredCommunities = myCommunities.filter((community) =>
    community.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const pickImage = async () => {
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

      const response = await uploadFile(
        avatarsBucketStorageId, // Your bucket ID for community images
        fileObject
      );

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

  return (
    <View
      className="flex-1"
      style={{
        backgroundColor,
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
      }}
    >
      {/* Header */}
      <View className="px-4 py-3 flex-row items-center justify-between">
        <TouchableOpacity
          className="p-2 rounded-full"
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color={textColor} />
        </TouchableOpacity>

        <Text className="text-lg font-bold" style={{ color: textColor }}>
          My Communities
        </Text>

        <TouchableOpacity
          className="p-2 rounded-full bg-orange-500"
          onPress={() => createCommunitySheetRef.current?.expand()}
        >
          <Ionicons name="add" size={24} color="white" />
        </TouchableOpacity>
      </View>

      {/* Search */}
      <View className="px-4 mb-4">
        <View className="flex-row items-center px-3 py-2 rounded-xl bg-gray-100 dark:bg-gray-800">
          <Ionicons name="search" size={20} color={mutedTextColor} />
          <TextInput
            className="flex-1 ml-2 text-base"
            placeholder="Search communities"
            placeholderTextColor={mutedTextColor}
            value={searchQuery}
            onChangeText={setSearchQuery}
            style={{ color: textColor }}
          />
          {searchQuery ? (
            <TouchableOpacity onPress={() => setSearchQuery("")}>
              <Ionicons name="close-circle" size={20} color={mutedTextColor} />
            </TouchableOpacity>
          ) : null}
        </View>
      </View>

      {/* Communities List */}
      <ScrollView className="flex-1 px-4">
        {loading ? (
          <View className="items-center justify-center py-10">
            <ActivityIndicator size="large" color={tintColor} />
          </View>
        ) : filteredCommunities.length > 0 ? (
          filteredCommunities.map((community) => (
            <TouchableOpacity
              key={community.$id}
              className="mb-4 p-4 rounded-2xl flex-row items-center"
              style={{ backgroundColor: cardBackground }}
              onPress={() => handleSelectCommunity(community)}
            >
              <Image
                source={{ uri: community.community_profile }}
                className="w-16 h-16 rounded-xl"
                defaultSource={require("@/assets/images/exchanGoLogo.jpg")}
              />

              <View className="flex-1 ml-3">
                <View className="flex-row items-center justify-between">
                  <Text
                    className="text-lg font-bold"
                    style={{ color: textColor }}
                  >
                    {community.name}
                  </Text>

                  <View className="flex-row items-center">
                    <TouchableOpacity className="p-2">
                      <Feather name="edit-2" size={18} color={tintColor} />
                    </TouchableOpacity>
                    <TouchableOpacity
                      className="p-2"
                      onPress={() =>
                        router.push({
                          pathname: "/community/[id]",
                          params: {
                            id: community.$id,
                            communityName: community.name,
                            bio: community.bio,
                          },
                        })
                      }
                    >
                      <Ionicons
                        name="open-outline"
                        size={18}
                        color={tintColor}
                      />
                    </TouchableOpacity>
                  </View>
                </View>

                <Text
                  numberOfLines={2}
                  className="text-sm mt-1"
                  style={{ color: mutedTextColor }}
                >
                  {community.bio}
                </Text>

                {/* Management Quick Actions */}
                <View className="flex-row mt-2">
                  <TouchableOpacity className="flex-row items-center mr-4">
                    <Ionicons
                      name="people-outline"
                      size={16}
                      color={mutedTextColor}
                    />
                    <Text
                      className="ml-1 text-xs"
                      style={{ color: mutedTextColor }}
                    >
                      Members
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity className="flex-row items-center mr-4">
                    <Ionicons
                      name="settings-outline"
                      size={16}
                      color={mutedTextColor}
                    />
                    <Text
                      className="ml-1 text-xs"
                      style={{ color: mutedTextColor }}
                    >
                      Settings
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity className="flex-row items-center">
                    <MaterialCommunityIcons
                      name="gavel"
                      size={16}
                      color={mutedTextColor}
                    />
                    <Text
                      className="ml-1 text-xs"
                      style={{ color: mutedTextColor }}
                    >
                      Rules
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          ))
        ) : (
          <View className="items-center justify-center py-20">
            <MaterialCommunityIcons
              name="account-group-outline"
              size={80}
              color={mutedTextColor}
            />
            <Text
              className="mt-4 text-center text-lg font-bold"
              style={{ color: textColor }}
            >
              No communities yet
            </Text>
            <Text
              className="mt-2 text-center px-10"
              style={{ color: mutedTextColor }}
            >
              Create your first community and start building your network
            </Text>
            <TouchableOpacity
              className="mt-6 px-6 py-3 rounded-xl bg-orange-500 flex-row items-center"
              onPress={() => createCommunitySheetRef.current?.expand()}
            >
              <Ionicons name="add-circle-outline" size={20} color="white" />
              <Text className="ml-2 text-white font-bold">
                Create Community
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>

      {/* Create Community Bottom Sheet */}
      <BottomSheet
        ref={createCommunitySheetRef}
        index={-1}
        snapPoints={["75%"]}
        enablePanDownToClose
        backgroundStyle={{ backgroundColor: cardBackground }}
      >
        <BottomSheetView className="flex-1 p-4">
          <Text
            className="text-xl font-bold mb-6 text-center"
            style={{ color: textColor }}
          >
            Create New Community
          </Text>

          {/* Community Image */}
          <View className="items-center mb-6">
            <TouchableOpacity
              className="w-24 h-24 rounded-xl items-center justify-center"
              style={{ backgroundColor: `${tintColor}20` }}
              onPress={pickImage}
              disabled={isUploading}
            >
              {profilePicture ? (
                <Image
                  source={{ uri: profilePicture }}
                  className="w-24 h-24 rounded-xl"
                />
              ) : isUploading ? (
                <ActivityIndicator size="small" color={tintColor} />
              ) : (
                <>
                  <Ionicons name="camera-outline" size={32} color={tintColor} />
                  <Text className="text-xs mt-1" style={{ color: tintColor }}>
                    Add Cover
                  </Text>
                </>
              )}
            </TouchableOpacity>
          </View>

          {/* Form Fields */}
          <View className="mb-4">
            <Text className="mb-2 font-medium" style={{ color: textColor }}>
              Community Name
            </Text>
            <TextInput
              className="p-3 rounded-xl bg-gray-100 dark:bg-gray-800 text-base"
              placeholder="Enter community name"
              placeholderTextColor={mutedTextColor}
              value={newCommunity.name}
              onChangeText={(text) =>
                setNewCommunity({ ...newCommunity, name: text })
              }
              style={{ color: textColor }}
            />
          </View>

          <View className="mb-6">
            <Text className="mb-2 font-medium" style={{ color: textColor }}>
              Description
            </Text>
            <TextInput
              className="p-3 rounded-xl bg-gray-100 dark:bg-gray-800 text-base"
              placeholder="What's this community about?"
              placeholderTextColor={mutedTextColor}
              value={newCommunity.bio}
              onChangeText={(text) =>
                setNewCommunity({ ...newCommunity, bio: text })
              }
              multiline
              numberOfLines={4}
              style={{
                color: textColor,
                height: 100,
                textAlignVertical: "top",
              }}
            />
          </View>

          {/* Actions */}
          <View className="flex-row space-x-3">
            <TouchableOpacity
              className="flex-1 py-3 rounded-xl items-center justify-center bg-gray-200 dark:bg-gray-700"
              onPress={() => createCommunitySheetRef.current?.close()}
            >
              <Text className="font-bold" style={{ color: textColor }}>
                Cancel
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="flex-1 py-3 rounded-xl items-center justify-center bg-orange-500"
              onPress={handleCreateCommunity}
              disabled={creatingCommunity}
            >
              {creatingCommunity ? (
                <ActivityIndicator size="small" color="white" />
              ) : (
                <Text className="font-bold text-white">Create Community</Text>
              )}
            </TouchableOpacity>
          </View>
        </BottomSheetView>
      </BottomSheet>

      {/* Manage Community Bottom Sheet */}
      <BottomSheet
        ref={manageCommunitySheetRef}
        index={-1}
        snapPoints={["65%"]}
        enablePanDownToClose
        backgroundStyle={{ backgroundColor: cardBackground }}
      >
        <BottomSheetView className="flex-1 p-4">
          {selectedCommunity && (
            <>
              <Text
                className="text-xl font-bold mb-6 text-center"
                style={{ color: textColor }}
              >
                Manage Community
              </Text>

              <View className="items-center mb-6">
                <Image
                  source={{ uri: selectedCommunity.community_profile }}
                  className="w-20 h-20 rounded-xl mb-2"
                  defaultSource={require("@/assets/images/exchanGoLogo.jpg")}
                />
                <Text
                  className="text-lg font-bold"
                  style={{ color: textColor }}
                >
                  {selectedCommunity.name}
                </Text>
              </View>

              {/* Management Options */}
              <TouchableOpacity className="flex-row items-center p-4 mb-2 rounded-xl bg-gray-100 dark:bg-gray-800">
                <Ionicons name="people" size={24} color={tintColor} />
                <View className="ml-3 flex-1">
                  <Text className="font-medium" style={{ color: textColor }}>
                    Manage Members
                  </Text>
                  <Text className="text-sm" style={{ color: mutedTextColor }}>
                    Add, remove, or change member roles
                  </Text>
                </View>
                <Ionicons
                  name="chevron-forward"
                  size={20}
                  color={mutedTextColor}
                />
              </TouchableOpacity>

              <TouchableOpacity className="flex-row items-center p-4 mb-2 rounded-xl bg-gray-100 dark:bg-gray-800">
                <MaterialCommunityIcons
                  name="gavel"
                  size={24}
                  color={tintColor}
                />
                <View className="ml-3 flex-1">
                  <Text className="font-medium" style={{ color: textColor }}>
                    Community Rules
                  </Text>
                  <Text className="text-sm" style={{ color: mutedTextColor }}>
                    Set guidelines for your community
                  </Text>
                </View>
                <Ionicons
                  name="chevron-forward"
                  size={20}
                  color={mutedTextColor}
                />
              </TouchableOpacity>

              <TouchableOpacity className="flex-row items-center p-4 mb-2 rounded-xl bg-gray-100 dark:bg-gray-800">
                <Ionicons name="settings" size={24} color={tintColor} />
                <View className="ml-3 flex-1">
                  <Text className="font-medium" style={{ color: textColor }}>
                    Community Settings
                  </Text>
                  <Text className="text-sm" style={{ color: mutedTextColor }}>
                    Privacy, notifications, and more
                  </Text>
                </View>
                <Ionicons
                  name="chevron-forward"
                  size={20}
                  color={mutedTextColor}
                />
              </TouchableOpacity>

              <TouchableOpacity className="flex-row items-center p-4 mb-6 rounded-xl bg-gray-100 dark:bg-gray-800">
                <Feather name="edit" size={24} color={tintColor} />
                <View className="ml-3 flex-1">
                  <Text className="font-medium" style={{ color: textColor }}>
                    Edit Community
                  </Text>
                  <Text className="text-sm" style={{ color: mutedTextColor }}>
                    Change name, description, or image
                  </Text>
                </View>
                <Ionicons
                  name="chevron-forward"
                  size={20}
                  color={mutedTextColor}
                />
              </TouchableOpacity>

              <TouchableOpacity
                className="py-3 rounded-xl items-center justify-center"
                style={{ backgroundColor: "#ff3b30" }}
              >
                <Text className="font-bold text-white">Delete Community</Text>
              </TouchableOpacity>
            </>
          )}
        </BottomSheetView>
      </BottomSheet>
    </View>
  );
};

export default ManageCommunities;
