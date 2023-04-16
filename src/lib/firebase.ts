import { FirebaseApp, FirebaseOptions, initializeApp } from "firebase/app";

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
