import BackgroundGradient from "@/components/BackgroundGradient";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { screenPadding } from "@/constants/tokens";
import AddIcon from "../../../assets/icons/addIcon.svg";
import MusicIcon from "../../../assets/icons/music.svg";
import TrashIcon from "../../../assets/icons/trash.svg";
import PlaylistModal from "../../components/modals/playlistModal";
import usePlaylistStore from "../../store/usePlaylistStore";
const YourLibrary = () => {
  const router = useRouter();

  const { playlists, createPlaylist, fetchPlaylists, loading, deletePlaylist } =
    usePlaylistStore();

  const [isModalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    fetchPlaylists();
  }, []);

  return (
    <BackgroundGradient>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Your Library</Text>
        </View>
        <View style={styles.playlistsRow}>
          <View style={styles.activeTab}>
            <Text style={styles.activeTabText}>Playlists</Text>
          </View>

          <TouchableOpacity
            style={styles.addCircle}
            onPress={() => setModalVisible(true)}
            activeOpacity={0.8}
          >
            <AddIcon width={16} height={16} />
          </TouchableOpacity>
        </View>
        <FlatList
          data={playlists}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{
            paddingTop: 16,
            flexGrow: 1,
            paddingBottom: 40,
          }}
          ListEmptyComponent={
            loading ? (
              <Text style={styles.emptyText}>Loading playlists...</Text>
            ) : (
              <View style={styles.emptyState}>
                <Text style={styles.emptyTitle}>No playlists yet</Text>
                <Text style={styles.emptySubtitle}>
                  Create your first playlist and add your favorite tracks
                </Text>

                <TouchableOpacity
                  style={styles.emptyButton}
                  onPress={() => setModalVisible(true)}
                >
                  <AddIcon width={18} height={18} />
                  <Text style={styles.emptyButtonText}>Create playlist</Text>
                </TouchableOpacity>
              </View>
            )
          }
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.item}
              onPress={() => router.push(`/playlist/${item.id}`)}
              activeOpacity={0.85}
            >
              <View style={styles.itemLeft}>
                <View style={styles.iconPlaceholder}>
                  <Text style={styles.playlistIcon}>
                    <MusicIcon width={24} height={24} />
                  </Text>
                </View>

                <View>
                  <Text style={styles.itemTitle}>{item.name}</Text>
                  <Text style={styles.itemSubtitle}>
                    {item.tracks.length} songs
                  </Text>
                </View>
              </View>
              <TouchableOpacity
                onPress={() =>
                  Alert.alert(
                    "Delete playlist",
                    "Are you sure you want to delete this playlist?",
                    [
                      { text: "Cancel", style: "cancel" },
                      {
                        text: "Delete",
                        style: "destructive",
                        onPress: () => deletePlaylist(item.id),
                      },
                    ],
                  )
                }
                hitSlop={10}
              >
                <TrashIcon width={20} height={20} />
              </TouchableOpacity>
            </TouchableOpacity>
          )}
        />
        <PlaylistModal
          isVisible={isModalVisible}
          onClose={() => setModalVisible(false)}
          onCreate={async (name) => {
            await createPlaylist(name);
            setModalVisible(false);
          }}
        />
      </SafeAreaView>
    </BackgroundGradient>
  );
};

export default YourLibrary;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingHorizontal: screenPadding,
  },

  header: {
    marginTop: 24,
    marginBottom: 24,
  },

  headerTitle: {
    fontSize: 28,
    fontWeight: "700",
    color: "#fff",
  },

  playlistsRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },

  activeTab: {
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: "rgba(224,64,171,0.25)",
    borderWidth: 1,
    borderColor: "rgba(224,64,171,0.6)",
  },

  itemLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },

  activeTabText: {
    color: "#fff",
    fontWeight: "700",
  },

  addCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "#E040AB",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#E040AB",
    shadowOpacity: 0.6,
    shadowRadius: 10,
    elevation: 6,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    marginBottom: 14,
    borderRadius: 18,
    backgroundColor: "rgba(78, 28, 87, 0.55)",
    borderWidth: 1,
    borderColor: "rgba(224,64,171,0.35)",
  },
  iconPlaceholder: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: "rgba(224,64,171,0.35)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },

  playlistIcon: {
    fontSize: 24,
  },

  itemTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },

  itemSubtitle: {
    color: "rgba(255,255,255,0.6)",
    fontSize: 13,
    marginTop: 2,
  },
  emptyText: {
    color: "rgba(255,255,255,0.6)",
    textAlign: "center",
    marginTop: 40,
  },

  emptyState: {
    alignItems: "center",
    marginTop: 80,
    paddingHorizontal: 40,
  },

  emptyTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 6,
  },

  emptySubtitle: {
    color: "rgba(255,255,255,0.6)",
    textAlign: "center",
  },

  emptyButton: {
    marginTop: 24,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#E040AB",
    borderRadius: 50,
    paddingVertical: 14,
    paddingHorizontal: 28,
  },

  emptyButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 10,
  },
});
