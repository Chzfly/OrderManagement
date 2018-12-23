import React from 'react';
import { connect} from "dva";
import { Router, Route, routerRedux } from "dva/router";
import { Layout, Menu, Breadcrumb, } from 'antd';
import App from "./App";
const { Content, Sider } = Layout;
/*********************************
**  author: 陈洪泽
**  desc: sale layout
*********************************/

class Sales extends React.Component{
    constructor(){
        super()

        this.state = {
            menus: [
                { "c": "订单管理", "e": "OrderManagement" },
                { "c": "客户挽留", "e": "CustomerRetention" },
                { "c": "促销管理", "e": "PromotionManagement" },
            ]
        }
    }
    render(){
        return(
            <App current="Sales">
                <Layout>
                    <Sider width={200} style={{ background: '#fff' }}>
                        <Menu
                            mode="inline"
                            defaultSelectedKeys={[this.props.current]}
                            style={{ height: '100%', borderRight: 0 }}
                            onClick={({ item, key, keyPath })=>{
                                this.props.dispatch(routerRedux.push("/sales/" + key)); 
                            }}
                        >
                            {
                                this.state.menus.map(item => <Menu.Item key={item.e}>
                                    {item.c}
                                </Menu.Item>)
                            }
                            
                             
                        </Menu>
                    </Sider>
                    <Layout style={{ padding: '0 24px 24px' }}>
                        <Breadcrumb style={{ margin: '16px 0' }}>
                            <Breadcrumb.Item>首页</Breadcrumb.Item>
                            <Breadcrumb.Item>销售管理</Breadcrumb.Item>
                            <Breadcrumb.Item>
                                {
                                    (() => {
                                        for (let i = 0; i < this.state.menus.length; i++) {
                                            if (this.state.menus[i].e == this.props.current) {
                                                return this.state.menus[i].c
                                            }
                                        }
                                    })()
                                }
                            </Breadcrumb.Item>
                        </Breadcrumb>
                        <Content style={{
                            background: '#fff', padding: 24, margin: 0, minHeight: 280,
                        }}
                        >
                            {this.props.children}
                        </Content>
                    </Layout>
                </Layout>
            </App>
        )
    }
}

export default connect(
    (state) => ({
        state
    })
)(Sales);