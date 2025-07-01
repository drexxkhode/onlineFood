const fs = require("fs");
const path = require("path");

const logFilePath= path.join(__dirname,'logs','server.log');

fs.mkdirSync(path.dirname(logFilePath), {recursive:true});

function log (level, message){
    const timeStamp=new Date().toISOString();
    const logEntry = `${timeStamp} [${level.toUpperCase()}] ${message}\n `;
     
    fs.appendFile(logFilePath,logEntry,(err)=>{
if(err) console.error("Failed to write to log: ", err.message);

    });
}

module.exports={
    info: (msg) => log('info', msg),
    warn: (msg) => log('warn', msg),
    error: (msg) => log('error', msg)
};