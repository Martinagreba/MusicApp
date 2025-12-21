import AuthForm from "@/components/AuthForm";
import AuthLayout from "@/components/AuthLayout";
import { firebaseSignUp } from "@/firebase/firebaseAuth";
import { signupSchema } from "@/validation/formValidation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import React from "react";
import { useForm } from "react-hook-form";
import Toast from "react-native-toast-message";
import useUserStore from "../../store/userStore";

export default function SignUp() {
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      userName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const setUser = useUserStore((s) => s.setUser);
  const setLoading = useUserStore((s) => s.setLoading);

  const handleSignUp = async (data: Record<string, string>) => {
    const userName = data.userName;
    const email = data.email;
    const password = data.password;

    setLoading(true);
    try {
      const user = await firebaseSignUp(email, password, userName);
      setUser(user);

      Toast.show({
        type: "success",
        text1: "Signed up successfully",
        text2: "Welcome!",
      });
      router.replace("/(tabs)/home");
    } catch (error: any) {
      let message = "Please try again";

      if (error.code === "auth/email-already-in-use") {
        message = "This email is already registered";
      }
      Toast.show({
        type: "error",
        text1: "Sign up failed",
        text2: message,
      });
    } finally {
      setLoading(false);
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
        control={control}
        errors={errors}
        handleSubmit={handleSubmit}
      />
    </AuthLayout>
  );
}
