const mysql=require("mysql");
const pool=mysql.createPool({
    host:"localhost",
    user:"root",
    password:"root1234",
    port:"3306",
    database:"web_test"
});
pool.getConnection((err,con)=>{
    if(err){
        console.log("数据库链接失败");
        return false;
    }
    console.log("数据库链接成功");
});
module.exports=pool;