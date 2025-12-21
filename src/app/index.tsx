import BackgroundGradient from "@/components/BackgroundGradient";
import { useRouter } from "expo-router";
import { Image, StyleSheet, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ArrowIcon from "../../assets/icons/arrowIcon.svg";
import { fontSize, screenPadding } from "../constants/tokens";

const logo = require("../../assets/logo/logo.png");

export default function Index() {
  const router = useRouter();

  const handleGetStarted = () => {
    router.push("/(auth)/login");
  };
  return (
    <BackgroundGradient>
      <SafeAreaView style={styles.safeArea}>
        <Image source={logo} style={styles.logo} />
        <TouchableOpacity style={styles.button} onPress={handleGetStarted}>
          <Text style={styles.buttonText}>Get Started</Text>
          <ArrowIcon width={16} height={12} />
        </TouchableOpacity>
      </SafeAreaView>
    </BackgroundGradient>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: screenPadding,
  },
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  logo: {
    height: 320,
    width: 314,
    marginBottom: 60,
  },
  button: {
    backgroundColor: "#E040AB",
    borderRadius: 50,
    paddingVertical: 16,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  buttonText: {
    fontSize: fontSize.base,
    color: "#FFFFFF",
    marginRight: 10,
  },
});
