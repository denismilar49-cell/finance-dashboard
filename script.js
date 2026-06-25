body{
margin:0;
font-family:Segoe UI;
background:#0f1115;
color:white;
}

.app{
display:flex;
min-height:100vh;
}

/* SIDEBAR */
.sidebar{
width:240px;
background:#11151b;
padding:20px;
border-right:1px solid #222;
}

.sidebar button{
display:block;
width:100%;
margin-bottom:10px;
padding:10px;
border-radius:10px;
background:#1a1d23;
color:white;
border:1px solid #2a2f38;
cursor:pointer;
}

.sidebar button.active{
background:#00ff88;
color:black;
}

/* MAIN */
.main{
flex:1;
padding:25px;
}

.grid{
display:grid;
grid-template-columns:repeat(4,1fr);
gap:15px;
margin-bottom:20px;
}

.card{
background:#1a1d23;
padding:20px;
border-radius:15px;
border:1px solid #2a2f38;
}

.green{ color:#00ff88; }

.form{
display:grid;
grid-template-columns:2fr 1fr 1fr auto;
gap:10px;
margin-bottom:20px;
}

input{
padding:12px;
background:#1a1d23;
border:1px solid #2a2f38;
color:white;
border-radius:10px;
}

button{
background:#00ff88;
border:none;
padding:12px;
border-radius:10px;
cursor:pointer;
font-weight:bold;
}

/* DEAL */
.deal{
background:#1a1d23;
border:1px solid #2a2f38;
padding:15px;
border-radius:12px;
margin-bottom:10px;
}

.actions button{
margin-right:5px;
padding:6px 10px;
font-size:12px;
}
