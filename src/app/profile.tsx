import BackgroundGradient from "@/components/BackgroundGradient";
import usePlaylistStore from "@/store/usePlaylistStore";
import useUserStore from "@/store/userStore";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { screenPadding } from "../constants/tokens";

import Input from "@/components/ui/Input";

import EditIcon from "../../assets/icons/editIcon.svg";
import LogoutIcon from "../../assets/icons/logOut.svg";
import PrevPageIcon from "../../assets/icons/prevPage.svg";
import ProfileIcon from "../../assets/icons/profileIcon.svg";

const Profile = () => {
  const router = useRouter();

  const { userName, loadCurrentUser, updateUserName, logout } = useUserStore();
  const { playlists, fetchPlaylists } = usePlaylistStore();

  const [editing, setEditing] = useState(false);
  const [newName, setNewName] = useState("");

  useEffect(() => {
    loadCurrentUser();
    fetchPlaylists();
  }, []);

  const playlistsCount = playlists.length;

  const startEdit = () => {
    setNewName(userName || "");
    setEditing(true);
  };

  const cancelEdit = () => {
    setEditing(false);
    setNewName(userName || "");
  };

  const saveName = async () => {
    if (!newName.trim()) {
      Alert.alert("Error", "Name cannot be empty");
      return;
    }

    await updateUserName(newName.trim());
    setEditing(false);
  };

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to log out?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        style: "destructive",
        onPress: async () => {
          await logout();
          router.replace("/");
        },
      },
    ]);
  };

  return (
    <BackgroundGradient colors={["#121212", "#1A0A3A"]}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.replace("/(tabs)/home")}>
            <PrevPageIcon width={20} height={20} />
          </TouchableOpacity>
        </View>

        <View style={styles.profileRow}>
          <ProfileIcon width={70} height={70} />

          <View style={styles.profileInfo}>
            {!editing ? (
              <View style={styles.nameRow}>
                <Text style={styles.userName}>{userName || "User"}</Text>
                <TouchableOpacity onPress={startEdit}>
                  <EditIcon width={18} height={18} />
                </TouchableOpacity>
              </View>
            ) : (
              <View style={styles.nameRow}>
                <Input
                  value={newName}
                  onChangeText={setNewName}
                  style={styles.input}
                  placeholder="Your name"
                />
                <TouchableOpacity onPress={saveName}>
                  <Text style={styles.saveText}>Save</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={cancelEdit}>
                  <Text style={styles.cancelText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>

        <Text style={styles.playlistsText}>
          Playlists count: {playlistsCount}
        </Text>

        <View style={styles.logoutWrapper}>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <LogoutIcon width={18} height={18} />
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </BackgroundGradient>
  );
};

export default Profile;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingHorizontal: screenPadding,
  },

  header: {
    paddingTop: 40,
  },

  profileRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 30,
    gap: 16,
  },

  profileInfo: {
    flex: 1,
  },

  nameRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  userName: {
    color: "#ffffff",
    fontSize: 22,
    fontWeight: "600",
  },

  playlistsText: {
    marginTop: 20,
    color: "#ffffff",
    fontSize: 20,
    fontWeight: "600",
  },

  input: {
    flex: 1,
  },

  saveText: {
    color: "#6C4EF6",
    fontWeight: "600",
  },

  cancelText: {
    color: "#aaaaaa",
    fontWeight: "600",
  },

  logoutWrapper: {
    paddingBottom: 24,
    marginTop: "auto",
  },

  logoutButton: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    borderRadius: 50,

    backgroundColor: "rgba(224, 64, 171, 0.12)",
  },

  logoutText: {
    marginLeft: 8,
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
});
