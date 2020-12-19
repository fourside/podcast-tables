import firebase from "firebase/app";
import "firebase/auth";

const config = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

if (process.env.NODE_ENV !== "production") {
  firebase.auth().useEmulator("http://localhost:9099");
}

export default firebase;

export async function signOut(): Promise<void> {
  await firebase.auth().signOut();
}
