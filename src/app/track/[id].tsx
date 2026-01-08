import Slider from "@react-native-community/slider";
import { BlurView } from "expo-blur";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import ImageColors from "react-native-image-colors";
import { SafeAreaView } from "react-native-safe-area-context";

import BackButton from "../../../assets/icons/backButton.svg";
import Pause from "../../../assets/icons/pause.svg";
import Play from "../../../assets/icons/play.svg";
import Next from "../../../assets/icons/trackNext.svg";
import Prev from "../../../assets/icons/trackPrev.svg";

import usePlayerStore from "../../store/usePlayerStore";

export default function TrackScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();

  const {
    playlist,
    currentIndex,
    isPlaying,
    position,
    duration,
    playNext,
    playPrev,
    playTrackAtIndex,
    togglePlayPause,
    seekTo,
  } = usePlayerStore();

  const track = playlist[currentIndex];
  const [bgColor, setBgColor] = useState("#1A0A3A");

  useEffect(() => {
    if (!track) {
      router.replace("/home");
    }
  }, [track]);

  useEffect(() => {
    if (!id || !playlist.length) return;

    const index = playlist.findIndex((t) => t.id === id);

    if (index >= 0 && index !== currentIndex) {
      playTrackAtIndex(index);
    }
  }, [id, playlist, currentIndex, playTrackAtIndex]);

  useEffect(() => {
    const fetchColors = async () => {
      if (!track?.album?.cover_xl) return;

      const result = await ImageColors.getColors(track.album.cover_xl, {
        fallback: "#1A0A3A",
        cache: true,
        key: track.id,
      });

      if (result.platform === "android") {
        setBgColor(result.dominant || "#1A0A3A");
      }
    };

    fetchColors();
  }, [track]);

  const formatTime = (millis: number) => {
    const seconds = Math.floor(millis / 1000);
    return `0:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  if (!track) return null;

  return (
    <View style={styles.container}>
      <Image
        style={StyleSheet.absoluteFill}
        source={{ uri: track.album.cover_xl }}
        blurRadius={50}
      />

      <BlurView intensity={80} tint="dark" style={StyleSheet.absoluteFill}>
        <SafeAreaView style={styles.safeArea}>
          <View style={[styles.inner, { backgroundColor: bgColor + "99" }]}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => router.back()}
            >
              <BackButton width={20} height={20} />
            </TouchableOpacity>

            <View style={styles.content}>
              <Image
                style={styles.cover}
                source={{ uri: track.album.cover_xl }}
              />

              <Text style={styles.title}>{track.title}</Text>
              <Text style={styles.artist}>{track.artist.name}</Text>
              <View style={styles.progressContainer}>
                <Slider
                  minimumValue={0}
                  maximumValue={duration}
                  value={position}
                  onSlidingComplete={seekTo}
                  minimumTrackTintColor="#FFFFFF"
                  maximumTrackTintColor="rgba(255,255,255,0.4)"
                  thumbTintColor="#FFFFFF"
                />

                <View style={styles.timeContainer}>
                  <Text style={styles.timeText}>{formatTime(position)}</Text>
                  <Text style={styles.timeText}>{formatTime(duration)}</Text>
                </View>
              </View>

              <View style={styles.controls}>
                <TouchableOpacity onPress={playPrev}>
                  <Prev width={24} height={24} />
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={togglePlayPause}
                  style={styles.playButton}
                >
                  {isPlaying ? (
                    <Pause width={28} height={28} />
                  ) : (
                    <Play width={28} height={28} />
                  )}
                </TouchableOpacity>

                <TouchableOpacity onPress={playNext}>
                  <Next width={24} height={24} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </SafeAreaView>
      </BlurView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },

  safeArea: { flex: 1 },

  inner: { flex: 1 },

  content: {
    flex: 1,
    alignItems: "center",
    paddingTop: 90,
    paddingHorizontal: 20,
  },

  cover: {
    width: 320,
    height: 320,
    borderRadius: 12,
    marginBottom: 32,
    shadowColor: "#000",
    shadowOpacity: 0.4,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 10 },
    elevation: 20,
  },

  title: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 6,
  },

  artist: {
    color: "rgba(255,255,255,0.7)",
    fontSize: 16,
  },

  progressContainer: {
    width: "100%",
    paddingHorizontal: 20,
    marginTop: 20,
  },

  timeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 4,
  },

  timeText: {
    color: "rgba(255,255,255,0.7)",
    fontSize: 12,
  },

  controls: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 40,
  },

  playButton: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 30,
  },

  backButton: {
    position: "absolute",
    top: 40,
    left: 30,
    zIndex: 10,
  },
});
