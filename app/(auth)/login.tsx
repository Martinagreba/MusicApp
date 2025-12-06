import AuthForm from "@/components/AuthForm";
import AuthLayout from "@/components/AuthLayout";
import { useRouter } from "expo-router";
import React from "react";
import Toast from "react-native-toast-message";

export default function Login() {
  const router = useRouter();

  const handleLogin = async (data: Record<string, string>) => {
    try {
      Toast.show({
        type: "success",
        text1: "Logged in successfully",
        text2: "Welcome back!",
      });
      router.replace("/(tabs)/home");
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Login failed",
        text2: "Please try again",
      });
    }
  };

  const goToSignUp = () => {
    router.push("/signup");
  };

  const fields = [
    { placeholder: "Email Address", name: "email" },
    { placeholder: "Password", name: "password", secureTextEntry: true },
  ];

  return (
    <AuthLayout>
      <AuthForm
        title="Log In"
        buttonText="Log In"
        footerText="Don't have an account?"
        footerLinkText="Sign Up"
        onFooterPress={goToSignUp}
        fields={fields}
        onSubmit={handleLogin}
      />
    </AuthLayout>
  );
}
