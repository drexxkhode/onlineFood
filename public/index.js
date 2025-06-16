document.getElementById("formAuthentication").addEventListener("submit", async (e)=>{
const username = document.getElementById("username").value;
const password = document.getElementById("password").value;

const res= await fetch("/login", {
method: "POST",
headers:{"content-Type": "application/json"},
body:JSON.stringify({username,password})
});
const data = await res.json();
alert(data.message);
});