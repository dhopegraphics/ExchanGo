import { View, TextInput, TouchableOpacity } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { EnhancedSearchBarProps } from "../../types/ExploreTypes";

const EnhancedSearchBar = ({
  cardBackground,
  isSearchFocused,
  tintColor,
  tintText,
  textColor,
  searchQuery,
  setSearchQuery,
  handleSearchFocus,
  handleSearchBlur,
}: EnhancedSearchBarProps) => {
  return (
    <View className="px-4 mb-4">
      <View
        className="flex-row items-center px-4 py-3 rounded-2xl"
        style={{
          backgroundColor: cardBackground,
          borderWidth: isSearchFocused ? 2 : 1,
          borderColor: isSearchFocused ? tintColor : "#E5E7EB",
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 8,
          elevation: 3,
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
          placeholder="Discover communities, people, skills..."
          placeholderTextColor={tintText}
          value={searchQuery}
          onChangeText={setSearchQuery}
          onFocus={handleSearchFocus}
          onBlur={handleSearchBlur}
        />
        {searchQuery?.length > 0 && (
          <TouchableOpacity onPress={() => setSearchQuery("")}>
            <Ionicons name="close-circle" size={20} color={tintText} />
          </TouchableOpacity>
        )}
        <View
          className="w-px h-6 mx-3"
          style={{ backgroundColor: "#E5E7EB" }}
        />
        <TouchableOpacity>
          <MaterialIcons name="tune" size={20} color={tintColor} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default EnhancedSearchBar;
