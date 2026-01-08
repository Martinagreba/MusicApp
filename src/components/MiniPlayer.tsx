import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import ImageColors from "react-native-image-colors";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import Pause from "../../assets/icons/pause.svg";
import Play from "../../assets/icons/play.svg";

import usePlayerStore from "@/store/usePlayerStore";

type MiniPlayerProps = {
  onPress: () => void;
};

const TAB_BAR_HEIGHT = 70;

export default function MiniPlayer({ onPress }: MiniPlayerProps) {
  const { playlist, currentIndex, isPlaying, togglePlayPause } =
    usePlayerStore();

  const track = playlist[currentIndex];
  const [bgColor, setBgColor] = useState("#1A0A3A");
  const insets = useSafeAreaInsets();

  useEffect(() => {
    const fetchColors = async () => {
      if (!track?.album?.cover_xl) return;

      const result = await ImageColors.getColors(track.album.cover_xl, {
        fallback: "#1A0A3A",
        cache: true,
        key: track.id,
      });

      let color = "#1A0A3A";

      if (result.platform === "android") {
        color = result.dominant || color;
      } else if (result.platform === "ios") {
        color = result.background || color;
      }

      setBgColor(color);
    };

    fetchColors();
  }, [track]);

  if (!track) return null;

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onPress}
      style={[
        styles.container,
        {
          backgroundColor: bgColor,
          bottom: TAB_BAR_HEIGHT + insets.bottom,
        },
      ]}
    >
      <Image source={{ uri: track.album.cover_xl }} style={styles.cover} />

      <View style={styles.textContainer}>
        <Text style={styles.title} numberOfLines={1}>
          {track.title}
        </Text>
        <Text style={styles.artist} numberOfLines={1}>
          {track.artist.name}
        </Text>
      </View>

      <TouchableOpacity onPress={togglePlayPause} style={styles.playButton}>
        {isPlaying ? (
          <Pause width={24} height={24} />
        ) : (
          <Play width={24} height={24} />
        )}
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    left: 16,
    right: 16,
    zIndex: 1000,

    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
    overflow: "hidden",
  },
  cover: {
    width: 48,
    height: 48,
    borderRadius: 12,
  },
  textContainer: {
    flex: 1,
    marginLeft: 12,
  },
  title: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 14,
  },
  artist: {
    color: "rgba(255,255,255,0.7)",
    fontSize: 12,
    marginTop: 2,
  },
  playButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
});
