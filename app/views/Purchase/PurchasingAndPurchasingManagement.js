import React from 'react';
import { Steps } from 'antd';
import {connect} from "dva";
import Purchase from "../../containers/Purchase"; 
import Step1 from "./PAP_steps/Step1";
import Step2 from "./PAP_steps/Step2";
import Step3 from "./PAP_steps/Step3";
const Step = Steps.Step;
 /*********************************
 **  author: 陈洪泽
 **  desc: 进货管理
 *********************************/
 
class PurchasingAndPurchasingManagement extends React.Component{
    constructor(){
        super()
    }
    render(){
        //显示title
        const showTitle = (now , s) => {
            if(now == s){
                return "进行中";
            }else if(s < now){
                return "已完成";
            }else{
                return "待完成"
            }
        }
        //根据step来显示不同组件
        const showStepComponent = (now) => {
            if(now == 1){
                return <Step1 />
            } else if (now == 2) {
                return <Step2 />
            } else if (now == 3) {
                return <Step3 />
            }
        }
        return(
            <Purchase current="PurchasingAndPurchasingManagement">
                <Steps current={this.props.step - 1}>
                    <Step title={showTitle(this.props.step  , 1)} description="订单基本信息" />
                    <Step title={showTitle(this.props.step  , 2)} description="附属票据图片上传、微信转账图片上传" />
                    <Step title={showTitle(this.props.step  , 3)} description="3个工作日审核" />
                </Steps>

                {
                    showStepComponent(this.props.step)
                }
            </Purchase>
        )
    }
}
export default connect(
    ({ purchasingAndPurchasingManagementModel}) => ({
        step: purchasingAndPurchasingManagementModel.step
    })
)(PurchasingAndPurchasingManagement);