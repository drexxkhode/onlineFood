require("dotenv").config();
const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const db = require("./db");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

// Sessions
app.use(session({
  secret: process.env.SECRET_KEY,
  resave: false,
  saveUninitialized: false
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
  const query = "SELECT * FROM admins WHERE username=? AND password=?";
  db.query(query, [username, password], (err, results) => {
    if (err) throw err;
    if (results.length > 0) {
      req.session.username = username;
      res.redirect('/dashboard');
    } else {
      res.status(401).json({ message: "Invalid username or password" });
    }
  });
});

// Dashboard
app.get('/dashboard', (req, res) => {
  if (!req.session.username) {
    return res.redirect('/login.html');
  }
  res.render('dashboard', { username: req.session.username });
});

// Logout
app.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/login.html');
  });
});

const PORT = process.env.SERVER_PORT || 3000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));