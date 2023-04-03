import { FirebaseApp, FirebaseOptions, initializeApp } from "firebase/app";
import { getAuth, signOut as firebaseSignOut } from "firebase/auth";

const config: FirebaseOptions = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
};

let firebaseApp: FirebaseApp | undefined = undefined;

export function initializeFirebaseApp(): void {
  if (firebaseApp === undefined) {
    firebaseApp = initializeApp(config);
  }
}

export async function signOut(): Promise<void> {
  const auth = getAuth();
  await firebaseSignOut(auth);
}
