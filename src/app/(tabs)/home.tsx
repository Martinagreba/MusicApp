import BackgroundGradient from "@/components/BackgroundGradient";
import { List } from "@/components/List";
import usePopularMusic from "@/hooks/usePopularMusic";
import { useRouter } from "expo-router";
import React from "react";
import {
  ActivityIndicator,
  ScrollView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ProfileIcon from "../../../assets/icons/profileIcon.svg";

const Home = () => {
  const router = useRouter();
  const { loading, genreTracks } = usePopularMusic();
  return (
    <BackgroundGradient>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          {!loading && (
            <TouchableOpacity onPress={() => router.replace("/profile")}>
              <ProfileIcon width={30} height={30} />
            </TouchableOpacity>
          )}
        </View>
        <ScrollView style={styles.list}>
          {loading && <ActivityIndicator size="large" color="#688EFF" />}

          {!loading &&
            genreTracks?.map(
              (genre) =>
                genre.tracks?.length > 0 && (
                  <List
                    key={genre.id}
                    title={genre.name}
                    popularTracks={genre.tracks}
                  />
                ),
            )}
        </ScrollView>
      </SafeAreaView>
    </BackgroundGradient>
  );
};

export default Home;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingHorizontal: 0,
  },
  header: {
    marginLeft: 20,
    marginBottom: 24,
  },

  list: {},
  musicInfo: {
    flex: 1,
  },
});
