import { Stack } from "expo-router";
import Toast from "react-native-toast-message";
import toastConfig from "../components/toastConfig";

export default function RootLayout() {
  return (
    <>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(tabs)" />
      </Stack>
      <Toast config={toastConfig} topOffset={50} />
    </>
  );
}
