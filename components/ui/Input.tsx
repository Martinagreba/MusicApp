import { StyleSheet, TextInput, TextInputProps } from "react-native";
import { fontSize } from "../../constants/tokens";

export default function Input({
  style,
  ...props
}: TextInputProps & { style?: any }) {
  return (
    <TextInput
      style={[styles.input, style]}
      placeholderTextColor="#E8E8E8"
      autoCapitalize="none"
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: "transparent",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E040AB",
    fontSize: fontSize.sm,
    paddingVertical: 16,
    paddingHorizontal: 14,
    color: "#FFFFFF",
  },
});
