import { db } from "./firebase.js";
import { ref, onValue } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

const registeredTeams = document.getElementById("registeredTeams");
const slotsLeft = document.getElementById("slotsLeft");

const TOTAL_SLOTS = 100;

onValue(ref(db, "players"), (snapshot) => {

    let count = 0;

    if (snapshot.exists()) {
        snapshot.forEach(() => count++);
    }

    if (registeredTeams) registeredTeams.textContent = count;
    if (slotsLeft) slotsLeft.textContent = TOTAL_SLOTS - count;

});
