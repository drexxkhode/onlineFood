const express = require("express");
const bodyParser= require("body-parser");
const cors = require("cors");
const db = require("./public/db");

const app=express();
app.use(bodyParser.json());
app.use(cors());
const PORT = 5000;
app.use(express.static("public"));
app.post("/login",  (res, req)=>{
    const {username,password}=req.body;
    query="SELECT * FROM admins WHERE username=? AND password=? LIMIT=1";
    db.query(query,[username,password],(error,results)=>{
if(error) return res.status(401).json({message:"Server Error.....!!"});
if(results.length===0){
    return res.status(500).json({message: "Invalid username or password"});
}else{
    return res.status(200).json({message: "Login Successfully!! "});
}
    });

    

});

app.listen(PORT, ()=>console.log(`Server running at http://localhost:${PORT}`));