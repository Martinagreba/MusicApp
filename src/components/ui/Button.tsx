import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { fontSize } from "../../constants/tokens";

type ButtonProps = {
  title: string;
  onPress: () => void;
  disabled?: boolean;
};

const Button = ({ title, onPress }: ButtonProps) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#E040AB",
    borderRadius: 50,
    paddingVertical: 16,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    marginTop: 40,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: fontSize.base,
  },
});
