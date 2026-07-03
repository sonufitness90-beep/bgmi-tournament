import { db } from "./firebase.js";
import { ref, set } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

const registerBtn = document.getElementById("registerBtn");

registerBtn.addEventListener("click", registerTeam);

async function registerTeam() {

  registerBtn.disabled = true;
  registerBtn.textContent = "Registering...";

  const team = document.getElementById("team").value.trim();
  const captain = document.getElementById("captain").value.trim();
  const bgmi = document.getElementById("bgmi").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const entryFee = document.getElementById("entryFee").value.trim();
  const utr = document.getElementById("utr").value.trim();

  const screenshot = document.getElementById("paymentScreenshot");

  if (!team || !captain || !bgmi || !phone || !entryFee || !utr) {

    alert("⚠️ Please fill all fields.");

    registerBtn.disabled = false;
    registerBtn.textContent = "✅ Register Team";

    return;
  }

  if (bgmi.length < 8) {

    alert("⚠️ Invalid BGMI UID");

    registerBtn.disabled = false;
    registerBtn.textContent = "✅ Register Team";

    return;
  }

  if (phone.length !== 10) {

    alert("⚠️ Enter valid phone number");

    registerBtn.disabled = false;
    registerBtn.textContent = "✅ Register Team";

    return;
  }

  if (!screenshot.files.length) {

    alert("⚠️ Please select payment screenshot");

    registerBtn.disabled = false;
    registerBtn.textContent = "✅ Register Team";

    return;
  }
  let screenshotName = "";

  if (screenshot.files.length) {
    screenshotName = screenshot.files[0].name;
  }

  try {

    await set(ref(db, "players/" + bgmi), {

      team: team,
      captain: captain,
      bgmi: bgmi,
      phone: phone,

      entryFee: Number(entryFee),

      utr: utr,

      paymentScreenshot: screenshotName,

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
    screenshot.value = "";

      registerBtn.disabled = false;
    registerBtn.textContent = "✅ Register Team";

  } catch (error) {

    console.error(error);

    alert("❌ " + error.message);

    registerBtn.disabled = false;
    registerBtn.textContent = "✅ Register Team";

  }

}
