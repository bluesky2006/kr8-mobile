// components/FilterBar.jsx
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
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
  // optional toggle props
  showFilters,
  setShowFilters,

  // state from parent
  showFaves,
  setShowFaves,
  query,
  setQuery,

  // optional UI
  placeholder = "Search…",
  helperText,
  className = "",
  style, // NEW — accept a style prop for outer container
}) {
  // Enable LayoutAnimation on Android
  useEffect(() => {
    if (Platform.OS === "android" && UIManager.setLayoutAnimationEnabledExperimental) {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }, []);

  const isExpanded = typeof showFilters === "boolean" ? showFilters : true;
  const hasToggle = typeof setShowFilters === "function";

  const toggleFilters = () => {
    if (!hasToggle) return;
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setShowFilters((v) => !v);
  };

  return (
    <View style={style} className={className}>
      {hasToggle && (
        <Pressable
          onPress={toggleFilters}
          className="flex-row items-center justify-center gap-2 mb-2"
          accessibilityRole="button"
          accessibilityLabel={isExpanded ? "Hide filters" : "Show filters"}
          accessibilityState={{ expanded: isExpanded }}
        >
          <Text className="text-sm font-medium text-gray-600 dark:text-gray-300">
            {isExpanded ? "Hide filters" : "Show filters"}
          </Text>
          <FontAwesome5
            name={isExpanded ? "chevron-up" : "chevron-down"}
            size={12}
            color="#9CA3AF"
          />
        </Pressable>
      )}

      {isExpanded && (
        <View className="bg-white dark:bg-gray-900 shadow-xs">
          <View className="flex-row gap-4 items-center">
            {/* Favourites toggle */}
            <Pressable
              onPress={() => setShowFaves((v) => !v)}
              className={`flex-row items-center gap-2 px-3 py-2 rounded-full ${
                showFaves ? "bg-red-400" : "bg-gray-200 dark:bg-gray-800"
              }`}
              accessibilityRole="button"
              accessibilityState={{ selected: showFaves }}
              accessibilityLabel="Toggle favourites filter"
            >
              <FontAwesome
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
