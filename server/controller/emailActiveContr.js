//注册邮箱认证
const nodemailer=require("nodemailer");
function creNodeMailer(toEmail,account){//需要发送的邮箱地址和需要被激活的账号
    let transporter=nodemailer.createTransport({
        service:"qq",
        auth:{
            user:"1821908096@qq.com",
            pass:"bpofyuonyztvdbhe"
        }
    });
    let mailOptions={
        from:'1821908096@qq.com',
        to: toEmail, // 接受者,可以同时发送多个,以逗号隔开  
        subject: '用户账号激活', // 标题  
        //text: 'Hello world', // 文本  
        html: `<h2>欢迎激活账号:</h2><h3>请单击 
        <a href='http://localhost:3000/emailActive?account=${account}' target="_blank">
        【立即激活】http://localhost:3000/emailActive?account=${account}</a>激活账号</h3>`
    };
    transporter.sendMail(mailOptions, function (err, info) {
        if(err){
            console.log("邮箱发送失败");
        }else{
            console.log("邮箱发送成功");
        }
    });  
}
module.exports=creNodeMailer;