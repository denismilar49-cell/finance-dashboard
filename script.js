let tab = "home";
let deals = JSON.parse(localStorage.getItem("deals")) || [];
let editIndex = null;

let chart;

function save(){
localStorage.setItem("deals", JSON.stringify(deals));
}

function setTab(t, btn){
tab = t;

document.querySelectorAll(".sidebar button")
.forEach(b=>b.classList.remove("active"));

btn.classList.add("active");

render();
}

function addDeal(){

const name = document.getElementById("name").value;
const buy = +document.getElementById("buy").value;
const sell = +document.getElementById("sell").value;

if(!name) return;

const obj = {
name,
buy,
sell,
profit: sell - buy,
tab
};

if(editIndex !== null){
deals[editIndex] = obj;
editIndex = null;
}else{
deals.push(obj);
}

save();
render();
}

function deleteDeal(i){
deals.splice(i,1);
save();
render();
}

function editDeal(i){
const d = deals[i];
document.getElementById("name").value = d.name;
document.getElementById("buy").value = d.buy;
document.getElementById("sell").value = d.sell;
editIndex = i;
}

function getFiltered(){
return deals.filter(d=>d.tab===tab);
}

function render(){

let list = getFiltered();

let total = deals.reduce((a,b)=>a+b.profit,0);
let avg = deals.length ? total/deals.length : 0;

let best = deals.reduce((m,d)=>d.profit>m.profit?d:m,{name:"—",profit:-999});

document.getElementById("count").innerText = deals.length;
document.getElementById("profit").innerText = "$"+total;
document.getElementById("avg").innerText = "$"+avg.toFixed(2);
document.getElementById("best").innerText = best.name;

document.getElementById("list").innerHTML =
list.map((d,i)=>`
<div class="deal">
${d.name} | $${d.profit}
<button onclick="editDeal(${deals.indexOf(d)})">✏️</button>
<button onclick="deleteDeal(${deals.indexOf(d)})">🗑</button>
</div>
`).join("");

updateChart();
}

function updateChart(){

let labels = deals.map((_,i)=>"Deal "+(i+1));
let data = deals.map(d=>d.profit);

if(chart) chart.destroy();

chart = new Chart(document.getElementById("chart"),{
type:"line",
data:{
labels,
datasets:[{
label:"Profit",
data,
borderColor:"#00ff88"
}]
}
});
}

render();
