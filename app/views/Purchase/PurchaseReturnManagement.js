import React from 'react';
import { Modal, Button } from 'antd';
import Purchase from "../../containers/Purchase"; 
/*********************************
**  author: 陈洪泽
**  desc: 退货管理组件
*********************************/

export default class PurchaseReturnManagement extends React.Component{
    constructor(){
        super()
        //模态框是否显示
        this.state = {
           visible: false 
        }
    }
    //显示模态框
    showModal(){
        this.setState({
            visible: true,
        });
    }
    //点击确定按钮
    handleOk(e){
        this.setState({
            visible: false,
        });
    }
    //点击取消按钮
    handleCancel(e){
        this.setState({
            visible: false,
        });
    }
    render(){
        return(
            <Purchase current="PurchaseReturnManagement">
                <h1>采购退货管理</h1>
                <Button type="primary" onClick={() => { this.showModal()}}>
                    增加退货
                </Button>
                <Modal
                    title="这里是模态框的标题"
                    visible={this.state.visible}
                    onOk={() => {this.handleOk()}}
                    onCancel={() => {this.handleCancel()}}
                >
                    <p>这里是模态框的内容</p>
                    <p>这里是模态框的内容</p>
                    <p>这里是模态框的内容</p>
                    <p>这里是模态框的内容</p>
                </Modal>
            </Purchase>
        )
    }
}