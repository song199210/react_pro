import React from "react";
import {Link} from "react-router-dom";
import md5 from "js-md5";
import styles from "../styles/style.css";
export default class Login extends React.Component {
    constructor(props){
        super(props);
        this.state={
            account:"",
            pwd:""
        }
    }
    getUserName(){
        const unameVal=window.event.target.value;
        this.setState({
            account:unameVal
        });
    }
    getPwd(){
        const pwdVal=window.event.target.value;
        this.setState({
            pwd:pwdVal
        })
    }
    componentDidMount(){
        window.localStorage.setItem("account","");
        window.localStorage.setItem("email","");
    }
    LoginFetch(){
        const urlApi=`/api/login`;
        let sendData=Object.assign({},this.state);
        if(sendData.username == "" || sendData.pwd == ""){
            alert("用户名或密码,不能为空!");
            return false;
        }
        sendData['pwd']=md5(sendData['pwd']);
        fetch(urlApi,{
            method:"post",
            headers:{
                "Content-Type": "application/json"
            },
            body:JSON.stringify(sendData)
        }).then((result)=>{
            console.log(result);
        });
    }
    render(){
        return (
            <div class="loginBox">
                <h3>欢迎登陆</h3>
                <div class="formGroup">
                    <label>账号:</label>
                    <input type="text" class="formControl" onChange={this.getUserName.bind(this)} />
                </div>
                <div class="formGroup">
                    <label>密码:</label>
                    <input type="password" class="formControl" onChange={this.getPwd.bind(this)} />
                </div>
                <div class="btnGroup">
                    <div class="textGroup">
                        <a href="/regin">注册账号</a>
                        <Link to={"/toEmail"}>激活账号</Link>
                    </div>
                    <button type="button" class="btn btn-primary" onClick={this.LoginFetch.bind(this)}>登录</button>
                    <button type="button" class="btn btn-danger">重置</button>
                </div>
            </div>
        )
    }
}
