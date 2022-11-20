import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCtW4wRkk9RJUE3YMKLA9XdwVkejOfX68M",
  authDomain: "react-az.firebaseapp.com",
  projectId: "react-az",
  storageBucket: "react-az.appspot.com",
  messagingSenderId: "539211936151",
  appId: "1:539211936151:web:09dff13f5d0b7cc33914d2"
};
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
