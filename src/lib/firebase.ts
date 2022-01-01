import firebase from "firebase/compat/app";
import { FirebaseOptions } from "firebase/app";
import "firebase/compat/auth";

const config: FirebaseOptions = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

export default firebase;

export async function signOut(): Promise<void> {
  await firebase.auth().signOut();
}
