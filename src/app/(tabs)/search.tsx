import BackgroundGradient from "@/components/BackgroundGradient";
import Input from "@/components/ui/Input";
import useMusicStore from "@/store/useMusicStore";
import { useFocusEffect } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SearchIcon from "../../../assets/icons/searchIcon.svg";

const Search = () => {
  const [focused, setFocused] = useState(false);
  const { setSearchQuery, filteredTracks, clearSearch } = useMusicStore();
  const [localQuery, setLocalQuery] = useState("");

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSearchQuery(localQuery);
    }, 400);

    return () => clearTimeout(timeout);
  }, [localQuery]);

  useFocusEffect(
    useCallback(() => {
      return () => {
        clearSearch();
        setLocalQuery("");
      };
    }, [clearSearch]),
  );

  return (
    <BackgroundGradient colors={["#121212", "#1A0A3A"]}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.content}>
          <View
            style={[styles.searchContainer, focused && styles.searchFocused]}
          >
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
            keyExtractor={(item) => item.id.toString()}
            ListEmptyComponent={
              localQuery.trim().length > 0 ? (
                <Text style={styles.emptyText}>No tracks found</Text>
              ) : null
            }
            renderItem={({ item }) => (
              <View style={styles.trackRow}>
                <Image
                  source={{ uri: item.album.cover_xl }}
                  style={styles.albumCover}
                />
                <View style={styles.trackText}>
                  <Text style={styles.trackTitle} numberOfLines={1}>
                    {item.title}
                  </Text>
                  <Text style={styles.trackArtist}>{item.artist.name}</Text>
                </View>
              </View>
            )}
          />
        </View>
      </SafeAreaView>
    </BackgroundGradient>
  );
};

export default Search;

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  content: {
    paddingHorizontal: 20,
    paddingTop: 16,
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
    backgroundColor: "rgba(199,125,255,0.08)",
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
    alignItems: "center",
    marginBottom: 12,
    paddingVertical: 8,
    borderBottomColor: "rgba(255,255,255,0.1)",
    borderBottomWidth: 1,
  },
  albumCover: {
    width: 50,
    height: 50,
    borderRadius: 6,
    marginRight: 12,
  },
  trackText: {
    flex: 1,
  },
  trackTitle: {
    color: "#fff",
    fontSize: 16,
  },
  trackArtist: {
    color: "rgba(255,255,255,0.6)",
    fontSize: 13,
  },

  emptyText: {
    color: "rgba(255,255,255,0.6)",
    textAlign: "center",
    marginTop: 40,
  },
});
