import React from 'react';
import Purchase from "../../containers/Purchase"; 
import { connect } from 'dva';
import { Skeleton, Card, Icon, Avatar, Row , Col} from 'antd';
const { Meta } = Card;
import UpdateSupplierDocumentInquiryModal from "./components/UpdateSupplierDocumentInquiryModal"
/*********************************
**  author: 陈洪泽
**  desc: 供应商单据查询组件
*********************************/

class SupplierDocumentInquiry extends React.Component{
    constructor(props){
        super(props)

        props.dispatch({ "type": "supplierDocumentInquiryModel/init"});
        props.dispatch({ "type": "sdim_model/show", "id": 1 })
    }
 
    render(){
        return(
            <Purchase current="SupplierDocumentInquiry">
                <h1>供应商单据查询</h1>
                <Row 
                    gutter={20}
                >
                    {
                        this.props.results.map(item => {
                            return <Col 
                                span={7}
                                key={item.id}
                             >
                                <Card
                                    key={item.id}
                                    style={{ marginTop: 16 }}
                                    actions={[<Icon type="setting" />, <Icon type="edit" onClick={()=>{
                                        //弹出模态框
                                        this.props.dispatch({ "type": "sdim_model/show", "id" : item.id})
                                    }}/>, <Icon type="ellipsis" />]}
                                >
                                    <Skeleton loading={!item.company} avatar active>
                                        <Meta
                                            avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                                            title={item.company + item.thing}
                                            description={item.price + "元，共" + item.amount + "个"}
                                        />
                                    </Skeleton>
                                </Card>
                            </Col>
                        })
                    }
                </Row>
                {/* 弹出层 */}
                {
                    this.props.isShow
                    ?
                    <UpdateSupplierDocumentInquiryModal></UpdateSupplierDocumentInquiryModal>
                    :
                    null
                }
            </Purchase>
        )
    }
}
export default connect(
    ({ supplierDocumentInquiryModel, sdim_model}) => ({
        results: supplierDocumentInquiryModel.results,
        isShow: sdim_model.isShow
    })
)(SupplierDocumentInquiry);