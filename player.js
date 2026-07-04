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

    const snapshot = await get(ref(db, "players"));

    if (!snapshot.exists()) {
      result.innerHTML = "<div class='card'><h3>❌ Team Not Found</h3></div>";
      return;
    }

    let found = null;

    snapshot.forEach(child => {
      const data = child.val();
      if (data.bgmi == bgmi) {
        found = data;
      }
    });

    if (!found) {
      result.innerHTML = "<div class='card'><h3>❌ Team Not Found</h3></div>";
      return;
    }

    let html = `
      <div class="player">
      <h2>🏆 ${found.team}</h2>

      <p><b>Captain:</b> ${found.captain}</p>
      <p><b>BGMI UID:</b> ${found.bgmi}</p>
      <p><b>Phone:</b> ${found.phone}</p>
      <p><b>Entry Fee:</b> ₹${found.entryFee}</p>
      <p><b>UTR:</b> ${found.utr}</p>
    `;

    if (found.approved) {
      html += `
      <p>🟢 <b>Status:</b> Approved</p>
      <p><b>Room ID:</b> ${found.roomId || "Not Available"}</p>
      <p><b>Room Password:</b> ${found.roomPass || "Not Available"}</p>
      `;
    } else {
      html += `
      <p>🟡 <b>Status:</b> Pending Approval</p>
      <p>Please wait for Admin Approval.</p>
      `;
    }

    html += "</div>";

    result.innerHTML = html;

  } catch (err) {
    console.error(err);
    result.innerHTML = "<div class='card'><h3>❌ Error Loading Data</h3></div>";
  }

}
