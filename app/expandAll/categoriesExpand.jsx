import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Dimensions,
  StatusBar,
} from "react-native";
import React, { useState, useMemo } from "react";
import { exploreCategories } from "../../constants/data";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useThemeColor } from "@/hooks/useThemeColor";
import { router } from "expo-router";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  interpolate,
  runOnJS,
} from "react-native-reanimated";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const ITEM_WIDTH = (SCREEN_WIDTH - 48) / 2; // 48 = padding (16*2) + gap (16)

const CategoriesExpand = () => {
  const insets = useSafeAreaInsets();
  const backgroundColor = useThemeColor({}, "background");
  const textColor = useThemeColor({}, "text");
  const tintText = useThemeColor({}, "tintText");
  const cardBackground = useThemeColor({}, "cardBackground");
  const tintColor = useThemeColor({}, "tint");

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const searchAnimation = useSharedValue(0);
  const headerAnimation = useSharedValue(1);

  // Filter categories based on search
  const filteredCategories = useMemo(() => {
    if (!search.trim()) return exploreCategories;
    return exploreCategories.filter((category) =>
      category.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  const handleSearch = (text) => {
    setSearch(text);
    searchAnimation.value = withSpring(text.length > 0 ? 1 : 0);
  };

  const handleSearchFocus = () => {
    setIsSearchFocused(true);
    headerAnimation.value = withTiming(0.8);
  };

  const handleSearchBlur = () => {
    setIsSearchFocused(false);
    headerAnimation.value = withTiming(1);
  };

  const handleCategoryPress = (category) => {
    setSelectedCategory(category.id);
    // Navigate to category detail or perform action
    setTimeout(() => {
      setSelectedCategory(null);
      // router.push(`/category/${category.id}`);
    }, 200);
  };

  const clearSearch = () => {
    setSearch("");
    searchAnimation.value = withSpring(0);
  };

  const AnimatedCategoryItem = ({ item, index }) => {
    const scaleValue = useSharedValue(1);
    const isSelected = selectedCategory === item.id;

    const animatedStyle = useAnimatedStyle(() => {
      const scale = isSelected ? withSpring(0.95) : withSpring(1);
      return {
        transform: [{ scale }],
      };
    });

    const handlePressIn = () => {
      scaleValue.value = withSpring(0.95);
    };

    const handlePressOut = () => {
      scaleValue.value = withSpring(1);
    };

    const pressStyle = useAnimatedStyle(() => ({
      transform: [{ scale: scaleValue.value }],
    }));

    return (
      <Animated.View style={[pressStyle, animatedStyle]}>
        <TouchableOpacity
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          onPress={() => handleCategoryPress(item)}
          activeOpacity={0.9}
        >
          <View
            style={[
              styles.categoryCard,
              {
                backgroundColor: cardBackground,
                width: ITEM_WIDTH,
                borderColor: isSelected ? tintColor : "transparent",
                borderWidth: 2,
              },
            ]}
          >
            <View
              style={[
                styles.iconContainer,
                { backgroundColor: tintColor + "20" },
              ]}
            >
              <FontAwesome name={item.icon} size={28} color={tintColor} />
            </View>

            <Text
              style={[styles.categoryName, { color: textColor }]}
              numberOfLines={2}
            >
              {item.name}
            </Text>

            <View style={styles.itemCount}>
              <Text style={[styles.itemCountText, { color: tintText }]}>
                {item.count || "12"} items
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  const searchBarAnimatedStyle = useAnimatedStyle(() => {
    const scale = interpolate(searchAnimation.value, [0, 1], [1, 1.02]);
    return {
      transform: [{ scale }],
    };
  });

  const headerAnimatedStyle = useAnimatedStyle(() => {
    const scale = headerAnimation.value;
    const opacity = headerAnimation.value;
    return {
      transform: [{ scale }],
      opacity,
    };
  });

  const EmptyState = () => (
    <View style={styles.emptyState}>
      <Ionicons name="search" size={64} color={tintText} />
      <Text style={[styles.emptyStateTitle, { color: textColor }]}>
        No categories found
      </Text>
      <Text style={[styles.emptyStateSubtitle, { color: tintText }]}>
        Try adjusting your search terms
      </Text>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <StatusBar barStyle="dark-content" backgroundColor={backgroundColor} />

      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + 16 }]}>
        <Animated.View style={headerAnimatedStyle}>
          <Text style={[styles.title, { color: textColor }]}>
            Explore Categories
          </Text>
          <Text style={[styles.subtitle, { color: tintText }]}>
            Discover amazing items in every category
          </Text>
        </Animated.View>

        {/* Search Bar */}
        <Animated.View style={[styles.searchContainer, searchBarAnimatedStyle]}>
          <View style={[styles.searchBar, { backgroundColor: cardBackground }]}>
            <Ionicons name="search" size={20} color={tintText} />
            <TextInput
              style={[styles.searchInput, { color: textColor }]}
              placeholder="Search categories..."
              placeholderTextColor={tintText}
              value={search}
              onChangeText={handleSearch}
              onFocus={handleSearchFocus}
              onBlur={handleSearchBlur}
            />
            {search.length > 0 && (
              <TouchableOpacity
                onPress={clearSearch}
                style={styles.clearButton}
              >
                <Ionicons name="close-circle" size={20} color={tintText} />
              </TouchableOpacity>
            )}
          </View>
        </Animated.View>
      </View>

      {/* Categories Grid */}
      <View style={styles.content}>
        {filteredCategories.length > 0 ? (
          <FlatList
            data={filteredCategories}
            renderItem={({ item, index }) => (
              <AnimatedCategoryItem item={item} index={index} />
            )}
            keyExtractor={(item) => item.id.toString()}
            numColumns={2}
            columnWrapperStyle={styles.row}
            contentContainerStyle={styles.listContainer}
            showsVerticalScrollIndicator={false}
            ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
          />
        ) : (
          <EmptyState />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
  },
  searchContainer: {
    marginBottom: 8,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
  },
  clearButton: {
    padding: 4,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  listContainer: {
    paddingBottom: 20,
  },
  row: {
    justifyContent: "space-between",
  },
  categoryCard: {
    padding: 20,
    borderRadius: 16,
    alignItems: "center",
    minHeight: 160,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  categoryName: {
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 8,
    lineHeight: 20,
  },
  itemCount: {
    marginTop: "auto",
  },
  itemCountText: {
    fontSize: 12,
    fontWeight: "500",
  },
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 32,
  },
  emptyStateTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateSubtitle: {
    fontSize: 16,
    textAlign: "center",
  },
});

export default CategoriesExpand;
