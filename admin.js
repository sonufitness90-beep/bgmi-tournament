import { db } from "./firebase.js";
import {
  ref,
  onValue,
  update,
  remove,
  set
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

const pendingDiv = document.getElementById("pendingPlayers");
const approvedDiv = document.getElementById("approvedPlayers");

const totalTeams = document.getElementById("totalTeams");
const pendingCount = document.getElementById("pendingCount");
const approvedCount = document.getElementById("approvedCount");

const searchInput = document.getElementById("searchInput");
const saveNotice = document.getElementById("saveNotice");
const notice = document.getElementById("notice");

let allTeams = [];

function loadPlayers(){

const playersRef = ref(db,"players");

onValue(playersRef,(snapshot)=>{

pendingDiv.innerHTML="";
approvedDiv.innerHTML="";

allTeams=[];

let total=0;
let pending=0;
let approved=0;

if(!snapshot.exists()){

pendingDiv.innerHTML="<h3>No Teams Found</h3>";
approvedDiv.innerHTML="<h3>No Approved Teams</h3>";

totalTeams.innerText="0";
pendingCount.innerText="0";
approvedCount.innerText="0";

return;

}

snapshot.forEach((child)=>{

const data=child.val();
const id=child.key;

allTeams.push({
id:id,
...data
});

total++;

if(data.approved){
approved++;
}else{
pending++;
}

let html=`
<div class="player">

<h3>🏆 ${data.team}</h3>

<p><b>Captain :</b> ${data.captain}</p>

<p><b>BGMI UID :</b> ${data.bgmi}</p>

<p><b>Phone :</b> ${data.phone}</p>

<p><b>Entry Fee :</b> ₹${data.entryFee || 0}</p>

<p><b>UTR :</b> ${data.utr || "N/A"}</p>
`;
      if (data.approved) {

        html += `

<p><b>Status :</b> 🟢 Approved</p>

<p><b>Room ID :</b> ${data.roomId || "Not Set"}</p>

<p><b>Room Password :</b> ${data.roomPass || "Not Set"}</p>

<button onclick="setRoom('${id}')">
🎮 Set Room
</button>

<button onclick="deletePlayer('${id}')">
🗑 Delete Team
</button>

`;

approvedDiv.innerHTML += html + "</div>";

}else{

html += `

<p><b>Status :</b> 🟡 Pending Approval</p>

<button onclick="approvePlayer('${id}')">
✅ Approve Team
</button>

<button onclick="deletePlayer('${id}')">
🗑 Delete Team
</button>

`;

pendingDiv.innerHTML += html + "</div>";

}

});

totalTeams.innerText=total;
pendingCount.innerText=pending;
approvedCount.innerText=approved;

});

}

searchInput.addEventListener("keyup",()=>{

const value=searchInput.value.toLowerCase();

document.querySelectorAll(".player").forEach(card=>{

if(card.innerText.toLowerCase().includes(value)){

card.style.display="block";

}else{

card.style.display="none";

}

});

});

window.approvePlayer = async function(id){

    const ok = confirm("Approve this team?");
    if(!ok) return;

    try{

        await update(ref(db,"players/"+id),{
            approved:true,
            paymentVerified:true
        });

        alert("✅ Team Approved");

    }catch(error){
        alert(error.message);
    }

};

window.setRoom = async function(id){

    const roomId = prompt("Enter Room ID");
    if(roomId===null) return;

    const roomPass = prompt("Enter Room Password");
    if(roomPass===null) return;

    try{

        await update(ref(db,"players/"+id),{
            roomId:roomId,
            roomPass:roomPass
        });

        alert("✅ Room Details Saved");

    }catch(error){
        alert(error.message);
    }

};

window.deletePlayer = async function(id){

    const teamName = prompt("Type DELETE to confirm team deletion");

if (teamName !== "DELETE") {
    alert("❌ Deletion cancelled");
    return;
}

    try{

        await remove(ref(db,"players/"+id));

        alert("🗑 Team Deleted");

    }catch(error){
        alert(error.message);
    }

};

saveNotice.addEventListener("click",async()=>{

    try{

        await set(ref(db,"notice"),{
            message:notice.value
        });

        alert("📢 Notice Saved");

    }catch(error){
        alert(error.message);
    }

});

loadPlayers();
