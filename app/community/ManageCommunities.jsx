import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Ionicons, MaterialCommunityIcons, Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { useRef } from "react";
import { useAppwrite } from "@/Context/useAppwrite";
import { useUsersStore } from "@/stores/useUsersStore";
import {
  usersDatabaseId,
  communitiesCollectionId,
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

  // Create community states
  const [newCommunity, setNewCommunity] = useState({
    name: "",
    bio: "",
    community_profile: null,
  });
  const [creatingCommunity, setCreatingCommunity] = useState(false);
  const [imageUploading, setImageUploading] = useState(false);

  // Bottom sheet refs
  const createCommunitySheetRef = useRef(null);
  const manageCommunitySheetRef = useRef(null);
  const [selectedCommunity, setSelectedCommunity] = useState(null);

  useEffect(() => {
    fetchMyCommunities();
  }, [currentUser]);

  const fetchMyCommunities = async () => {
    if (!currentUser) return;
    setLoading(true);
    try {
      const response = await getDocuments(
        usersDatabaseId,
        communitiesCollectionId,
        [Query.equal("created_by", currentUser.user_id)]
      );
      setMyCommunities(response.documents || []);
    } catch (error) {
      console.error("Error fetching communities:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateCommunity = async () => {
    if (
      !newCommunity.name.trim() ||
      !newCommunity.bio.trim() ||
      !newCommunity.community_profile
    ) {
      return;
    }

    setCreatingCommunity(true);
    try {
      await createDocument(usersDatabaseId, communitiesCollectionId, {
        name: newCommunity.name,
        bio: newCommunity.bio,
        community_profile: newCommunity.community_profile,
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

  const filteredCommunities = myCommunities.filter((community) =>
    community.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled && result.assets && result.assets[0]) {
      setImageUploading(true);
      try {
        // Get image URI
        const imageUri = result.assets[0].uri;

        // Get image name from URI
        const imageName = imageUri.substring(imageUri.lastIndexOf("/") + 1);

        // For React Native, we need to fetch the image as blob first
        const response = await fetch(imageUri);
        const blob = await response.blob();

        // Upload image to Appwrite Storage
        // Replace 'community_images' with your actual bucket ID
        const uploadedFile = await uploadFile(
          "community_images", // Your bucket ID for community images
          blob,
          [`read("role:all")`, `write("user:${currentUser.$id}")`] // Set permissions
        );

        // Get the file preview URL
        const filePreviewUrl = await getFilePreview(
          "community_images", // Your bucket ID
          uploadedFile.$id,
          2000, // Width
          2000 // Height
        );

        // Update state with the image URL
        setNewCommunity({
          ...newCommunity,
          community_profile: filePreviewUrl, // Store the URL
          image_id: uploadedFile.$id, // Store ID for future reference
        });
      } catch (error) {
        console.error("Error uploading image:", error);
        // Show error to user (optional)
        alert("Failed to upload image. Please try again.");
      } finally {
        setImageUploading(false);
      }
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
              disabled={imageUploading}
            >
              {newCommunity.community_profile ? (
                <Image
                  source={{ uri: newCommunity.community_profile }}
                  className="w-24 h-24 rounded-xl"
                />
              ) : imageUploading ? (
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
