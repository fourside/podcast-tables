import { createContext, useContext, useEffect, useState } from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";

import firebase from "../lib/firebase";

export type FirebaseUser = firebase.User | null | undefined;

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

const AuthProvider: React.FC = ({ children }) => {
  const [firebaseAuthState, setFirebaseAuthState] = useState<AuthContextProps>({ authState: "unknown" });

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
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

const uiConfig = {
  signInFlow: "redirect",
  signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
};

export const SignInButton: React.FC = () => {
  return <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />;
};
