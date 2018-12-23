import React from 'react';
import { Layout, Menu } from 'antd';
import { routerRedux } from "dva/router";
import { connect} from "dva";
import "./App.less";
/*********************************
**  author: 陈洪泽
**  desc: layout
*********************************/

// const { SubMenu } = Menu;
const { Header } = Layout;

class App extends React.Component{
    constructor(){
        super()
        this.state = {
            menus: [
                { "c": "首页", "e": "index" },
                { "c": "采购管理", "e": "purchase" },
                { "c": "销售管理", "e": "sales" }
            ]
        }
    }
    render(){
        return(
            <div>
                <Layout>
                    <Header className="header">
                        <div 
                            className="logo"
                            style={{
                                background: "#001529 url('/images/logo.png') 50% 50% / 90% no-repeat"
                            }}
                        />
                        <Menu
                            theme="dark"
                            mode="horizontal"
                            defaultSelectedKeys={[this.props.current.toLocaleLowerCase()]}
                            style={{ lineHeight: '64px' }}
                            onClick={({ item, key, keyPath }) => {
                                this.props.dispatch(routerRedux.push("/" + key));
                            }}
                        >
                            {
                                this.state.menus.map(item => <Menu.Item key={item.e}>
                                    {item.c}
                                </Menu.Item>)
                            }
                        </Menu>
                    </Header>
                    <Layout>
                        {this.props.children}
                    </Layout>
                </Layout>
            </div>
        )
    }
}

export default connect()(App);