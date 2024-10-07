import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { exploreCategories } from "../../constants/data";
import { FontAwesome } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { SearchBar } from "react-native-elements";

const categoriesExpand = () => {
  const insets = useSafeAreaInsets();
  const [search, setSearch] = useState("");
  const renderItem = ({ item }) => (
    <TouchableOpacity>
      <View className="flex flex-col border-2 rounded-md mb-4 w-44 h-44 items-center  bg-slate-500 justify-center p-4">
        <FontAwesome
          name={item.icon}
          size={32}
          color={"white"}
          style={{ marginBottom: 4 }}
        />
        <Text className="text-center font-JakartaSemiBold">{item.name}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={{ paddingTop: insets.top }} className="flex-1 p-4">
      <Text className="text-xl font-bold mb-4">Explore</Text>
      <SearchBar
        placeholder="Search Category"
        onChangeText={setSearch}
        value={search}
        lightTheme
        round
        containerStyle={styles.searchBarContainer}
        inputContainerStyle={styles.searchBarInput}
      />

      <FlatList
        data={exploreCategories}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        contentContainerStyle={{ justifyContent: "center" }}
      />
    </View>
  );
};

export default categoriesExpand;

const styles = StyleSheet.create({
  searchBarContainer: {
    backgroundColor: "transparent",
    borderTopWidth: 0,
    borderBottomWidth: 0,
    marginBottom: 10,
  },
  searchBarInput: {
    backgroundColor: "#e9e9e9",
  },
});
