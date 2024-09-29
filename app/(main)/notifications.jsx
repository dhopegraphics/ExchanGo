import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  Switch,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useThemeColor } from "@/hooks/useThemeColor";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import Animated, { Easing } from "react-native-reanimated";
import NotificationsBottomSheet from "../../components/NotificationsSheet";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const backgroundColor = useThemeColor({}, "background");
  const notificationSheetBackground = useThemeColor(
    {},
    "notificationSheetBackground"
  );
  const textColor = useThemeColor({}, "text");
  const insets = useSafeAreaInsets();
  const bottomSheetModalRef = useRef(null);
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  // Simulating fetching notifications
  useEffect(() => {
    const fetchNotifications = async () => {
      // Replace this with actual API call
      const mockNotifications = [
        { id: "1", message: "New message received" },
        { id: "2", message: "Your post was liked" },
      ];

      // Simulate delay
      setTimeout(() => setNotifications(mockNotifications), 3000);
    };

    fetchNotifications();
  }, []);

  const renderNotification = ({ item }) => (
    <View className="p-4 border-b border-gray-200">
      <Text style={{ color: textColor }} className="text-base">
        {item.message}
      </Text>
    </View>
  );

  return (
    <BottomSheetModalProvider>
      <View
        style={{
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
          backgroundColor,
        }}
        className="flex-1"
      >
        <View className="flex-row items-center justify-between space-x-8 px-4 mb-4">
          <TouchableOpacity
            onPress={() => router.push("/(main)/(tabs)/Explore")}
          >
            <Ionicons name="chevron-back" size={24} color={textColor} />
          </TouchableOpacity>
          <Text
            style={{ color: textColor }}
            className="text-xl ml-6 font-JakartaBold"
          >
            Messages
          </Text>
          <TouchableOpacity onPress={handlePresentModalPress}>
            <MaterialCommunityIcons
              name="dots-vertical"
              size={24}
              color={textColor}
            />
          </TouchableOpacity>
        </View>
        {notifications.length === 0 ? (
          <View className="flex-1 justify-center items-center">
            <Image
              source={require("@/assets/images/cave_manCrying.png")}
              className="w-40 h-40 mb-4"
            />
            <Text
              style={{ color: textColor }}
              className="text-xl font-semibold mb-2"
            >
              No Notifications Yet
            </Text>
            <Text
              style={{ color: textColor }}
              className="text-center text-gray-500"
            >
              No Notifications Yet, Come Back Later If You Received Something
            </Text>
          </View>
        ) : (
          <FlatList
            data={notifications}
            renderItem={renderNotification}
            keyExtractor={(item) => item.id}
          />
        )}
      </View>
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={0}
        snapPoints={["25%", "50%"]}
        animationConfigs={{
          duration: 800,
          easing: Easing.elastic(1),
        }}
        backgroundStyle={{
          backgroundColor: notificationSheetBackground,
        }}
        enablePanDownToClose={true}
      >
        <NotificationsBottomSheet
          textColor={textColor}
          backgroundColor={notificationSheetBackground}
        />
      </BottomSheetModal>
    </BottomSheetModalProvider>
  );
};

export default Notifications;
