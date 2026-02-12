import SquareCover from "@/components/SquareCover";
import { FontAwesome } from "@expo/vector-icons";
import { useRef, useState } from "react";
import { Pressable, Text, View } from "react-native";
import { convertLengthToTime } from "../utils/convertLengthToTime";
import { InfoPill } from "./InfoPill";

export default function TrackDetail({ track, onToggleFavourite, onDelete }) {
  const isFave = !!track?.favourite;

  const [expanded, setExpanded] = useState(false);

  // tap-vs-swipe guard
  const start = useRef({ x: 0, y: 0 });
  const TAP_SLOP = 10; // px; increase to 12–16 if you still get accidental taps

  return (
    <Pressable
      className="w-full relative rounded-2xl overflow-hidden bg-white dark:bg-gray-900 border border-black/5 dark:border-white/10 shadow-sm aspect-square"
      onPressIn={(e) => {
        start.current = {
          x: e.nativeEvent.pageX,
          y: e.nativeEvent.pageY,
        };
      }}
      onPressOut={(e) => {
        const dx = Math.abs(e.nativeEvent.pageX - start.current.x);
        const dy = Math.abs(e.nativeEvent.pageY - start.current.y);

        // Only toggle if it was a genuine tap (not a swipe)
        if (dx <= TAP_SLOP && dy <= TAP_SLOP) {
          setExpanded((v) => !v);
        }
      }}
    >
      <View className="absolute inset-0">
        <SquareCover imageBytes={track?.track_image} />
      </View>

      {/* Only show detail overlay when expanded */}
      {expanded && (
        <View className="top-0 left-0 right-0 p-4 bg-red-400 dark:bg-black/50">
          {track?.playlist_position != null && (
            <View className="absolute top-2 right-2 bg-white/25 rounded-md py-1.5 px-2 items-center justify-center">
              <Text className="text-white text-xs font-inter-semibold">
                # {track.playlist_position}
              </Text>
            </View>
          )}

          <View className="mb-3 pr-10">
            <Text
              className="text-white font-inter-semibold text-base font-medium leading-tight mb-1"
              numberOfLines={1}
            >
              {track?.track_title || "Untitled"}
            </Text>
            <Text className="text-white/80 font-inter text-sm font-medium" numberOfLines={1}>
              {track?.track_artist || "Unknown artist"}
            </Text>
          </View>

          <View className="relative flex-row items-center mt-2">
            {/* LEFT: star */}
            <Pressable
              onPress={(e) => {
                e.stopPropagation?.();
                onToggleFavourite?.();
              }}
              hitSlop={10}
            >
              <FontAwesome name={isFave ? "star" : "star-o"} size={20} color="#fff" />
            </Pressable>

            {/* RIGHT: BPM + length (unchanged layout) */}
            <View className="ml-auto flex-row gap-2 items-center justify-end">
              <InfoPill label={`${track?.track_bpm ?? "—"} BPM`} />
              <InfoPill label={convertLengthToTime(track?.track_length) ?? "—:—"} />
            </View>

            {/* CENTER: absolutely centred bin */}
            <View className="absolute left-0 right-0 items-center">
              <Pressable
                onPress={(e) => {
                  e.stopPropagation?.();
                  onDelete?.();
                }}
                hitSlop={10}
              >
                <FontAwesome name="trash" size={20} color="#fff" />
              </Pressable>
            </View>
          </View>
        </View>
      )}
    </Pressable>
  );
}
