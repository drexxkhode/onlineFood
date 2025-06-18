const express = require("express");
const bodyParser= require("body-parser");
const cors = require("cors");
const db = require("./views/db");

const app=express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());
const PORT = 3000;
app.use(express.static('assets'));
app.set('view engine', 'ejs');
app.get('/',(req, res)=>{
    res.render('login');
});
app.post("/login",  (req, res)=>{
    const {username,password}=req.body;
    query="SELECT * FROM admins WHERE username=? AND password=? ";
    db.query(query,[username,password],(err,results)=>{
if(err) throw err; 
if(results.length>0){
    alert("Login Successfully!!");
    res.redirect('/dashboard',{username:results[0].name});
}else{
    return res.status(500).json({message: "Invalid username or password"});
}
    });

    
});

app.listen(PORT, ()=>console.log(`Server running at http://localhost:${PORT}`));