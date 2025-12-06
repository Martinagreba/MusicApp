import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, View } from "react-native";

type Props = {
  children: React.ReactNode;
};

export default function BackgroundGradient({ children }: Props) {
  return (
    <View style={styles.wrapper}>
      <LinearGradient
        pointerEvents="none"
        colors={["#121212", "#1A0A3A"]}
        style={StyleSheet.absoluteFill}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
});
