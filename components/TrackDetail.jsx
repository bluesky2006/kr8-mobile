import SquareCover from "@/components/SquareCover";
import { Pressable, Text, View } from "react-native";
import { convertLengthToTime } from "../utils/convertLengthToTime";
import { InfoPill } from "./InfoPill";

export default function TrackDetail({ track }) {
  return (
    <Pressable className="w-full relative rounded-lg overflow-hidden bg-white dark:bg-gray-900 border border-black/5 dark:border-white/10 shadow-sm aspect-square">
      <View className="absolute inset-0">
        <SquareCover imageBytes={track?.track_image} />
      </View>
      <View
        className="
           top-0 left-0 right-0
          p-4
          bg-gray-400 dark:bg-black/50
        "
      >
        {track?.PlaylistTrack?.playlist_position != null && (
          <View className="absolute top-2 right-2 bg-white/25 rounded-md py-1.5 px-2 items-center justify-center">
            <Text className="text-white text-xs font-inter-semibold">
              # {track.PlaylistTrack.playlist_position}
            </Text>
          </View>
        )}
        <View className="mb-3 pr-10">
          <Text
            className="text-white font-inter-semibold text-base leading-tight mb-1"
            numberOfLines={1}
          >
            {track?.track_title || "Untitled"}
          </Text>
          <Text className="text-white/80 font-inter text-xs" numberOfLines={1}>
            {track?.track_artist || "Unknown artist"}
          </Text>
        </View>
        <View
          className="
          flex-row gap-2 items-center justify-end
        "
        >
          <InfoPill label={`${track?.track_bpm ?? "—"} BPM`} />
          <InfoPill label={convertLengthToTime(track?.track_length) ?? "—:—"} />
        </View>
      </View>
    </Pressable>
  );
}
