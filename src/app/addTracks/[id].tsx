import { useFocusEffect, useLocalSearchParams, useRouter } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import BackgroundGradient from "@/components/BackgroundGradient";
import Input from "@/components/ui/Input";
import useMusicStore, { Track } from "@/store/useMusicStore";
import usePlaylistStore from "@/store/usePlaylistStore";
import AddIcon from "../../../assets/icons/addIcon.svg";
import CheckIcon from "../../../assets/icons/checkIcon.svg";
import PrevPageIcon from "../../../assets/icons/prevPage.svg";
import SearchIcon from "../../../assets/icons/searchIcon.svg";

const AddTrackToPlaylist = () => {
  const router = useRouter();
  const { id: playlistId } = useLocalSearchParams<{ id: string }>();

  const { filteredTracks, setSearchQuery, clearSearch } = useMusicStore();
  const { playlists, fetchPlaylists, addTrackToPlaylist } = usePlaylistStore();

  const [playlistTracks, setPlaylistTracks] = useState<string[]>([]);
  const [focused, setFocused] = useState(false);
  const [localQuery, setLocalQuery] = useState("");

  useEffect(() => {
    const load = async () => {
      await fetchPlaylists();
      const playlist = playlists.find((p) => p.id === playlistId);
      setPlaylistTracks(playlist?.tracks.map((t) => t.id) || []);
    };
    load();
  }, [playlists, playlistId]);

  useFocusEffect(
    useCallback(() => {
      return () => clearSearch();
    }, [clearSearch]),
  );

  useEffect(() => {
    const timeout = setTimeout(() => setSearchQuery(localQuery), 400);
    return () => clearTimeout(timeout);
  }, [localQuery, setSearchQuery]);

  const handleAddTrack = async (trackId: string, track: Track) => {
    await addTrackToPlaylist(playlistId!, track);
    setPlaylistTracks((prev) => [...prev, trackId]);
  };

  return (
    <BackgroundGradient>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <PrevPageIcon width={20} height={20} />
          </TouchableOpacity>

          <Text style={styles.title}>Add Tracks</Text>
        </View>

        <View style={[styles.searchContainer, focused && styles.searchFocused]}>
          <SearchIcon width={18} height={18} />
          <Input
            placeholder="Search..."
            placeholderTextColor="rgba(255,255,255,0.5)"
            style={styles.input}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            value={localQuery}
            onChangeText={setLocalQuery}
          />
        </View>

        <FlatList
          data={filteredTracks}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            localQuery.trim().length > 1 ? (
              <Text style={styles.emptyText}>No tracks found</Text>
            ) : null
          }
          renderItem={({ item }) => {
            const alreadyAdded = playlistTracks.includes(item.id);
            return (
              <View style={styles.trackRow}>
                <View style={styles.trackInfo}>
                  <Image
                    source={{ uri: item.album.cover_xl }}
                    style={styles.albumCover}
                  />
                  <View style={styles.trackText}>
                    <Text
                      style={styles.trackTitle}
                      numberOfLines={1}
                      ellipsizeMode="tail"
                    >
                      {item.title}
                    </Text>
                    <Text style={styles.trackArtist}>{item.artist.name}</Text>
                  </View>
                </View>

                <TouchableOpacity
                  style={styles.addButton}
                  disabled={alreadyAdded}
                  onPress={() => handleAddTrack(item.id, item)}
                >
                  {alreadyAdded ? (
                    <CheckIcon width={18} height={16} />
                  ) : (
                    <AddIcon width={18} height={18} />
                  )}
                </TouchableOpacity>
              </View>
            );
          }}
        />
      </SafeAreaView>
    </BackgroundGradient>
  );
};

export default AddTrackToPlaylist;

const styles = StyleSheet.create({
  safeArea: { flex: 1, paddingHorizontal: 16, paddingTop: 12 },

  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#fff",
    marginLeft: 12,
  },

  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    height: 48,
    paddingHorizontal: 14,
    borderRadius: 16,
    backgroundColor: "rgba(255,255,255,0.06)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
    marginBottom: 16,
  },
  searchFocused: {
    borderColor: "#E040AB",
    backgroundColor: "rgba(224,64,171,0.08)",
  },
  input: {
    flex: 1,
    marginLeft: 10,
    color: "#fff",
    fontSize: 16,
    paddingVertical: 10,
    borderWidth: 0,
    backgroundColor: "transparent",
  },

  trackRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },

  trackInfo: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },

  albumCover: {
    width: 50,
    height: 50,
    borderRadius: 6,
    marginRight: 12,
  },

  trackText: {
    justifyContent: "center",
    flexShrink: 1,
  },

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

  addButton: {
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },

  emptyText: {
    color: "rgba(255,255,255,0.5)",
    textAlign: "center",
    marginTop: 40,
  },
});
