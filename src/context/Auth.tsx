import { createContext, useContext, useEffect, useState } from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";

import firebase from "../lib/firebase";

type AuthContextProps = {
  currentUser: firebase.User | null | undefined;
};

const AuthContext = createContext<AuthContextProps>({ currentUser: undefined });

const AuthProvider: React.FC = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<firebase.User | null | undefined>(undefined);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      setCurrentUser(user);
    });
    return unsubscribe;
  }, []);

  return <AuthContext.Provider value={{ currentUser: currentUser }}>{children}</AuthContext.Provider>;
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
