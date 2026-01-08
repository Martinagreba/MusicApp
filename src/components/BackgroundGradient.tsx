import { LinearGradient } from "expo-linear-gradient";
import { ColorValue, StyleSheet, View } from "react-native";

type Props = {
  children: React.ReactNode;
  colors?: readonly [ColorValue, ColorValue, ...ColorValue[]];
};

export default function BackgroundGradient({
  children,
  colors = ["#121212", "#1A0A3A"],
}: Props) {
  return (
    <View style={styles.wrapper}>
      <LinearGradient
        colors={colors}
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
