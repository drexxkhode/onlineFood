// Run this in a Node.js REPL or script
const bcrypt = require("bcryptjs");
const session = require("express-session");
bcrypt.hash("1234", 10, (err, hash) => {
  console.log(hash);
});
const fs = require("fs");
const path = require("path");

const logFilePath= path.join(__dirname,'logs','server.log');

function log (level, message){
const timeStamp= new Date().toISOString();

const logEntry = `${timeStamp} [${level.toUpperCase()}] ${message}`;
fs.appendFile(logFilePath,logEntry,(err)=>{
if(err) console.error('Failed to write to logs',err.message);
});

}
module.exports={
info: (msg)=>log('info',msg),
warn: (msg)=>log('warn',msg),
error: (msg)=>log('error',msg)
}

app.use(session({
secret:gftghj,
resave: false,
saveUninitialized:false,
cookie:{
  secure: false,
  httpOnly:true,
  sameSite:'strict',
  maxAge: 1000 * 60 * 5
}
}));