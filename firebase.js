// Importar Firebase desde CDN
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// TU configuración (la que Firebase te dio)
const firebaseConfig = {
  apiKey: "AIzaSy....",
  authDomain: "novel-2fc9e.firebaseapp.com",
  projectId: "novel-2fc9e",
  storageBucket: "novel-2fc9e.appspot.com",
  messagingSenderId: "XXXX",
  appId: "1:XXXX:web:XXXX"
};

// Inicializar Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);