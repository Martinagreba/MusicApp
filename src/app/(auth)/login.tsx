import AuthForm from "@/components/AuthForm";
import AuthLayout from "@/components/AuthLayout";
import { firebaseSignIn } from "@/firebase/firebaseAuth";
import { useGoogleAuth } from "@/firebase/useGoogleAuth";
import useUserStore from "@/store/userStore";
import { loginSchema, type LoginData } from "@/validation/formValidation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import React from "react";
import { useForm } from "react-hook-form";
import { Platform, Text, TouchableOpacity } from "react-native";
import Toast from "react-native-toast-message";
import { fontSize } from "../../constants/tokens";

export default function Login() {
  const router = useRouter();
  const setUser = useUserStore((s) => s.setUser);
  const setLoading = useUserStore((s) => s.setLoading);
  const { request, promptAsync } = useGoogleAuth();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const handleLogin = async (data: LoginData) => {
    try {
      setLoading(true);
      const user = await firebaseSignIn(data.email, data.password);
      setUser(user);
      Toast.show({
        type: "success",
        text1: "Logged in successfully",
        text2: "Welcome back!",
      });
      router.replace("/(tabs)/home");
    } catch (error: any) {
      Toast.show({
        type: "error",
        text1: "Login failed",
        text2: "Please try again",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <AuthForm<LoginData>
        title="Log In"
        buttonText="Log In"
        footerText="Don't have an account?"
        footerLinkText="Sign Up"
        onFooterPress={() => router.push("/signup")}
        fields={[
          { name: "email", placeholder: "Email Address" },
          { name: "password", placeholder: "Password", secureTextEntry: true },
        ]}
        onSubmit={handleLogin}
        control={control}
        errors={errors}
        handleSubmit={handleSubmit}
      />

      {Platform.OS === "android" && (
        <TouchableOpacity
          style={{
            marginTop: 10,
          }}
          onPress={() => promptAsync()}
        >
          <Text
            style={{
              color: "#ffffff",
              textAlign: "center",
              fontSize: fontSize.base,
            }}
          >
            Continue with Google
          </Text>
        </TouchableOpacity>
      )}
    </AuthLayout>
  );
}
