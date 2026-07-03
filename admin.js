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
