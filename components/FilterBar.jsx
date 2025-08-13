// components/FilterBar.jsx
import { FontAwesome5 } from "@expo/vector-icons";
import { useEffect } from "react";
import {
  LayoutAnimation,
  Platform,
  Pressable,
  Text,
  TextInput,
  UIManager,
  View,
} from "react-native";

export default function FilterBar({
  // state comes from parent
  showFilters,
  setShowFilters,
  showFaves,
  setShowFaves,
  query,
  setQuery,
  // optional
  placeholder = "Search…",
  helperText, // e.g. "Showing 5 of 12 tracks"
  className = "",
}) {
  // Enable LayoutAnimation on Android
  useEffect(() => {
    if (Platform.OS === "android" && UIManager.setLayoutAnimationEnabledExperimental) {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }, []);

  const toggleFilters = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setShowFilters((v) => !v);
  };

  return (
    <View>
      {/* Toggle row */}
      <Pressable
        onPress={toggleFilters}
        className="flex-row items-center justify-center gap-2 mb-2"
        accessibilityRole="button"
        accessibilityLabel={showFilters ? "Hide filters" : "Show filters"}
        accessibilityState={{ expanded: showFilters }}
      >
        <Text className="text-sm font-medium text-gray-600 dark:text-gray-300">
          {showFilters ? "Hide filters" : "Show filters"}
        </Text>
        <FontAwesome5
          name={showFilters ? "chevron-up" : "chevron-down"}
          size={12}
          color="#9CA3AF"
        />
      </Pressable>

      {/* Filters panel */}
      {showFilters && (
        <View
          className={`
            mb-4 p-3
            rounded-lg
            bg-white/90 dark:bg-gray-900
            border border-black/5 dark:border-white/10
            shadow-sm
            ${className}
          `}
        >
          <View className="flex-row gap-8 items-center">
            {/* Favourites toggle */}
            <Pressable
              onPress={() => setShowFaves((v) => !v)}
              className={`
                flex-row items-center gap-2 px-3 py-2 rounded-full
                ${showFaves ? "bg-red-400" : "bg-gray-200 dark:bg-gray-800"}
              `}
              accessibilityRole="button"
              accessibilityState={{ selected: showFaves }}
              accessibilityLabel="Toggle favourites filter"
            >
              <FontAwesome5
                name={showFaves ? "star" : "star-o"}
                size={14}
                color={showFaves ? "#fff" : "#9CA3AF"}
              />
              <Text
                className={`text-xs font-medium ${
                  showFaves ? "text-white" : "text-gray-500 dark:text-gray-300"
                }`}
              >
                Favourites
              </Text>
            </Pressable>

            {/* Search input */}
            <View className="flex-1">
              <TextInput
                value={query}
                onChangeText={setQuery}
                placeholder={placeholder}
                placeholderTextColor="#9CA3AF"
                className="
                  px-3 py-2 rounded-lg
                  bg-gray-100 dark:bg-gray-800
                  text-gray-900 dark:text-gray-100
                  border border-black/5 dark:border-white/10
                "
              />
            </View>
          </View>

          {!!helperText && (
            <Text className="mt-2 text-xs text-gray-500 dark:text-gray-400">{helperText}</Text>
          )}
        </View>
      )}
    </View>
  );
}
