import BackgroundGradient from "@/components/BackgroundGradient";
import axios from "axios";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  View,
} from "react-native";
import {
  usePlaybackState,
  useProgress,
} from "react-native-track-player";

import { setUpPlayer } from "@/player/player";
import { playTrack } from "@/player/playTrack";

export default function TrackScreen() {
  const playbackState = usePlaybackState();
  const { position, duration } = useProgress(250);

  const { id } = useLocalSearchParams<{ id: string }>();
  const [track, setTrack] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  /** 1️⃣ Ініціалізація плеєра (ОДИН РАЗ) */
  useEffect(() => {
    setUpPlayer();
  }, []);

  /** 2️⃣ Завантаження треку по id */
  useEffect(() => {
    if (!id) return;

    const loadTrack = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://api.deezer.com/track/${id}`
        );
        setTrack(response.data);
      } catch (error) {
        console.error("failed to load track:", error);
      } finally {
        setLoading(false);
      }
    };

    loadTrack();
  }, [id]);

  /** 3️⃣ Автовідтворення preview */
  useEffect(() => {
    if (track?.preview) {
      playTrack(track);
    }
  }, [track]);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  if (!track || track.error) {
    return (
      <View style={styles.container}>
        <Text style={{ color: "white", textAlign: "center" }}>
          {track?.error?.message || "Track is not found"}
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <BackgroundGradient>
        <View style={styles.content}>
          <Image
            style={styles.cover}
            source={{ uri: track.album?.cover_big }}
          />
          <Text style={styles.title}>{track.title}</Text>
          <Text style={styles.artist}>{track.artist?.name}</Text>
        </View>
      </BackgroundGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },
  content: {
    flex: 1,
    alignItems: "center",
    paddingTop: 90,
    paddingHorizontal: 20,
  },
  cover: {
    width: 290,
    height: 400,
    borderRadius: 16,
    marginBottom: 20,
  },
  title: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "700",
    textAlign: "center",
  },
  artist: {
    color: "#aaa",
    marginTop: 4,
  },
});
