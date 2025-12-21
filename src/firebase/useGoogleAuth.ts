import useUserStore from "@/store/userStore";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import { GoogleAuthProvider, signInWithCredential } from "firebase/auth";
import { useEffect } from "react";
import Toast from "react-native-toast-message";
import { auth } from "./firebaseConfig";

WebBrowser.maybeCompleteAuthSession();

export const useGoogleAuth = () => {
  const setUser = useUserStore((s) => s.setUser);
  const setLoading = useUserStore((s) => s.setLoading);

  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId:
      "613961710706-9ng3ovifkke3feku6c8mjftqfnr1u49k.apps.googleusercontent.com",
    iosClientId:
      "613961710706-ifdghght883j3o337cok2bmej07j7e60.apps.googleusercontent.com",
    webClientId:
      "613961710706-i34d9hcor14rurl4liai0koo7mj09j00.apps.googleusercontent.com",
    scopes: ["openid", "profile", "email"],
  });

  useEffect(() => {
    if (response?.type !== "success") return;

    const idToken = response.params?.id_token;

    if (!idToken) {
      console.error("No id_token received", response);
      return;
    }

    const login = async () => {
      try {
        setLoading(true);

        const credential = GoogleAuthProvider.credential(idToken);
        const userCredential = await signInWithCredential(auth, credential);

        setUser(userCredential.user);
        Toast.show({
          type: "success",
          text1: "Logged in successfully",
          text2: "Welcome back!",
        });
      } catch (error: any) {
        Toast.show({
          type: "error",
          text1: "Login Failed",
          text2: "Please try again",
        });
      } finally {
        setLoading(false);
      }
    };

    login();
  }, [response]);

  return { request, promptAsync };
};
