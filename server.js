require("dotenv").config();
const express = require("express");
const session = require("express-session");
const bcrypt=require("bcryptjs");
const logger= require("./logger");
const cors = require("cors");
const path = require("path");
const db = require("./db");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// Sessions
app.use(session({
  secret: process.env.SECRET_KEY,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,
    httpOnly:true,
    sameSite: 'strict',
    maxAge: 1000 * 60 * 10
  }
}));

// Static files
app.use(express.static('assets'));
app.use(express.static('public'));

// View engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Login handler
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const query = "SELECT * FROM admins WHERE username=?";
  db.query(query, [username], (err, results) => {
    if (err) {
      logger.error('Database query error: ', err.message);
      return;
    }
    if(results.length===0){
      return res.status(400).json({message: "User not found"});
    }
    bcrypt.compare(password,results[0].password,(error,result)=>{
if(error) return res.status(400).json({message: "Server Error"});
//Login code 
if(result){

   req.session.username = username;
   
      res.redirect('/dashboard');
      logger.info(`${username} logged in successfully  `);
      
}
else{
return res.status(401).json({ message: "Invalid username or password" });
}
  });
});
});
// Dashboard
app.get('/dashboard', (req, res) => {
  if (!req.session.username) {
    return res.redirect('/login.html');
  }
  res.render('dashboard', { username: req.session.username });
req.session.touch();

  
});

// Logout
app.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.clearCookie('connect.sid');
    res.redirect('/login.html');
  });
});

const PORT = process.env.SERVER_PORT || 3000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));