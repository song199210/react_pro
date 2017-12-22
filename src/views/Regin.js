import React from "react";
import md5 from "js-md5";
import styles from "../styles/style.css";
export default class Regin extends React.Component {
    constructor(props){
        super(props);
        this.state={
            account:"",
            pwd1:"",
            pwd2:"",
            email:""
        }
    }
    componentDidMount(){
        window.localStorage.setItem("account","");
        window.localStorage.setItem("email","");
    }
    getUserName(){
        const unameVal=window.event.target.value;
        this.setState({
            account:unameVal
        });
    }
    getPwd(typeStr){
        const pwdVal=window.event.target.value;
        this.setState({
            [typeStr]:pwdVal
        });
    }
    getEmail(){
        const emailVal=window.event.target.value;
        this.setState({
            email:emailVal
        });
    }
    reginFetch(){
        const urlApi=`/api/regin`;
        console.log(this.state);
        try{//利用try来跳出forEach循环
            Object.keys(this.state).forEach((item)=>{
                if(this.state[item] == ""){
                    alert("必填项不能为空");
                    forEach.break=new Error("必填项不能为空");
                }
            })
        }catch(e){
            throw e;
        }
        if(this.state['pwd1'] != this.state['pwd2']){
            alert("密码不一致，请检查");
            return false;
        }
        let sendData={};
        sendData['account']=this.state['account'];
        sendData['pwd']=md5(this.state['pwd1']);
        sendData['email']=this.state['email'];
        fetch(urlApi,{
            method:"post",
            headers:{
                "Content-Type": "application/json"
            },
            body:JSON.stringify(sendData)
        }).then((result)=>{
            result.json().then((res)=>{
                if(res.status){
                    window.localStorage.setItem("account",sendData['account']);
                    window.localStorage.setItem("email",sendData['email']);
                    this.props.history.push(`/toEmail`);
                }
            });
        });
    }
    render(){
        return (
            <div class="loginBox">
                <h3>欢迎注册</h3>
                <div class="formGroup">
                    <label>账号:</label>
                    <input type="text" class="formControl" onChange={this.getUserName.bind(this)} />
                </div>
                <div class="formGroup">
                    <label>密码:</label>
                    <input type="password" class="formControl" onChange={this.getPwd.bind(this,"pwd1")} />
                </div>
                <div class="formGroup">
                    <label>确认密码:</label>
                    <input type="password" class="formControl" onChange={this.getPwd.bind(this,"pwd2")} />
                </div>
                <div class="formGroup">
                    <label>邮箱:</label>
                    <input type="password" class="formControl" onChange={this.getEmail.bind(this)} />
                </div>
                <div class="btnGroup">
                    <div class="textGroup">
                        <a href="/login">返回登录</a>
                    </div>
                    <button type="button" class="btn btn-primary" onClick={this.reginFetch.bind(this)}>注册</button>
                    <button type="button" class="btn btn-danger">重置</button>
                </div>
            </div>
        )
    }
}
