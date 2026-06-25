let tab = "home";
let deals = JSON.parse(localStorage.getItem("deals")) || [];
let editIndex = null;

/* SAVE */
function save(){
localStorage.setItem("deals", JSON.stringify(deals));
}

/* TAB */
function setTab(t, event){
tab = t;

document.querySelectorAll(".sidebar button")
.forEach(b=>b.classList.remove("active"));

if(event) event.target.classList.add("active");

render();
}

/* ADD */
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

save();
clear();
render();
}

/* EDIT */
function editDeal(i){
const d = deals[i];

document.getElementById("name").value = d.name;
document.getElementById("buy").value = d.buy;
document.getElementById("sell").value = d.sell;

editIndex = i;
}

/* DELETE */
function deleteDeal(i){
deals.splice(i,1);
save();
render();
}

/* CLEAR */
function clear(){
document.getElementById("name").value = "";
document.getElementById("buy").value = "";
document.getElementById("sell").value = "";
}

/* FILTER */
function getFiltered(){
return deals.filter(d=>d.tab === tab);
}

/* RENDER */
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
list.map((d,i)=>`
<div class="deal">
<h3>${d.name}</h3>
<p>${d.buy} → ${d.sell}</p>
<div class="profit">+$${d.profit}</div>

<div>
<button onclick="editDeal(${deals.indexOf(d)})">✏️</button>
<button onclick="deleteDeal(${deals.indexOf(d)})">🗑</button>
</div>
</div>
`).join("");

drawChart();
}

/* CHART */
function drawChart(){

const canvas = document.getElementById("chart");
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
ctx.fillRect(i*step, y, 10, h);
});
}

render();
