import React from "react";
import { Form, Input, Button, Select } from 'antd';
import "../utils/step1.less";
import {checkFapiao} from "../../../axios/purchaseAPI";
const FormItem = Form.Item;
const Option = Select.Option;
/*********************************
**  author: 陈洪泽
**  desc: 表单一
*********************************/

class Step1Form extends React.Component{
    constructor(){
        super();
    }
    render(){
        const {
            getFieldDecorator, getFieldsValue, getFieldsError, getFieldError, isFieldTouched, validateFields
        } = this.props.form;
        //列数定义
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 3 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 16,
                    offset: 8,
                },
            },
        };
        return <Form onSubmit={(e)=>{
            e.preventDefault();
            if (!validateFields()){
                //把数据放到model中。dispatch。
                this.props.onSubmit(getFieldsValue());
            }
        }}>
            <FormItem
                {...formItemLayout}
                label="姓名"
            >
                {
                    getFieldDecorator('name', {
                        rules: [
                            { required: true, message: '必须填写！' },
                            { "pattern": /^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,20}$/, message: '请正确填写！'}
                        ],
                    })(
                        <Input />
                    )
                }
            </FormItem>
            <div className="cl"></div>
            <FormItem
                {...formItemLayout}
                label="Email"
            >
                {
                    getFieldDecorator('email', {
                        rules: [
                            { type: 'email', message: '请输入正确email',},
                            { required: true, message: '必须填写！' }
                        ],
                    })(
                        <Input />
                    )
                }
            </FormItem>
            <div className="cl"></div>
            <FormItem
                {...formItemLayout}
                label="身份证号码"
            >
                {
                    getFieldDecorator('IDcard', {
                        rules: [
                            { "pattern": /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/, message: '请正确填写！' },
                            { required: true, message: '必须填写！' }
                        ],
                    })(
                        <Input />
                    )
                }
            </FormItem>
            <div className="cl"></div>
            <FormItem
                {...formItemLayout}
                label="手机号码"
            >
                {
                    getFieldDecorator('mobile', {
                        rules: [
                            { 
                                "pattern": /^(10[0-9]|13[0-9]|14[1456789]|15[0-3,5-9]|16[6]|17[01235678]|18[0-9]|19[89])\d{8}$/, message: '请正确填写！' },
                            { required: true, message: '必须填写！' }
                        ],
                    })(
                        <Input />
                    )
                }
            </FormItem>
            <div className="cl"></div>
            <FormItem
                {...formItemLayout}
                label="发票号"
            >
                {
                    getFieldDecorator('fapiaohao', {
                        rules: [
                            
                            { required: true, message: '必须填写！' },
                            {
                                validator(rule, value, callback){
                                    const { occupied} = checkFapiao({
                                        "fapiaohao" : value
                                    });
                                    if(!occupied){
                                        callback();
                                    }else{
                                        callback("服务器已经有了这个发票号，不能使用！");
                                    }
                                }
                            }
                        ],
                    })(
                        <Input />
                    )
                }
            </FormItem>
            <div className="cl"></div>
            <FormItem
                {...formItemLayout}
                label="类型"
            >
                {
                    getFieldDecorator('type', {
                        rules: [

                            { required: true, message: '必须填写！' }
                            
                        ],
                    })(
                        <Select style={{ width: 120 }}>
                            <Option value="办公用品">办公用品</Option>
                            <Option value="耗材">耗材</Option>
                            <Option value="文具">文具</Option>
                        </Select>
                    )
                }
            </FormItem>
            <div className="cl"></div>
            <FormItem
                wrapperCol={{ span: 12, offset: 6 }}
            >
                <Button type="primary" htmlType="submit">提交</Button>
            </FormItem>
        </Form>
    }
}

export default Form.create()(Step1Form);