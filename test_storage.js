import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadString, getDownloadURL } from "firebase/storage";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import fs from "fs";

const config = JSON.parse(fs.readFileSync("./firebase-applet-config.json", "utf-8"));
const app = initializeApp({
  apiKey: config.apiKey,
  authDomain: config.authDomain,
  projectId: config.projectId,
  storageBucket: config.storageBucket,
  messagingSenderId: config.messagingSenderId,
  appId: config.appId
});

const storage = getStorage(app);
const auth = getAuth(app);

async function test() {
  try {
    console.log("Signing in...");
    await signInWithEmailAndPassword(auth, "admin@sanatan.org", "100800");
    console.log("Signed in. Uploading...");
    
    const fileRef = ref(storage, "test/test.txt");
    await uploadString(fileRef, "Hello World");
    
    const url = await getDownloadURL(fileRef);
    console.log("Upload success, URL:", url);
    process.exit(0);
  } catch(e) {
    console.error("Failed:", e.message);
    process.exit(1);
  }
}
test();
