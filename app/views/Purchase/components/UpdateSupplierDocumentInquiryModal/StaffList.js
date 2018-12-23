import React from 'react';
import { connect } from 'dva';
import { Input} from "antd";
/*********************************
**  author: 陈洪泽
**  desc: 浮层-管理员列表
*********************************/

class StaffList extends React.Component{
    constructor(props){
        super(props)

        props.dispatch({ "type": "staffListModel/init"});
    }
    render(){
        return(
            <div className="stafflist" style={{
                "top" : this.props.top,
                "left": this.props.left
            }} onClick={e => {
                e.stopPropagation();
                
                if (e.target.nodeName.toLowerCase() == "p"){
                    alert(e.target.getAttribute("data-id"));
                }
            }}>
                <Input onChange={e => {
                    this.props.dispatch({ "type": "staffListModel/changekeyword" , "keyword" : e.target.value});
                }}></Input>
                {
                    this.props.results.map(item => <p 
                        key={item.id}
                        data-id={item.id}
                    >
                        {item.name}（{item.id}）
                    </p>)
                }
            </div>
        )
    }
}
export default connect(
    ({ staffListModel}) => ({
        top: staffListModel.top,
        left: staffListModel.left,
        results: staffListModel.results,
    })
)(StaffList);