import React from 'react';
import "./css.less";

import { connect} from 'dva';
import { Row, Col, InputNumber, Avatar, Button} from "antd";
import StaffList from "./StaffList";
/*********************************
**  author: 陈洪泽
**  desc: 浮层-更新订单信息
*********************************/

class Index extends React.Component{
 
    constructor(props){
        super(props)     

        this.state = {
            info : props.info
        }
    }

    //组件将下树
    componentWillUnmount(){
        this.props.dispatch({ "type": "staffListModel/changeisShow" , "isShow" : false});
    }
 
 
    render(){
        return(
            <div>
                <div className="mask" onClick={()=>{
                    this.props.dispatch({ "type": "sdim_model/hide" })
                }}>
                    <div className="inner" onClick={e=>{
                        e.stopPropagation();
                        //关闭菜单
                        this.props.dispatch({ "type": "staffListModel/changeisShow", "isShow": false });
                    }}>
                        <h3>
                            {this.state.info.company} 提供的 {this.state.info.thing}
                        </h3>
                        <Row>
                            <Col span={4}>
                                数量 
                            </Col>
                            <Col span={16}>
                                <InputNumber value={this.state.info.amount}></InputNumber>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={4}>
                                单据保管员
                            </Col>
                            <Col span={16}>
                                {
                                    this.state.info.bgy.map((item , index) => {
                                        return <span key={index} className="sss">
                                            <Avatar src={"/images/" + item.avatar} />
                                            {" "}{item.name}
                                        </span>
                                    })
                                }
                                <Button shape="circle" icon="plus" onClick={e=>{
                                    e.stopPropagation();
                                    this.props.dispatch({ "type": "staffListModel/changeTL" , "top" : e.clientY - 10 , "left" : e.clientX + 16});
                                    this.props.dispatch({ "type": "staffListModel/changeisShow" , "isShow" : true});
                                }}/>
                            </Col>
                        </Row>

                        {
                            this.props.isShow
                            ?
                            <StaffList></StaffList>
                            :
                            null
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(
    ({ sdim_model, staffListModel}) => ({
        info: sdim_model.info,
        isShow: staffListModel.isShow
    })
)(Index)