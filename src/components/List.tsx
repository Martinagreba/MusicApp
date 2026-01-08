import { fontSize } from "@/constants/tokens";
import { Track } from "@/store/useMusicStore";
import React from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type ListProps = {
  popularTracks: Track[];
  title: string;
  onTrackPress?: (trackIndex: number) => void;
};

export const List = ({ popularTracks, title, onTrackPress }: ListProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <FlatList
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        data={popularTracks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            style={styles.trackCard}
            onPress={() => onTrackPress?.(index)}
          >
            <Image
              style={styles.trackImg}
              source={{ uri: item.album.cover_xl }}
            />
            <View style={styles.musicInfo}>
              <Text style={styles.trackTitle} numberOfLines={1}>
                {item.title}
              </Text>
              <Text style={styles.artistName} numberOfLines={1}>
                {item.artist.name}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },

  musicInfo: {
    flex: 1,
    marginTop: 5,
  },
  trackCard: {
    width: 120,
    marginLeft: 20,
    marginBottom: 12,
    alignItems: "flex-start",
  },
  trackTitle: {
    fontSize: fontSize.base,
    color: "#ffffff",
    fontWeight: "bold",
  },
  trackImg: {
    width: 120,
    height: 120,
    borderRadius: 8,
  },
  artistName: {
    fontSize: fontSize.sm,
    color: "#ffffff",
  },
  title: {
    fontSize: fontSize.lg,
    fontWeight: "bold",
    color: "#ffffff",
    marginLeft: 20,
    marginBottom: 12,
  },
});
