import React from 'react';
import App from "../../containers/App";
import {Row , Col} from "antd";
import { connect } from 'dva';
import {hours, days, data} from './option3';

/*********************************
**  author: 陈洪泽
**  desc: 图标展示数据，使用echarts
*********************************/

class Index extends React.Component{
    constructor(props){
        super(props)
        props.dispatch({ "type": "indexModel/getTb1"})
        props.dispatch({ "type": "indexModel/getTb2"})
    }
    componentDidMount(){
        // 基于准备好的dom，初始化echarts实例
        this.myChart = echarts.init(this.refs.main);
        this.myChart2 = echarts.init(this.refs.main2);
        this.myChart3 = echarts.init(this.refs.main3);
        // 指定图表的配置项和数据
        var option = {
            //悬浮黑框
            tooltip: {
                trigger: 'item',
                formatter: "【{a}】 <br/>{b}: {c} ({d}%)"
            },
            //图例
            legend: {
                orient: 'horizontal',
                x: 'left',
                data: ['生产原料', '生产辅料', '外协加工', '电气元件', '机械模组'],
                bottom:10,
                left:140
            },
            series: [
                
            ],
            title: {
                text: '订单类别占比',
                left: 'center',
                top: 20,
                textStyle: {
                    color: '#000'
                }
            },
        };
        var option2 = {
            title: {
                text: '采购订单地区分布',
                left: 50,
                top: 20
            },
            tooltip: {},
            legend: {
                data:['订单量'],
                top: 20
            },
            xAxis: {
                data: ["北京","上海","广州","苏州","宁波","沈阳"]
            },
            yAxis: {},
            series: [{
                name: '订单量',
                type: 'bar',
                data: [5, 20, 36, 10, 10, 20]
            }]
        };

        var option3 = {
            title: {
                text: '2018上半年每日采购订单量3D柱状图',
                left: "center",
                top: 40
            },
            tooltip: {},
            visualMap: {
                max: 20,
                inRange: {
                    color: ['#313695', '#4575b4', '#74add1', '#abd9e9', '#e0f3f8', '#ffffbf', '#fee090', '#fdae61', '#f46d43', '#d73027', '#a50026']
                }
            },
            xAxis3D: {
                type: 'category',
                data: hours,
                name: "月份"
            },
            yAxis3D: {
                type: 'category',
                data: days,
                name: "星期"
            },
            zAxis3D: {
                type: 'value',
                name: "订单量"
            },
            grid3D: {
                boxWidth: 200,
                boxDepth: 80,
                viewControl: {
                    // projection: 'orthographic'
                },
                light: {
                    main: {
                        intensity: 1.2,
                        shadow: true
                    },
                    ambient: {
                        intensity: 0.3
                    }
                }
            },
            series: [{
                type: 'bar3D',
                data: data.map(function (item) {
                    return {
                        value: [item[1], item[0], item[2]],
                    }
                }),
                shading: 'lambert',
        
                label: {
                    textStyle: {
                        fontSize: 16,
                        borderWidth: 1
                    }
                },
        
                emphasis: {
                    label: {
                        textStyle: {
                            fontSize: 20,
                            color: '#900'
                        }
                    },
                    itemStyle: {
                        color: '#900'
                    }
                }
            }]
        }
        
        // 使用刚指定的配置项和数据显示图表。
        this.myChart.setOption(option);
        this.myChart2.setOption(option2);
        this.myChart3.setOption(option3);
    }
    //组件将要收到数据,从model中更新图标配置
    componentWillReceiveProps(props){
        this.myChart.setOption({
            series: [{
                name: '订单类别',
                type: 'pie',
                radius: ['50%', '70%'],
                avoidLabelOverlap: false,
                label: {
                    normal: {
                        show: false,
                        position: 'center'
                    },
                    emphasis: {
                        show: true,
                        textStyle: {
                            fontSize: '30',
                            fontWeight: 'bold'
                        }
                    }
                },
                labelLine: {
                    normal: {
                        show: false
                    }
                },
                data: props.results
            }]
        })
    }
 
    render(){
        return(
            <App current="Index">
                <Row>
                    <Col span={12}>
                        <div id="main" style={{
                            "width": "100%",
                            "height": 400
                        }} ref="main"></div>
                    </Col>
                    <Col span={12}>
                        <div id="main2" style={{
                            "width": "100%",
                            "height": 400
                        }} ref="main2"></div>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <div
                            id="main3"
                            ref="main3"
                            style={{
                                "width": "100%",
                                "height": 600
                            }}
                        ></div>
                    </Col>
                </Row>
                <div 
                    style={{
                        "height": 100
                    }}
                ></div>
            </App>
        )
    }
}

export default connect(
    ({indexModel}) => ({
        results : indexModel.results,
        results2 : indexModel.results2
    })
)(Index);