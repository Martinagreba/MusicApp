import BackgroundGradient from "@/components/BackgroundGradient";
import { screenPadding } from "@/constants/tokens";
import usePlaylistStore, { Playlist } from "@/store/usePlaylistStore";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AddIcon from "../../../assets/icons/addIcon.svg";
import PrevPageIcon from "../../../assets/icons/prevPage.svg";
import Trash from "../../../assets/icons/trash.svg";

const PlaylistScreen = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { playlists, fetchPlaylists, removeTrackFromPlaylist } =
    usePlaylistStore();
  const [playlist, setPlaylist] = useState<Playlist | null>(null);

  useEffect(() => {
    fetchPlaylists();
  }, []);

  useEffect(() => {
    const found = playlists.find((p) => p.id === id);
    if (found) setPlaylist(found);
  }, [playlists, id]);

  if (!playlist) {
    return (
      <BackgroundGradient>
        <SafeAreaView style={styles.safeArea}>
          <Text style={styles.loadingText}>Loading playlist...</Text>
        </SafeAreaView>
      </BackgroundGradient>
    );
  }

  return (
    <BackgroundGradient>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <PrevPageIcon width={20} height={20} />
          </TouchableOpacity>

          <Text style={styles.title}>{playlist.name}</Text>

          <TouchableOpacity
            style={styles.addButton}
            onPress={() => router.push(`/addTracks/${playlist.id}`)}
          >
            <AddIcon width={16} height={16} style={styles.addButtonText} />
          </TouchableOpacity>
        </View>

        <FlatList
          data={playlist.tracks}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <Text style={styles.emptyText}>Playlist is empty</Text>
          }
          renderItem={({ item }) => (
            <View style={styles.trackRow}>
              <Image
                source={{ uri: item.album.cover_xl }}
                style={styles.albumCover}
              />
              <View style={styles.trackText}>
                <Text style={styles.trackTitle}>{item.title}</Text>
                <Text style={styles.trackArtist}>{item.artist.name}</Text>
              </View>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => removeTrackFromPlaylist(playlist.id, item.id)}
              >
                <Text style={styles.deleteButtonText}>
                  <Trash width={20} height={20} />
                </Text>
              </TouchableOpacity>
            </View>
          )}
        />
      </SafeAreaView>
    </BackgroundGradient>
  );
};

export default PlaylistScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingHorizontal: screenPadding,
    paddingTop: 15,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#fff",
    marginLeft: 14,
  },
  addButton: {
    marginLeft: "auto",
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "#E040AB",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#E040AB",
    shadowOpacity: 0.6,
    shadowRadius: 10,
    elevation: 6,
  },

  addButtonText: {
    color: "#fff",
    marginTop: -1,
  },

  trackRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
    paddingVertical: 8,
    paddingHorizontal: 0,
    borderRadius: 0,
    borderBottomColor: "rgba(255,255,255,0.1)",
    borderBottomWidth: 1,
  },

  albumCover: {
    width: 50,
    height: 50,
    borderRadius: 6,
    marginRight: 12,
  },
  trackText: { flex: 1 },
  trackTitle: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "600",
  },
  trackArtist: {
    color: "rgba(255,255,255,0.65)",
    fontSize: 13,
    marginTop: 2,
  },
  loadingText: {
    color: "#fff",
    textAlign: "center",
    marginTop: 40,
  },
  emptyText: {
    color: "rgba(255,255,255,0.5)",
    textAlign: "center",
    marginTop: 40,
  },

  deleteButton: {
    marginLeft: 10,
    padding: 8,
  },

  deleteButtonText: {
    fontSize: 16,
    color: "#fff",
  },
});
