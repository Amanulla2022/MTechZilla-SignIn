import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDap2WfJYZwJTgts9v7gTBw0aqvGp0K80Q",
  authDomain: "mtechzilla-timer.firebaseapp.com",
  projectId: "mtechzilla-timer",
  storageBucket: "mtechzilla-timer.appspot.com",
  messagingSenderId: "489824658735",
  appId: "1:489824658735:web:a424a5e029b0c0fd8dedda",
  measurementId: "G-TW09LCZ0YB",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
