import React from 'react';
import UpBox from "../components/UpBox";
import { Button } from "antd";
import {connect} from "dva";
/*********************************
**  author: 陈洪泽
**  desc: 步骤二
*********************************/

class Step2 extends React.Component{
    constructor(){
        super()

        this.state = {
            "idCard_front_file" : null, 
            "idCard_back_file" : null, 
            "fapiao_file" : null, 
        }
    }
 
    render(){
      
        return(
            <div>
                <div>
                    <UpBox tip="请上传身份证正面" onChooseImage={(file)=>{
                        this.setState({
                            "idCard_front_file" : file
                        })
                    }}></UpBox>
                    <UpBox tip="请上传身份证背面" onChooseImage={(file) => {
                        this.setState({
                            "idCard_back_file": file
                        })
                    }}></UpBox>
                    <UpBox tip="请上传发票" onChooseImage={(file) => {
                        this.setState({
                            "fapiao_file": file
                        })
                    }}></UpBox>

                    <Button type="primary" onClick={() => {
                        //包装到一个formdata中
                        var formdata = new FormData();
                        //追加
                        formdata.append("file1", this.state.idCard_front_file);
                        this.props.dispatch({ "type": "purchasingAndPurchasingManagementModel/submitForm2", "step2Form": formdata})
                    }}>提交</Button>
                </div>
            </div>
        )
    }
}

export default connect()(Step2);