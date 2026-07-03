import { db } from "./firebase.js";
import {
  ref,
  set
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

const registerBtn = document.getElementById("registerBtn");

registerBtn.addEventListener("click", registerTeam);

async function registerTeam() {

  const team = document.getElementById("team").value.trim();
  const captain = document.getElementById("captain").value.trim();
  const bgmi = document.getElementById("bgmi").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const entryFee = document.getElementById("entryFee").value.trim();
  const utr = document.getElementById("utr").value.trim();

  if (!team || !captain || !bgmi || !phone || !entryFee || !utr) {
    alert("⚠️ Please fill all fields.");
    return;
  }

  try {

    await set(ref(db, "players/" + bgmi), {
      team: team,
      captain: captain,
      bgmi: bgmi,
      phone: phone,
      entryFee: entryFee,
      utr: utr,
      approved: false,
      paymentVerified: false,
      roomId: "",
      roomPass: "",
      createdAt: Date.now()
    });

    alert("✅ Registration Successful!");

    document.getElementById("team").value = "";
    document.getElementById("captain").value = "";
    document.getElementById("bgmi").value = "";
    document.getElementById("phone").value = "";
    document.getElementById("entryFee").value = "";
    document.getElementById("utr").value = "";

  } catch (error) {
    alert("❌ Error: " + error.message);
    console.error(error);
  }

        }
