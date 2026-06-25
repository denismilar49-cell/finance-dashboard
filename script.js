let tab = "home";
let deals = [];
let editIndex = null;

/* =========================
   LOAD / SAVE
========================= */

function loadDeals(){
const data = localStorage.getItem("deals");
if(data){
deals = JSON.parse(data);
}
}

function saveDeals(){
localStorage.setItem("deals", JSON.stringify(deals));
}

/* =========================
   TAB SWITCH
========================= */

function setTab(t, event){

tab = t;

document.querySelectorAll(".sidebar button")
.forEach(b=>b.classList.remove("active"));

if(event){
event.target.classList.add("active");
}

render();
}

/* =========================
   ADD / EDIT
========================= */

function addDeal(){

const name = document.getElementById("name").value;
const buy = +document.getElementById("buy").value;
const sell = +document.getElementById("sell").value;

if(!name) return;

const profit = sell - buy;

const obj = {name,buy,sell,profit,tab};

if(editIndex !== null){
deals[editIndex] = obj;
editIndex = null;
}else{
deals.push(obj);
}

saveDeals();

clear();
render();
}

/* =========================
   EDIT
========================= */

function editDeal(i){
const d = deals[i];

document.getElementById("name").value = d.name;
document.getElementById("buy").value = d.buy;
document.getElementById("sell").value = d.sell;

editIndex = i;
}

/* =========================
   DELETE
========================= */

function deleteDeal(i){
deals.splice(i,1);
saveDeals();
render();
}

/* =========================
   CLEAR INPUTS
========================= */

function clear(){
document.getElementById("name").value = "";
document.getElementById("buy").value = "";
document.getElementById("sell").value = "";
}

/* =========================
   FILTER
========================= */

function getFiltered(){
return deals.filter(d=>d.tab === tab);
}

/* =========================
   RENDER UI
========================= */

function render(){

const list = getFiltered();

/* STATS */
let total = deals.reduce((s,d)=>s+d.profit,0);
let avg = deals.length ? total/deals.length : 0;

let best = deals.reduce((m,d)=>d.profit>m.profit?d:m,{profit:-Infinity});

document.getElementById("count").textContent = deals.length;
document.getElementById("profit").textContent = "$"+total;
document.getElementById("avg").textContent = "$"+avg.toFixed(2);
document.getElementById("best").textContent =
best.name ? `${best.name} ($${best.profit})` : "—";

/* LIST */
document.getElementById("list").innerHTML =
list.map((d)=>`
<div class="deal">

<h3>${d.name}</h3>
<p>${d.buy} → ${d.sell}</p>
<div class="profit">+$${d.profit}</div>

<div class="actions">
<button onclick="editDeal(${deals.indexOf(d)})">✏️</button>
<button onclick="deleteDeal(${deals.indexOf(d)})">🗑</button>
</div>

</div>
`).join("");

drawChart();
}

/* =========================
   SIMPLE CHART
========================= */

function drawChart(){

const canvas = document.getElementById("chart");
if(!canvas) return;

const ctx = canvas.getContext("2d");

canvas.width = canvas.offsetWidth;
canvas.height = 120;

ctx.clearRect(0,0,canvas.width,canvas.height);

if(deals.length === 0) return;

let step = canvas.width / deals.length;

deals.forEach((d,i)=>{

let h = d.profit;
let y = 60 - h;

ctx.fillStyle = "#00ff88";
ctx.fillRect(i*step, y, 8, h);

});
}

/* =========================
   INIT
========================= */

loadDeals();
render();
