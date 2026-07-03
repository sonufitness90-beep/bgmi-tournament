import { db } from "./firebase.js";
import {
  ref,
 onValue,
  update,
  remove
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

const pendingDiv = document.getElementById("pendingPlayers");
const approvedDiv = document.getElementById("approvedPlayers");

function loadPlayers() {

  const playersRef = ref(db, "players");

  onValue(playersRef, (snapshot) => {

    pendingDiv.innerHTML = "";
    approvedDiv.innerHTML = "";

    if (!snapshot.exists()) {
      pendingDiv.innerHTML = "<h3>No Teams Found</h3>";
      approvedDiv.innerHTML = "<h3>No Approved Teams</h3>";
      return;
    }

    snapshot.forEach((child) => {

      const data = child.val();
      const id = child.key;

      let html = `
      <div class="player">

      <h3>🏆 ${data.team}</h3>

      <p><b>Captain:</b> ${data.captain}</p>

      <p><b>BGMI UID:</b> ${data.bgmi}</p>

      <p><b>Phone:</b> ${data.phone}</p>

      <p><b>Entry Fee:</b> ₹${data.entryFee}</p>

      <p><b>UTR:</b> ${data.utr}</p>
      `;
