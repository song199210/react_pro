const express=require("express");
const bodyParser=require("body-parser");
const app=express();
const router=require("./routes.js");

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(router);
let server=app.listen(3000, function () {//启动express服务器
    var host = server.address().address;
    var port = server.address().port;
    console.log('Example app listening at http://%s:%s', host, port);
});