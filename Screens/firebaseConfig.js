
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

export const firebaseConfig = {
  apiKey: "AIzaSyBS6GBbIpyKX2SjxbS-f7a0U-d_gObAGiI",
  authDomain: "bustrackingapp-dcb77.firebaseapp.com",
  projectId: "bustrackingapp-dcb77",
  storageBucket: "bustrackingapp-dcb77.firebasestorage.app",
  messagingSenderId: "572604738702",
  appId: "1:572604738702:web:7ecdb9c6cb793e97d6eddf",
  measurementId: "G-1DK30GB16E"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);