import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
  TextInput,
} from "react-native";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ConnectionCard } from "@/components/SwapConnect";
import { connections } from "@/constants/data";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import Animated, { Easing } from "react-native-reanimated";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import FilterScreen from "../../../components/FilterBottomitems";

const SwapCenter = () => {
  const backgroundColor = useThemeColor({}, "background");
  const textColor = useThemeColor({}, "text");
  const insets = useSafeAreaInsets();
  const filterSheetBottomSheetRef = useRef(null);
  const handlePresentFilterModalPress = useCallback(() => {
    filterSheetBottomSheetRef.current?.present();
  }, []);

  return (
    <>
      <View style={[styles.container, { backgroundColor: backgroundColor }]}>
        <View
          style={[
            styles.header,
            { paddingTop: insets.top, backgroundColor: backgroundColor },
          ]}
        >
          <Text style={[styles.title, { color: textColor }]}>Connect</Text>
          <View className="flex-row space-x-4">
            <TouchableOpacity onPress={handlePresentFilterModalPress}>
              <FontAwesome name="filter" size={24} color={textColor} />
            </TouchableOpacity>
            <TouchableOpacity>
              <MaterialCommunityIcons
                name="dots-vertical"
                size={24}
                color={textColor}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={[styles.searchContainer, { marginBottom: 10 }]}>
          <Ionicons
            name="search"
            size={20}
            color="#666"
            style={styles.searchIcon}
          />
          <TextInput
            style={[styles.searchInput]}
            placeholder="Search"
            placeholderTextColor="#666"
          />
        </View>
        <View style={{ flex: 1, padding: 10 }}>
          <FlatList
            data={connections}
            renderItem={({ item }) => <ConnectionCard user={item} />}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContainer}
            scrollEventThrottle={16}
          />
        </View>
      </View>

      <BottomSheetModal
        ref={filterSheetBottomSheetRef}
        index={0}
        snapPoints={["50%", "70%", "80%", "90%"]}
        animationConfigs={{
          duration: 800,
          easing: Easing.elastic(1),
        }}
        backgroundStyle={{
          backgroundColor: "#f1f5f9",
        }}
        enablePanDownToClose={true}
      >
        <FilterScreen />
      </BottomSheetModal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
    padding: 10,
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
    padding: 3,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
    padding: 3,
  },
  listContainer: {
    paddingBottom: 16,
  },
});

export default SwapCenter;
