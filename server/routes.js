const express=require("express");
const router=express.Router();
const accountSql=require("./controller/accountContr");
const emailActive=require("./controller/emailActiveContr");
router.post("/login",(req,res,next)=>{//登陆url模块
    const body=req.body;
    accountSql.login_query(body).then((result)=>{
        res.send(result);
    }).catch((err)=>{
        res.end();
        next();
    });
});
router.post("/regin",(req,res,next)=>{//注册url模块
    const body=req.body;
    accountSql.regin_insert(body).then((result)=>{
        res.send(result);
    }).catch((err)=>{
        res.end();
        next();
    });
});
router.post("/toEmail",(req,res,next)=>{//注册url模块
    const body=req.body;
    emailActive(body.email,body.account);
});
router.get("/emailActive",(req,res,next)=>{//注册url模块
    const body=req.body;
});
router.post("/active",(req,res,next)=>{//激活账号url模块

});
module.exports=router;