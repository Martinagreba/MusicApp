import AuthForm from "@/components/AuthForm";
import AuthLayout from "@/components/AuthLayout";
import { useRouter } from "expo-router";
import React from "react";
import Toast from "react-native-toast-message";

export default function SignUp() {
  const router = useRouter();

  const handleSignUp = async (data: Record<string, string>) => {
    try {
      Toast.show({
        type: "success",
        text1: "Signed up successfully",
        text2: "Welcome!",
      });
      router.replace("/(tabs)/home");
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Sign up failed",
        text2: "Please try again.",
      });
    }
  };

  const goToLogin = () => {
    router.push("/login");
  };

  const fields = [
    { placeholder: "User Name", name: "userName" },
    { placeholder: "Email Address", name: "email" },
    { placeholder: "Password", name: "password", secureTextEntry: true },
    {
      placeholder: "Confirm Password",
      name: "confirmPassword",
      secureTextEntry: true,
    },
  ];

  return (
    <AuthLayout scrollable>
      <AuthForm
        title="Sign Up"
        buttonText="Sign Up"
        footerText="Already have an account?"
        footerLinkText="Log In"
        onFooterPress={goToLogin}
        fields={fields}
        onSubmit={handleSignUp}
      />
    </AuthLayout>
  );
}
