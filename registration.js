import { db, storage } from "./firebase.js";

import { ref as dbRef, set }
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

import {
  ref as storageRef,
  uploadBytes,
  getDownloadURL
}
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-storage.js";

const registerBtn = document.getElementById("registerBtn");

registerBtn.addEventListener("click", registerTeam);

async function registerTeam(){

registerBtn.disabled = true;
registerBtn.innerText = "Uploading...";

const team = document.getElementById("team").value.trim();
const captain = document.getElementById("captain").value.trim();
const bgmi = document.getElementById("bgmi").value.trim();
const phone = document.getElementById("phone").value.trim();
const entryFee = document.getElementById("entryFee").value.trim();
const utr = document.getElementById("utr").value.trim();

const screenshot =
document.getElementById("paymentScreenshot");

if(
!team ||
!captain ||
!bgmi ||
!phone ||
!entryFee ||
!utr ||
!screenshot.files.length
){

alert("⚠️ Fill all fields");

registerBtn.disabled = false;
registerBtn.innerText = "✅ Register Team";

return;

}

const file = screenshot.files[0];
const formData = new FormData();

formData.append("file", file);
formData.append("upload_preset", "bgmi_upload");

const uploadResponse = await fetch(
  "https://api.cloudinary.com/v1_1/vm140tef/image/upload",
  {
    method: "POST",
    body: formData
  }
);

const uploadData = await uploadResponse.json();

const screenshotUrl = uploadData.secure_url;
const fileName =
Date.now()+"_"+bgmi+"_"+file.name;

const imageRef =
storageRef(
storage,
"paymentScreenshots/"+fileName
);

await uploadBytes(imageRef,file);

const screenshotUrl =
await getDownloadURL(imageRef);

  try {

  await set(dbRef(db, "players/" + bgmi), {

    team: team,
    captain: captain,
    bgmi: bgmi,
    phone: phone,

    entryFee: Number(entryFee),

    utr: utr,

   paymentScreenshot: screenshotUrl,

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
  registerBtn.innerText = "✅ Register Team";

} catch (error) {

  console.error(error);

  alert("❌ " + error.message);

  registerBtn.disabled = false;
  registerBtn.innerText = "✅ Register Team";

}

}
