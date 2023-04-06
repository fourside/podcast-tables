import { GoogleAuthProvider, User, getAuth, onAuthStateChanged, signInWithRedirect } from "firebase/auth";
import { FC, PropsWithChildren, createContext, useContext, useEffect, useState } from "react";
import { initializeFirebaseApp } from "../lib/firebase";

export type FirebaseUser = User | null | undefined;

type AuthedProps = {
  authState: "success";
  user: FirebaseUser;
};
type UnauthedProps = {
  authState: "fail";
  user?: null;
};
type unknownAuthProps = {
  authState: "unknown";
  user?: null;
};

type AuthContextProps = AuthedProps | UnauthedProps | unknownAuthProps;

const AuthContext = createContext<AuthContextProps>({ authState: "unknown" });

const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const [firebaseAuthState, setFirebaseAuthState] = useState<AuthContextProps>({ authState: "unknown" });

  useEffect(() => {
    initializeFirebaseApp();
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log("onAuthStateChanged", user);
      if (user === null) {
        setFirebaseAuthState({ authState: "fail" });
      } else {
        setFirebaseAuthState({ authState: "success", user });
      }
    });
    return unsubscribe;
  }, []);

  return <AuthContext.Provider value={firebaseAuthState}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthProvider };

export const useAuth: () => AuthContextProps = () => {
  return useContext(AuthContext);
};

export function signIn(): Promise<void> {
  return signInWithRedirect(getAuth(), new GoogleAuthProvider());
}
