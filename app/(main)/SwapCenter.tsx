import React, { useRef, useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { Ionicons, FontAwesome, Feather } from "@expo/vector-icons";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ConnectionCard } from "@/components/SwapConnect";
import BottomSheet, {
  BottomSheetModal,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import FilterScreen from "@/components/FilterBottomitems";
import { UserRating } from "@/data/userRating";
import { userSkills } from "@/data/userSkills";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  Easing,
} from "react-native-reanimated";
import {
  usersConnectionsCollectionId,
  usersDatabaseId,
  ratingsCollectionId,
} from "@/constants/queryIdsExport";
import {
  categories,
  getDistanceFromLatLonInKm,
  NEARBY_RADIUS_KM,
} from "../../utils/SwapCenterUtils";
import { useUsersStore, User } from "../../stores/useUsersStore";
import { useAuthStore } from "../../stores/useAuthStore";
import { useAppwrite } from "../../Context/useAppwrite";
import { Query } from "react-native-appwrite";

const SwapCenter = () => {
  const backgroundColor = useThemeColor({}, "background");
  const textColor = useThemeColor({}, "text");
  const tintText = useThemeColor({}, "tintText");
  const cardBackground = useThemeColor({}, "cardBackground");
  const tintColor = useThemeColor({}, "tint");
  const insets = useSafeAreaInsets();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const filterSheetBottomSheetRef = useRef<BottomSheetModal>(null);
  const searchScale = useSharedValue(1);
  const headerOpacity = useSharedValue(1);
  const {
    getAllUsers,
    currentUser: appwriteCurrentUser,
    getDocuments,
  } = useAppwrite();
  const users = useUsersStore((state: any) => state.users);
  const setUsers = useUsersStore((state: any) => state.setUsers);
  const currentUser = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);
  const [connectedUsers, setConnectedUsers] = useState<User[]>([]);
  const [connections, setConnections] = useState<any[]>([]);
  const [ratings, setRatings] = useState<any[]>([]);

  useEffect(() => {
    const fetchConnections = async () => {
      if (!currentUser?.$id) return;
      try {
        const connectionsRes = await getDocuments(
          usersDatabaseId,
          usersConnectionsCollectionId,
          [
            Query.or([
              Query.equal("connector_user_id", currentUser.$id),
              Query.equal("connect_with_user_id", currentUser.$id),
            ]),
            Query.equal("user_accept_connection", true),
            Query.limit(1000),
          ]
        );
        setConnections(connectionsRes); // Store all connection docs
      } catch (err) {
        setConnections([]);
      }
    };
    fetchConnections();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser, users]);

  useEffect(() => {
    const fetchConnections = async () => {
      if (!currentUser?.$id) return;
      try {
        // Get all connections where the current user is either connector or connectee, and accepted
        const connections = await getDocuments(
          usersDatabaseId,
          usersConnectionsCollectionId,
          [
            // Get all connections where current user is involved and accepted
            Query.or([
              Query.equal("connector_user_id", currentUser.$id),
              Query.equal("connect_with_user_id", currentUser.$id),
            ]),
            Query.equal("user_accept_connection", true),
            Query.limit(1000),
          ]
        );

        // Get all user IDs the current user is connected with
        const otherUserIds = connections
          .map((conn: { connector_user_id: any; connect_with_user_id: any }) =>
            conn.connector_user_id === currentUser.$id
              ? conn.connect_with_user_id
              : conn.connector_user_id
          )
          // Remove duplicates
          .filter(
            (id: any, idx: any, arr: string | any[]) => arr.indexOf(id) === idx
          );

        // Get all users from the store that match these IDs
        const allUsers = useUsersStore.getState().users;
        const connected = allUsers.filter((user) =>
          otherUserIds.includes(user.user_id)
        );
        setConnectedUsers(connected);
      } catch (err) {
        setConnectedUsers([]);
      }
    };
    fetchConnections();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser, users]);

  useEffect(() => {
    if (appwriteCurrentUser) setUser(appwriteCurrentUser);
  }, [appwriteCurrentUser, setUser]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersRes = await getAllUsers();
        setUsers(usersRes.documents || []);
      } catch (err) {
        // handle error
      }
    };
    fetchUsers();
  }, [getAllUsers, setUsers]);

  useEffect(() => {
    const fetchRatings = async () => {
      try {
        const ratingsRes = await getDocuments(
          usersDatabaseId,
          ratingsCollectionId,
          [Query.limit(1000)]
        );
        setRatings(ratingsRes); // or ratingsRes.documents if your getDocuments returns {documents: [...]}
      } catch (err) {
        setRatings([]);
      }
    };
    fetchRatings();
  }, [getDocuments]);

  const handlePresentFilterModalPress = () => {
    filterSheetBottomSheetRef.current?.expand();
  };

  const filteredUsers = users
    .filter((user: User) => user?.$id !== currentUser?.$id)
    .filter((user: User) => {
      const fullName = [user.first_name, user.middle_name, user.last_name]
        .filter(Boolean)
        .join(" ");
      const matchesSearch = fullName
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

      const matchesFilter =
        selectedFilter === "all" ||
        (selectedFilter === "featured" && user?.featured) ||
        (selectedFilter === "nearby" &&
          typeof user.latitude === "number" &&
          typeof user.longitude === "number" &&
          typeof currentUser?.latitude === "number" &&
          typeof currentUser?.longitude === "number" &&
          getDistanceFromLatLonInKm(
            currentUser.latitude,
            currentUser.longitude,
            user.latitude,
            user.longitude
          ) <= NEARBY_RADIUS_KM) ||
        (selectedFilter === "skilled" &&
          "rating" in user &&
          typeof user?.rating === "number" &&
          user?.rating > 4);

      return matchesSearch && matchesFilter;
    });

  const handleSearchFocus = () => {
    setIsSearchFocused(true);
    searchScale.value = withSpring(1.02);
    headerOpacity.value = withTiming(0.8);
  };

  const handleSearchBlur = () => {
    setIsSearchFocused(false);
    searchScale.value = withSpring(1);
    headerOpacity.value = withTiming(1);
  };

  const searchAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: searchScale.value }],
  }));

  const headerAnimatedStyle = useAnimatedStyle(() => ({
    opacity: headerOpacity.value,
  }));

  const CategoryFilter = () => (
    <View className="mb-6">
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={categories}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingHorizontal: 16 }}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            onPress={() => setSelectedFilter(item.id)}
            className={`mr-3 px-4 py-2 rounded-full flex-row items-center ${
              selectedFilter === item.id ? "shadow-lg" : ""
            }`}
            style={{
              backgroundColor:
                selectedFilter === item.id ? item.color : cardBackground,
              shadowColor: selectedFilter === item.id ? item.color : "#000",
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: selectedFilter === item.id ? 0.3 : 0.1,
              shadowRadius: 8,
              elevation: selectedFilter === item.id ? 8 : 2,
            }}
          >
            <Feather
              name={item.icon as React.ComponentProps<typeof Feather>["name"]}
              size={16}
              color={selectedFilter === item.id ? "white" : tintText}
            />
            <Text
              className={`ml-2 font-semibold ${
                selectedFilter === item.id ? "text-white" : ""
              }`}
              style={{
                color: selectedFilter === item.id ? "white" : textColor,
              }}
            >
              {item.name}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );

  const QuickStats = () => (
    <View className="flex-row px-2 mb-4">
      <View className="flex-1 mr-2" style={{ backgroundColor: cardBackground }}>
        <View className="p-4 rounded-2xl">
          <View className="flex-row items-center justify-between mb-2">
            <Text style={{ color: textColor }} className="text-lg font-bold">
              {filteredUsers.length}
            </Text>
            <Ionicons name="people" size={20} color={tintColor} />
          </View>
          <Text style={{ color: tintText }} className="text-xs">
            Available Swappers
          </Text>
        </View>
      </View>

      <View className="flex-1 ml-2" style={{ backgroundColor: cardBackground }}>
        <View className="p-4 rounded-2xl">
          <View className="flex-row items-center justify-between mb-2">
            <Text style={{ color: textColor }} className="text-lg font-bold">
              {connectedUsers.length}
            </Text>
            <Ionicons name="link" size={20} color={tintColor} />
          </View>
          <Text style={{ color: tintText }} className="text-xs">
            Your Connections
          </Text>
        </View>
      </View>
    </View>
  );

  const EmptyState = () => (
    <View className="flex-1 justify-center items-center px-8">
      <Ionicons name="search" size={64} color={tintText} />
      <Text
        style={{ color: textColor }}
        className="text-xl font-bold mt-4 mb-2"
      >
        No results found
      </Text>
      <Text style={{ color: tintText }} className="text-center">
        Try adjusting your search terms or filters to find more swappers
      </Text>
    </View>
  );

  return (
    <>
      <View style={{ flex: 1, backgroundColor, paddingTop: insets.top }}>
        {/* Header */}
        <Animated.View
          style={[
            {
              paddingHorizontal: 16,
              paddingBottom: 16,
              backgroundColor,
            },
            headerAnimatedStyle,
          ]}
        >
          <View className="flex-row justify-between items-center mb-4">
            <View>
              <Text style={{ color: textColor }} className="text-2xl font-bold">
                Swap Center
              </Text>
              <Text style={{ color: tintText }} className="text-sm">
                Connect with skilled swappers nearby
              </Text>
            </View>
            <View className="flex-row space-x-3">
              <TouchableOpacity
                onPress={handlePresentFilterModalPress}
                className="p-2 rounded-full"
                style={{ backgroundColor: cardBackground }}
              >
                <FontAwesome name="filter" size={20} color={textColor} />
              </TouchableOpacity>
              <TouchableOpacity
                className="p-2 rounded-full"
                style={{ backgroundColor: cardBackground }}
              >
                <MaterialCommunityIcons
                  name="dots-vertical"
                  size={20}
                  color={textColor}
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Enhanced Search Bar */}
          <Animated.View style={searchAnimatedStyle}>
            <View
              className="flex-row items-center px-4 py-3 rounded-xl"
              style={{
                backgroundColor: cardBackground,
                borderWidth: isSearchFocused ? 2 : 1,
                borderColor: isSearchFocused ? tintColor : "#E5E7EB",
              }}
            >
              <Ionicons
                name="search"
                size={20}
                color={isSearchFocused ? tintColor : tintText}
              />
              <TextInput
                className="flex-1 ml-3 text-base"
                style={{ color: textColor }}
                placeholder="Search swappers by name or skill..."
                placeholderTextColor={tintText}
                value={searchQuery}
                onChangeText={setSearchQuery}
                onFocus={handleSearchFocus}
                onBlur={handleSearchBlur}
              />
              {searchQuery.length > 0 && (
                <TouchableOpacity onPress={() => setSearchQuery("")}>
                  <Ionicons name="close-circle" size={20} color={tintText} />
                </TouchableOpacity>
              )}
            </View>
          </Animated.View>
        </Animated.View>

        {/* Category Filters */}
        <CategoryFilter />

        {/* Quick Stats */}
        <QuickStats />

        {/* Main Content */}
        <View className="flex-1 px-4">
          {filteredUsers.length > 0 ? (
            <FlatList
              data={filteredUsers}
              renderItem={({ item, index }) => (
                <ConnectionCard
                  user={item}
                  connectedUsers={connections}
                  ratings={UserRating}
                  userSkill={userSkills}
                  index={index}
                />
              )}
              keyExtractor={(item) => item.$id}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: 120 }}
              scrollEventThrottle={16}
              ItemSeparatorComponent={() => <View className="h-3" />}
            />
          ) : (
            <EmptyState />
          )}
        </View>
      </View>

      <BottomSheet
        ref={filterSheetBottomSheetRef}
        index={-1}
        snapPoints={["50%", "70%", "80%", "90%"]}
        animationConfigs={{
          duration: 800,
          easing: Easing.elastic(1),
        }}
        enablePanDownToClose={true}
      >
        <BottomSheetView
          className="flex-1"
          style={{ backgroundColor: backgroundColor }}
        >
          <FilterScreen />
        </BottomSheetView>
      </BottomSheet>
    </>
  );
};

export default SwapCenter;
