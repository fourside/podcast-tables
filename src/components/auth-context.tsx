import {
  GoogleAuthProvider,
  User,
  signOut as firebaseSignOut,
  getAuth,
  onAuthStateChanged,
  signInWithRedirect,
} from "firebase/auth";
import { FC, PropsWithChildren, createContext, useContext, useEffect, useState } from "react";
import { initializeFirebaseApp } from "../lib/firebase";

export type FirebaseUser = User;

type AuthStateType =
  | {
      type: "authenticated";
      user: FirebaseUser;
    }
  | {
      type: "not_authenticated";
    }
  | {
      type: "initialized";
    };

const AuthContext = createContext<AuthStateType>({ type: "initialized" });

const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthStateType>({ type: "initialized" });

  useEffect(() => {
    initializeFirebaseApp();
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user === null) {
        setAuthState({ type: "not_authenticated" });
      } else {
        setAuthState({ type: "authenticated", user });
      }
    });
    return unsubscribe;
  }, []);

  return <AuthContext.Provider value={authState}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthProvider };

export const useAuth: () => AuthStateType = () => {
  return useContext(AuthContext);
};

export function signIn(): Promise<void> {
  return signInWithRedirect(getAuth(), new GoogleAuthProvider());
}

export async function signOut(): Promise<void> {
  await firebaseSignOut(getAuth());
}
