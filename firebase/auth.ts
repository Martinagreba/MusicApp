import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "./firebaseConfig";

export const firebaseSignUp = async (
  email: string,
  password: string,
  userName: string,
) => {
  const result = await createUserWithEmailAndPassword(auth, email, password);

  await updateProfile(result.user, {
    displayName: userName,
  });

  return result.user; // повертаємо юзера
};

export const firebaseSignIn = async (email: string, password: string) => {
  const result = await signInWithEmailAndPassword(auth, email, password);

  return result.user; // повертаємо юзера
};
