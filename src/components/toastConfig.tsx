import React from "react";
import { Text, View } from "react-native";
import { vh, vw } from "react-native-css-vh-vw";
import { ToastConfig, ToastConfigParams } from "react-native-toast-message";

import HeartBroken from "../../assets/icons/heartBroken.svg";
import HeartIcon from "../../assets/icons/heartIcon.svg";

type CustomParams = {
  text1?: string;
  text2?: string;
};

const toastConfig: ToastConfig = {
  error: ({ text1, text2 }: ToastConfigParams<CustomParams>) => (
    <View
      style={{
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "flex-start",
        width: vw(90),
        height: vh(8),
        backgroundColor: "#ffffff",
        padding: 12,
        borderRadius: 10,
      }}
    >
      {text1 && (
        <View style={{ flexDirection: "row", gap: 5 }}>
          <Text style={{ color: "#9B0101", fontSize: 16, fontWeight: "600" }}>
            {text1}
          </Text>
          <HeartBroken />
        </View>
      )}
      {text2 && <Text style={{ color: "#9B0101", fontSize: 14 }}>{text2}</Text>}
    </View>
  ),

  success: ({ text1, text2 }: ToastConfigParams<CustomParams>) => (
    <View
      style={{
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "flex-start",
        width: vw(90),
        height: vh(8),
        backgroundColor: "#E040AB",
        padding: 12,
        borderRadius: 10,
      }}
    >
      {text1 && (
        <Text style={{ color: "#ffffff", fontSize: 16, fontWeight: "600" }}>
          {text1}
        </Text>
      )}
      {text2 && (
        <View style={{ flexDirection: "row", gap: 5 }}>
          <Text style={{ color: "#ffffff", fontSize: 14 }}>{text2}</Text>
          <HeartIcon />
        </View>
      )}
    </View>
  ),
};

export default toastConfig;
