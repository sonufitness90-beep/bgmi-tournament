import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import { getDatabase } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

import { getStorage } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyBUVK35V3n7YE15E06NdrbTCo6INJQsLW4",
  authDomain: "bgmitournament-c0191.firebaseapp.com",
  databaseURL: "https://bgmitournament-c0191-default-rtdb.firebaseio.com",
  projectId: "bgmitournament-c0191",
  storageBucket: "bgmitournament-c0191.firebasestorage.app",
  messagingSenderId: "190277389274",
  appId: "1:190277389274:web:38aa2f7b95f54631734ee3"
};

const app = initializeApp(firebaseConfig);

const db = getDatabase(app);

const storage = getStorage(app);

export {
  db,
  storage
};
