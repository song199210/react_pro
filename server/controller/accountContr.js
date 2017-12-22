/*
*控制登录注册cotroller模块、
*主要负责登录验证，注册完成及账号激活
*login_query:登陆验证;regin_insert:账号注册;email_active:邮箱激活
*/
const pool=require("../mysql/connect.js");//引入mysql配置文件
let accountSql={
    login_query:function(queryData){//用户登录验证Controller
        let promise=new Promise((resolve,reject)=>{
            pool.query("select * from web_user where account=? and pwd=?",[queryData.account,queryData.pwd],(err,res)=>{
                if(err){
                    reject(err);
                }else{
                    let resbody=new Object();
                    if(res.length == 0){
                        resbody['status']=false;
                        resbody['msg']="用户账号不存在或密码错误";
                    }else{
                        if(res[0].isactive == 0){
                            resbody['status']=false;
                            resbody['msg']="该账号还未激活";
                            
                        }else{
                            resbody['status']=true;
                            resbody['msg']="";
                        }
                    }
                    resbody['data']=[];
                    resolve(resbody);
                }
            });
        });
        return promise;
    },
    regin_insert:function(insertData){//用户注册Controller
        let promise=new Promise((resolve,reject)=>{
            insertData['isactive']=0;
            let insertDataArr=[];
            for(let item in insertData){
                insertDataArr.push(insertData[item]);
            }
            console.log(insertDataArr);
            pool.query("select * from web_user where email=?",insertData.email,function(err,res){
                if(err){
                    console.log(err);
                }else{
                    let resbody=new Object();
                    if(res.length>0){
                        resbody['status']=false;
                        resbody['msg']="该邮箱已被注册";
                        resbody['data']=[];
                        resolve(resbody);
                    }else{
                        pool.query("insert into web_user(account,pwd,email,isactive) values(?,?,?,?)",insertDataArr,function(err,res){
                            if(err){
                                reject(err);
                            }else{
                                let resbody=new Object();
                                resbody['status']=true;
                                resbody['msg']="";
                                resbody['data']=[];
                                resolve(resbody);
                            }
                        });
                    }
                }
            });
        });
        return promise;
    }
}
module.exports=accountSql;