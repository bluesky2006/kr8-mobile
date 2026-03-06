import SquareCover from "@/components/SquareCover";
import { FontAwesome } from "@expo/vector-icons";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { convertLengthToTime } from "../utils/convertLengthToTime";
import { InfoPill } from "./InfoPill";

export default function TrackDetail({ track, onToggleFavourite, onDelete }) {
  const isFave = !!track?.favourite;

  const [expanded, setExpanded] = useState(false);

  return (
    <View className="w-full relative rounded-md overflow-hidden bg-white dark:bg-gray-900 border border-black/5 dark:border-white/10 shadow-sm aspect-square">
      <View className="absolute inset-0">
        <SquareCover imageBytes={track?.track_image} />
      </View>

      {track?.playlist_position != null && (
        <Pressable
          onPress={(e) => {
            e.stopPropagation?.();
            setExpanded((v) => !v);
          }}
          hitSlop={8}
          className="absolute top-2 right-2 z-10 flex-row items-center gap-1 rounded-sm bg-red-400 py-1.5 px-2"
        >
          <Text className="text-white text-base font-inter-semibold">
            # {track.playlist_position}
          </Text>
          <FontAwesome name={expanded ? "chevron-up" : "chevron-down"} size={10} color="#fff" />
        </Pressable>
      )}

      {/* Only show detail overlay when expanded */}
      {expanded && (
        <View className="top-0 left-0 right-0 p-4 bg-red-400 dark:bg-black/50">
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
    </View>
  );
}
