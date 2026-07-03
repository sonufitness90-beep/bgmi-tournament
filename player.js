import { db } from "./firebase.js";
import {
  ref,
  get
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

const searchBtn = document.getElementById("searchBtn");
const result = document.getElementById("result");

searchBtn.addEventListener("click", searchPlayer);

async function searchPlayer() {

  const bgmi = document.getElementById("bgmi").value.trim();

  if (!bgmi) {
    alert("Enter BGMI UID");
    return;
  }

  result.innerHTML = "Loading...";

  try {

    const snapshot = await get(ref(db, "players/" + bgmi));

    if (!snapshot.exists()) {

      result.innerHTML = `
      <div class="card">
      <h3>❌ Team Not Found</h3>
      </div>
      `;

      return;
    }

    const data = snapshot.val();

    let html = `
    <div class="player">

    <h2>🏆 ${data.team}</h2>

    <p><b>Captain:</b> ${data.captain}</p>

    <p><b>BGMI UID:</b> ${data.bgmi}</p>

    <p><b>Phone:</b> ${data.phone}</p>

    <p><b>Entry Fee:</b> ₹${data.entryFee}</p>

    <p><b>UTR:</b> ${data.utr}</p>
    `;

    if (data.approved) {

      html += `
      <p>🟢 <b>Status:</b> Approved</p>

      <p><b>Room ID:</b> ${data.roomId || "Not Available"}</p>

      <p><b>Room Password:</b> ${data.roomPass || "Not Available"}</p>
      `;

    } else {

      html += `
      <p>🟡 <b>Status:</b> Pending Approval</p>
      <p>Please wait for Admin Approval.</p>
      `;

    }

    html += "</div>";

    result.innerHTML = html;

  } catch (error) {

    console.error(error);

    result.innerHTML = `
    <div class="card">
    <h3>❌ Error Loading Data</h3>
    </div>
    `;

  }

}
