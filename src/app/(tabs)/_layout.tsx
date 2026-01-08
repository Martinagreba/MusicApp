import MiniPlayer from "@/components/MiniPlayer";
import usePlayerStore from "@/store/usePlayerStore";
import { Tabs, useRouter } from "expo-router";
import React from "react";
import { View } from "react-native";

import HomeIcon from "../../../assets/icons/homeIcon.svg";
import LibraryIcon from "../../../assets/icons/libraryIcon.svg";
import SearchIcon from "../../../assets/icons/searchIcon.svg";
import { fontSize } from "../../constants/tokens";

export default function TabsLayout() {
  const router = useRouter();
  const { currentTrackId } = usePlayerStore();

  return (
    <View style={{ flex: 1 }}>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: "#FFFFFF",
          tabBarInactiveTintColor: "#ebe4e4ff",
          tabBarStyle: {
            backgroundColor: "#1A0A3A",
            height: 80,
            paddingBottom: 10,
            paddingTop: 10,
          },
          tabBarLabelStyle: {
            fontSize: fontSize.sm,
          },
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: "Home",
            tabBarIcon: ({ color, focused }) => (
              <HomeIcon
                width={20}
                height={20}
                fill={focused ? color : "none"}
                stroke={focused ? "none" : color}
                strokeWidth={1.5}
              />
            ),
          }}
        />

        <Tabs.Screen
          name="search"
          options={{
            title: "Search",
            tabBarIcon: ({ color, focused }) => (
              <SearchIcon
                width={16}
                height={16}
                fill={focused ? color : "none"}
                stroke={focused ? "none" : color}
                strokeWidth={1.5}
              />
            ),
          }}
        />

        <Tabs.Screen
          name="yourLibrary"
          options={{
            title: "Library",
            tabBarIcon: ({ color, focused }) => (
              <LibraryIcon
                width={16}
                height={16}
                fill={focused ? color : "none"}
                stroke={focused ? "none" : color}
                strokeWidth={1.5}
              />
            ),
          }}
        />
      </Tabs>

      {currentTrackId && (
        <MiniPlayer onPress={() => router.push(`/track/${currentTrackId}`)} />
      )}
    </View>
  );
}
