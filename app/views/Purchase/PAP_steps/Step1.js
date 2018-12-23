import React from 'react';
import { connect } from "dva";
import Step1Form  from "./Step1Form.js";
/*********************************
**  author: 陈洪泽
**  desc: 表单上传，步骤一
*********************************/

class Step1 extends React.Component{
    constructor(){
        super()
 
    }
    render(){
        return(
             <div>
                <h1>请填写基本信息</h1>
                <Step1Form onSubmit={(step1Form)=>{
                    this.props.dispatch({ "type": "purchasingAndPurchasingManagementModel/submitForm1", step1Form});
                }}></Step1Form>
             </div>
        )
    }
}
export default connect()(Step1);