require('dotenv').config();
const mysql = require("mysql2");

const con = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD, // Added password
    database: process.env.DB_NAME,
});

con.connect((err) => {
    if (err) {
        console.error("Database connection failed:", err);
        process.exit(1); // Exit gracefully
    }
    console.log("Database Connected Successfully");
});

module.exports = con;