import React from 'react';
import { Table, Row, Col, Checkbox, Slider, DatePicker, Tag, Select, Input} from "antd";
import moment from "moment";
const CheckboxGroup = Checkbox.Group;
const { RangePicker } = DatePicker;
const Option = Select.Option;
import Purchase from "../../containers/Purchase"; 
import { connect } from 'dva';
import getCol from "./utils/getCol.js";
import UpdateProcurementDrawer from "./components/UpdateProcurementDrawer"
import "./utils/style.less";
 /*********************************
 **  author: 陈洪泽
 **  desc: 日常采购订单，列表展示
 *********************************/
 
class DailyProcurement extends React.Component{
    constructor(props){
        super(props)
        //发出请求，初始化
        props.dispatch({ "type": "dailyProcurementModel/loadData"});
        this.state = {
            //抽屉的可见性
            visible: false,
            //删选器，配置
            filtersSetup : [
                {
                    "type": "复选",     //复选框,
                    "key": "region",
                    "title": "地区",
                    "options": [
                        { label: '北京', value: '北京' },
                        { label: '上海', value: '上海' },
                        { label: '广州', value: '广州' }
                    ]
                },
                {
                    "type" : "复选",     //复选框,
                    "key" : "type",
                    "title" : "类型",
                    "options": [
                        { label: '生产资料', value: '生产资料' },
                        { label: '耗材', value: '耗材' },
                        { label: '电脑用品', value: '电脑用品' },
                        { label: '文具', value: '文具' }
                    ]
                },
                {
                    "type": "复选",     //复选框,
                    "key": "level",
                    "title": "等级",
                    "options": [
                        { label: '一级经销商', value: '一级经销商' },
                        { label: '二级经销商', value: '二级经销商' },
                        { label: '三级经销商', value: '三级经销商' },
                        { label: '四级经销商', value: '四级经销商' },
                        { label: '五级经销商', value: '五级经销商' }
                    ]
                },
                {
                    "type": "数字范围",     //数字范围,
                    "key": "price",
                    "title": "价格（万元）",
                    "rate" : 10000,         //比例
                    "max"   : 1000000,       //真实的最大值
                    "min"   : 0             //真实的最小值
                },
                {
                    "type": "数字范围",     //数字范围,
                    "key": "amount",
                    "title": "数量",
                    "rate": 1,         //比例
                    "max": 10000,       //真实的最大值
                    "min": 0             //真实的最小值
                },
                {
                    "type": "日期范围",
                    "key":"date",
                    "title":"日期"
                },
                {
                    "type": "下拉菜单",
                    "key": "isPay",
                    "title": "是否付款",
                    "options": [
                        { label: '是', value: 'y' },
                        { label: '否', value: 'n' },
                        { label: '无所谓', value: '' }
                    ]
                }
            ] 
        }
    }
 
    render(){
        //从model的filters中找到指定key的v，并且转为数组
        const getV = (item) => {
            //筛出来
            if (item.type == "复选") {
                var _t = this.props.filters.filter(_i => _i.k == item.key)[0];
                if(_t){
                    return _t.v.split("v")
                }
                return []
            } else if (item.type == "数字范围"){
                var _t = this.props.filters.filter(_i => _i.k == item.key)[0];
                if (_t) {
                    //除比例
                    return _t.v.split("to").map(ii => ii / item.rate);
                }
                return [item.min / item.rate , item.max / item.rate]
            } else if (item.type == "日期范围") {
                var _t = this.props.filters.filter(_i => _i.k == item.key)[0];
                if (_t) {
                    //转moment对象
                    return _t.v.split("to").map(ii => moment(Number(ii)));
                }
                return []
            } else if (item.type == "下拉菜单") {
                var _t = this.props.filters.filter(_i => _i.k == item.key)[0];
                if (_t) {
                    //转moment对象
                    return _t.v;
                }
                return ""
            } else {
                var _t = this.props.filters.filter(_i => _i.k == item.key)[0];
                if (_t) {
                    //转moment对象
                    return _t.v;
                }
                return ""
            } 
            
        }

        //根据不同的题目类型显示控件
        const showControl = (item) => {
            if(item.type == "复选"){
                return <CheckboxGroup
                    options={item.options}
                    value={getV(item)}
                    onChange={v => {
                        this.props.dispatch({ "type": "dailyProcurementModel/changeFilters", "k": item.key, "v": v.join("v") })
                    }}
                />
            }else if(item.type == "数字范围"){
                return <Slider 
                    range
                    min={item.min / item.rate}
                    max={item.max / item.rate}
                    defaultValue={getV(item)}
                    onAfterChange={v=>{
                        this.props.dispatch({ "type": "dailyProcurementModel/changeFilters", "k": item.key, "v": v.map(ii => ii * item.rate).join("to") })
                    }}
                />
            }else if (item.type == "日期范围") {
                return <RangePicker 
                    value={getV(item)}
                    onChange={v => {
                        this.props.dispatch({ "type": "dailyProcurementModel/changeFilters", "k": item.key, "v": v.map(ii => ii.unix() * 1000).join("to") })
                    }}
                />
            }else if(item.type == "下拉菜单"){
                return <Select  
                    style={{ width: 120 }}
                    value={getV(item)}
                    onChange={v => {
                        this.props.dispatch({ "type": "dailyProcurementModel/changeFilters", "k": item.key, v})
                    }}
                >
                    {
                        item.options.map(_item => {
                            return <Option 
                                key={_item.label} 
                                value={_item.value}
                            >
                            {_item.label}
                            </Option>
                        })
                    }
                </Select>
            }
        }

        return(
            <Purchase current="DailyProcurement">
                <h1>日常采购</h1>

                {
                    // 遍历题目
                    this.state.filtersSetup.map(item => {
                        return <Row key={item.key}>
                            <Col span={3}>
                                {item.title}
                            </Col>
                            <Col span={21}>
                                {showControl(item)}
                            </Col>
                        </Row>
                    })
                } 
                {/* 补充一个筛选题 */}
                <Row>
                    <Col span={3}>
                        关键词
                    </Col>
                    <Col span={21}>
                        <Input 
                            style={{"width":300}} 
                            value={getV({
                                "key" : "keyword"
                            })}
                            onChange={e=>{
                                this.props.dispatch({ "type": "dailyProcurementModel/changeFilters", "k": "keyword", "v": e.target.value })
                            }}
                        />
                    </Col>
                </Row>

                {
                    //显示Tags
                    this.props.filters.map(item => {
                        //词典
                        const dictionary = {
                            "type" : "类型",
                            "level" : "级别",
                            "region" : "地区",
                            "price" : "价格",
                            "amount" : "数量",
                            "date" : "日期",
                            "isPay" : "是否付款",
                            "keyword" : "关键词"
                        }

                        //分类讨论
                        if(item.k == "type" || item.k == "level" || item.k == "region"){
                            var v = item.v.split("v").join(" 或 ");
                        } else if(item.k == "price"){
                            var v = item.v.split("to").map(ii => ii / 10000 + "万元").join(" 到 ");
                        } else if (item.k == "amount") {
                            var v = item.v.split("to").map(ii => ii + "个").join(" 到 ");
                        } else if (item.k == "date") {
                            var v = item.v.split("to").map(ii => moment(Number(ii)).format("YYYY年MM月DD日")).join(" 到 ");
                        } else if (item.k == "isPay") {
                            var v = item.v == "y" ? "是" : "否";
                        } else if (item.k == "keyword") {
                            var v = item.v
                        }

                        return <Tag 
                            color="magenta" 
                            closable 
                            key={item.k}
                            onClose={()=>{
                                this.props.dispatch({ "type": "dailyProcurementModel/changeFilters", "k": item.k, "v": "" })
                            }}
                        >
                            {dictionary[item.k]} : {v}
                        </Tag>
                    })
                }
                
                <h3>根据当前筛选条件，共找到{this.props.total}条，每页{this.props.pagesize}条，当前{this.props.page}/{Math.ceil(this.props.total / this.props.pagesize)}页</h3>
                {/* 大表 */}
                <Table 
                    rowKey="id"
                    columns={getCol(this.props.sortby, this.props.sortdirection , this.props.dispatch)}
                    dataSource={this.props.results}
                    pagination={{
                        current : this.props.page,
                        pageSize: this.props.pagesize,
                        total: this.props.total,
                        showSizeChanger : true
                    }}
                    onChange={(pagination , filters , sorter)=>{
                        this.props.dispatch({ "type": "dailyProcurementModel/changePageOrSort", "page": pagination.current, "pagesize": pagination.pageSize, "sortby": sorter.field , "sortdirection" : sorter.order == "ascend" ? 1 : -1});
                    }}
                ></Table>
                <UpdateProcurementDrawer></UpdateProcurementDrawer>
            </Purchase>
        )
    }
}

export default connect(
    ({ dailyProcurementModel }) => ({
        results: dailyProcurementModel.results,
        total: dailyProcurementModel.total,
        page: dailyProcurementModel.page,
        pagesize: dailyProcurementModel.pagesize,
        filters : dailyProcurementModel.filters,
        sortby: dailyProcurementModel.sortby,
        sortdirection: dailyProcurementModel.sortdirection
    })
)(DailyProcurement);