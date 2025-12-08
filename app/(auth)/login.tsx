import AuthForm from "@/components/AuthForm";
import AuthLayout from "@/components/AuthLayout";
import { firebaseSignIn } from "@/firebase/auth";
import useUserStore from "@/store/userStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import React from "react";
import { useForm } from "react-hook-form";
import Toast from "react-native-toast-message";
import { loginSchema } from "../../validation/formValidation";

export default function Login() {
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const setUser = useUserStore((s) => s.setUser);
  const setLoading = useUserStore((s) => s.setLoading);

  const handleLogin = async (data: Record<string, string>) => {
    const email = data.email;
    const password = data.password;

    setLoading(true);
    try {
      const user = await firebaseSignIn(email, password);
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
        control={control}
        errors={errors}
        handleSubmit={handleSubmit}
      />
    </AuthLayout>
  );
}
