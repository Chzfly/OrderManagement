import React from 'react';
import {connect} from "dva";
import { Drawer, Input, Row, Col, Switch, Icon, Button,  Select} from "antd";
import immutable from "immutable";
const Option = Select.Option;
/*********************************
**  author: 陈洪泽
**  desc: 订单列表条目修改抽屉组件
*********************************/

class UpdateProcurementDrawer extends React.Component{
    constructor(){
        super()

        this.state = {
            info : {} ,
            //表单项目
            formControls : [
                {
                    "k" : "thing",
                    "c" : "名称",
                    "t" : "string"
                },
                {
                    "k": "type",
                    "c": "类型",
                    "t": "select",
                    "o" : [
                        { "l": '生产资料', "v": '生产资料'},
                        { "l": '耗材', "v": '耗材'},
                        { "l": '电脑用品', "v": '电脑用品'},
                        { "l": '文具', "v": '文具'}
                    ]
                },
                {
                    "k": "level",
                    "c": "级别",
                    "t": "string"
                },
                {
                    "k": "region",
                    "c": "地区",
                    "t": "string"
                },
                {
                    "k": "price",
                    "c": "价格",
                    "t": "number"
                },
                {
                    "k": "amount",
                    "c": "数量",
                    "t": "number"
                },
                {
                    "k": "isPay",
                    "c": "是否付款",
                    "t": "switch"
                }
            ]
        }
    }

    //组件将要收到新的props，里面可以改state
    componentWillReceiveProps(props){
        this.setState({
            info: props.info
        });
    }

    //修改state的info某个属性
    changeInfo(k,v){
        this.setState({
            info : immutable.fromJS(this.state.info).set(k , v).toJS()
        });
    }
 
    render(){
        return(
            <div>
                <Drawer
                    title={this.props.id}
                    placement="right"
                    closable={false}
                    onClose={()=>{
                        this.props.dispatch({ "type": "updateProcurementDrawerModel/changeVisible" , "visible" : false})
                    }}
                    visible={this.props.visible}
                >
                    {
                        this.state.formControls.map(item => {
                            return <Row key={item.k}>
                                <Col span={6}>
                                    {item.c} ：
                                </Col>
                                <Col span={24 - 6}>
                                    {
                                        (()=>{
                                            if(item.t == "string"){
                                                return <Input
                                                    value={this.state.info[item.k]}
                                                    onChange={e => {
                                                        this.changeInfo(item.k , e.target.value)
                                                    }}
                                                ></Input>
                                            }else if (item.t == "number") {
                                                return <Input
                                                    value={this.state.info[item.k]}
                                                    onChange={e => {
                                                        this.changeInfo(item.k, e.target.value)
                                                    }}
                                                    type="number"
                                                ></Input>
                                            }else if(item.t == "switch"){
                                                return <Switch 
                                                    checkedChildren={<Icon type="check" />} 
                                                    unCheckedChildren={<Icon type="close" />} 
                                                    checked={this.state.info[item.k]}
                                                    onChange={v => {
                                                        this.changeInfo(item.k, v)
                                                    }}
                                                />
                                            } else if (item.t == "select") {
                                                return <Select defaultValue={this.state.info[item.k]} style={{ width: 120 }} onChange={(v)=>{
                                                    this.changeInfo(item.k, v)
                                                }}>
                                                    {
                                                        item.o.map(_item => {
                                                            return <Option key={_item.l} value={_item.v}>
                                                                {_item.l}
                                                            </Option>
                                                        })
                                                    }
                                                </Select>
                                            }
                                        })()
                                    }
                                </Col>
                            </Row>
                        })
                    }
                    <Button type="primary" onClick={()=>{
                        this.props.dispatch({ "type": "updateProcurementDrawerModel/doUpdate" , "info" : this.state.info})
                    }}>确认修改</Button>
                </Drawer>
            </div>
        )
    }
}
export default connect(
    ({ updateProcurementDrawerModel}) => ({
        visible: updateProcurementDrawerModel.visible,
        id: updateProcurementDrawerModel.id,
        info: updateProcurementDrawerModel.info
    })
)(UpdateProcurementDrawer);