import React from "react";
import styles from "../styles/style.css";
export default class ToEmail extends React.Component {
    constructor(props){
        super(props);
        this.state={
            account:"",
            email:""
        }
        this.sendDataJson=null;
    }
    componentDidMount(){
        let account=window.localStorage.getItem("account");
        let email=window.localStorage.getItem("email");
        account=(account == null)?"":account;
        email=(email == null)?"":email;
        if(account != "" && email != ""){
            this.sendDataJson={
                account:account,
                email:email
            };
            this.emailFetch(this.sendDataJson);
        }
    }
    getUserName(){
        const accountVal=window.event.target.value;
        this.setState({
            account:accountVal
        });
    }
    getEmail(){
        const emailVal=window.event.target.value;
        this.setState({
            email:emailVal
        })
    }
    emailFetch(){
        const urlApi=`/api/toEmail`;
        let sendData=null;
        if(this.sendDataJson == null){
            sendData=this.state;
        }else{
            sendData=this.sendDataJson;
        }
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
                <h3>邮箱激活</h3>
                <div class="formGroup">
                    <label>账号:</label>
                    <input type="text" class="formControl" onChange={this.getUserName.bind(this)} />
                </div>
                <div class="formGroup">
                    <label>邮箱:</label>
                    <input type="password" class="formControl" onChange={this.getEmail.bind(this)} />
                </div>
                <div class="btnGroup">
                    <div class="textGroup">
                        <a href="/login">返回登录</a>
                    </div>
                    <button type="button" class="btn btn-primary" onClick={this.emailFetch.bind(this)}>开始激活</button>
                </div>
            </div>
        )
    }
}
