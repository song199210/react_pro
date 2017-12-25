/*登陆成功进入首页 */
import React from "react";
export default class Home extends React.Component {
     constructor(props){
        super(props)
     }
     render(){
         let el=(
             <div class="homeContainer">
                 <h2>进入文章</h2>
            </div>
         );
         return el;
     }
 }