import React from 'react';
import { Icon } from "antd";
import "./UpBox.less";
import PropTypes from 'prop-types';
/*********************************
**  author: 陈洪泽
**  desc: 图片上传预览组件
*********************************/

export default class UpBox extends React.Component{
    constructor(){
        super()

        this.state = {
            picbase64: ""
        }
    }
    render(){
        return(
            <div>
                <input type="file" hidden ref="file" onChange={(e) => {
                    //当用户选择好图片之后的事件
                    //得到文件
                    var thefile = e.target.files[0];
                    // HTML5新增的内置构造函数FileReader
                    var fr = new FileReader();
                    //命令读取base64格式
                    fr.readAsDataURL(thefile);
                    //备份
                    var self = this;
                    //当FileReader加载完毕
                    fr.onload = function (data) {
                        self.setState({
                            picbase64: data.currentTarget.result
                        })
                    }
                    //向父组件通报
                    this.props.onChooseImage(thefile);
                }} />
                <div>
                    <h3>{this.props.tip}</h3>
                    <div className="upBoxWrap" onClick={() => {
                        //事件代理，用模拟事件的方法转移事件
                        var clickEvent = document.createEvent('MouseEvent'); // 1.创建一个鼠标事件类型
                        clickEvent.initMouseEvent('click', false, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null); // 2.初始化一个click事件
                        this.refs.file.dispatchEvent(clickEvent); // 3.派发(触发)
                    }} style={{
                        "backgroundImage": "url(" + this.state.picbase64 + ")",
                        "backgroundSize": "cover",
                        "backgroundPosition": "50% 50%",
                        "backgroundRepeat": "no-repeat"
                    }}>
                        <Icon type="plus" className="plus" />
                    </div>
                </div>
            </div>
        )
    }
}


UpBox.propTypes = {
    tip: PropTypes.string.isRequired,
    onChooseImage: PropTypes.func.isRequired,
}; 