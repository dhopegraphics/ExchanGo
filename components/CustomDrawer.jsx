import { View, Text, StyleSheet, Image } from "react-native";
import React, { useEffect } from "react";
import { Drawer } from "expo-router/drawer";
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerView,
} from "@react-navigation/drawer";
import {
  Feather,
  AntDesign,
  MaterialIcons,
  Ionicons,
} from "@expo/vector-icons";
import { router, usePathname } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { imageDataURL } from "../constants/ImageData";
import { useThemeColor } from "@/hooks/useThemeColor";

export const CustomDrawerContent = (props) => {
  const backgroundColor = useThemeColor({}, "background");
  const activeItemBackgroundColor = useThemeColor(
    {},
    "drawerActiveItemBackground"
  );
  const activeItemTextColor = useThemeColor({}, "drawerActiveItemText");
  const textColor = useThemeColor({}, "text");
  const pathname = usePathname();

  useEffect(() => {
    console.log(pathname);
  }, [pathname]);

  return (
    <DrawerContentScrollView {...props}>
      <StatusBar style="auto" />
      <View style={styles.userInfoWrapper}>
        <Image
          source={{ uri: imageDataURL[0] }}
          width={70}
          height={70}
          style={styles.userImg}
        />
        <View style={styles.userDetailsWrapper}>
          <Text style={[styles.userName, { color: textColor }]}>
            Dhope Graphics
          </Text>
          <Text style={[styles.userEmail, { color: textColor }]}>
            dhopegraphics@gmail.com
          </Text>
        </View>
      </View>
      <DrawerItem
        icon={({ color, size }) => (
          <Feather
            name="home"
            size={size}
            color={pathname == "/Explore" ? activeItemTextColor : textColor}
          />
        )}
        label={"Explore"}
        labelStyle={[
          styles.navItemLabel,
          {
            color: pathname == "/Explore" ? activeItemTextColor : textColor,
          },
        ]}
        style={{
          backgroundColor:
            pathname == "/Explore"
              ? activeItemBackgroundColor
              : backgroundColor,
          marginLeft: 15,
        }}
        onPress={() => {
          router.push("/(main)/(tabs)/Explore");
        }}
      />
      <DrawerItem
        icon={({ color, size }) => (
          <Ionicons
            name="notifications-outline"
            size={size}
            color={
              pathname == "/notifications" ? activeItemTextColor : textColor
            }
          />
        )}
        label={"Notifications"}
        labelStyle={[
          styles.navItemLabel,
          {
            color:
              pathname == "/notifications" ? activeItemTextColor : textColor,
          },
        ]}
        style={{
          backgroundColor:
            pathname == "/notifications"
              ? activeItemBackgroundColor
              : backgroundColor,
        }}
        onPress={() => {
          router.push("/(main)/notifications");
        }}
      />

      <DrawerItem
        icon={({ color, size }) => (
          <Ionicons
            name="people-outline"
            size={size}
            color={pathname == "/communities" ? activeItemTextColor : textColor}
          />
        )}
        label={"Community"}
        labelStyle={[
          styles.navItemLabel,
          {
            color: pathname == "/communities" ? activeItemTextColor : textColor,
          },
        ]}
        style={{
          backgroundColor:
            pathname == "/communities"
              ? activeItemBackgroundColor
              : backgroundColor,
        }}
        onPress={() => {
          router.push("/communities");
        }}
      />
      <DrawerItem
        icon={({ color, size }) => (
          <Ionicons
            name="bookmark-outline"
            size={size}
            color={pathname == "/bookmarks" ? activeItemTextColor : textColor}
          />
        )}
        label={"Bookmark"}
        labelStyle={[
          styles.navItemLabel,
          {
            color: pathname == "/bookmarks" ? activeItemTextColor : textColor,
          },
        ]}
        style={{
          backgroundColor:
            pathname == "/bookmarks"
              ? activeItemBackgroundColor
              : backgroundColor,
        }}
        onPress={() => {
          router.push("/bookmarks");
        }}
      />

      <DrawerItem
        icon={({ color, size }) => (
          <Ionicons
            name="settings-outline"
            size={size}
            color={pathname == "/settings" ? activeItemTextColor : textColor}
          />
        )}
        label={"settings"}
        labelStyle={[
          styles.navItemLabel,
          {
            color: pathname == "/settings" ? activeItemTextColor : textColor,
          },
        ]}
        style={{
          backgroundColor:
            pathname == "/settings"
              ? activeItemBackgroundColor
              : backgroundColor,
        }}
        onPress={() => {
          router.push("/settings");
        }}
      />
      <View style={{ marginTop: 300 }}>
        <DrawerItem
          icon={({ color, size }) => (
            <Ionicons
              name="log-out"
              size={size}
              color={pathname == "/logout" ? activeItemTextColor : textColor}
            />
          )}
          label={"Logout"}
          labelStyle={[
            styles.navItemLabel,
            {
              color: pathname == "/logout" ? activeItemTextColor : textColor,
            },
          ]}
          style={{
            backgroundColor:
              pathname == "/logout"
                ? activeItemBackgroundColor
                : backgroundColor,
            marginLeft: 15,
          }}
          onPress={() => {}}
        />
      </View>
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  navItemLabel: {
    marginLeft: -20,
    fontSize: 15,
  },
  userInfoWrapper: {
    flexDirection: "column",
    paddingHorizontal: 10,
    paddingVertical: 20,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    marginBottom: 10,
    flex: 1,
    justifyContent: "flex-start",
  },
  userImg: {
    borderWidth: 2,
    borderColor: "#ccc",
    borderRadius: 40,
    marginLeft: 10,
    marginBottom: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  userDetailsWrapper: {
    flex: 1,
    marginTop: 12,
    marginLeft: 10,
  },
  userName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  userEmail: {
    fontSize: 13,
    fontWeight: "500",
  },
});
