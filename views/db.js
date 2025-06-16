const mysql=require("mysql2");
const connection=mysql.createConnection({
Host: 'localhost',
Username: 'root',
Password:'',
Database: 'site15Food'

});
connection.connect((err)=>{
if(err) throw err;
console.log("Database Connected Successfully");
});
module.exports=connection;