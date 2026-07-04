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

const matchDate = new Date("July 10, 2026 20:00:00").getTime();

const timer = setInterval(function () {
  const now = new Date().getTime();
  const distance = matchDate - now;

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  document.getElementById("countdown").innerHTML =
    `${days}d ${hours}h ${minutes}m ${seconds}s`;

  if (distance < 0) {
    clearInterval(timer);
    document.getElementById("countdown").innerHTML =
      "🔴 Match Started! Join Room Now";
  }
}, 1000);
