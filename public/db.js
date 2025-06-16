const mysql=require("mysql2");
const connection=mysql.createConnection({
host: 'localhost',
username: 'root',
database: 'site15Food'

});
connection.connect((err)=>{
if(err) throw err;
console.log("Database Connected Successfully");
});
module.exports=connection;