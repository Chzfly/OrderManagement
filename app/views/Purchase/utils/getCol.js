import React from "react";
import moment from "moment";
import { Icon, Button} from 'antd';


//两个图标
const duigou = () => {
    return <svg width="2em" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="851"><path d="M511.29648566 3.30634243c-280.89679386 0-508.61000275 227.71204736-508.61000275 508.61000275s227.71320889 508.61000275 508.61000275 508.61000274c280.89795539 0 508.61000275-227.71204736 508.61000273-508.61000274S792.19444217 3.30634243 511.29648566 3.30634243zM794.2997555 371.85601416l-334.86115788 334.86348096c-7.55798552 7.55682399-17.46527853 11.33639751-27.37140891 11.33639751s-19.81342452-3.77957352-27.37140889-11.33639751L228.29553886 530.31693111c-15.11945674-15.11248532-15.11945674-39.62568637 0-54.7381717 15.11713256-15.1217798 39.62568637-15.1217798 54.74281891 0l149.02883094 149.0276694 307.48858634-307.48974785c15.11829409-15.12061827 39.62568637-15.12061827 54.74398045 0C809.41688806 332.22916514 809.41688806 356.74352885 794.2997555 371.85601416z" fill="#66cc00" p-id="852"></path></svg>
}

const cha = () => {
    return <svg width="2em" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="881"><path d="M511.999998 0c-282.757922 0-511.978511 229.220588-511.978511 511.978511s229.220588 511.978511 511.978511 511.978511 511.978511-229.220588 511.978511-511.978511S794.75792 0 511.999998 0zM747.233534 691.862437l-55.348586 55.348586L511.999998 555.334971 332.115048 747.212046l-55.348586-55.348586 181.614337-193.722096-181.614337-193.722096 55.348586-55.348586 179.883927 191.877075 179.883927-191.877075 55.348586 55.348586-181.614337 193.722096L747.233534 691.862437z" fill="#d81e06" p-id="882"></path></svg>
}

/*********************************
**  author: 陈洪泽
**  desc: 返回table列定义
*********************************/

export default (sortby, sortdirection, dispatch) => {
    return [
        {
            "dataIndex": "id",
            "title": "id",
            "width": 110,
            "sorter" : true,
            "sortOrder": (function () {
                if (sortby == "id") {
                    return sortdirection == 1 ? "ascend" : "descend";
                }

                return false;
            })()
        },
        {
            "dataIndex": "thing",
            "title": "名称",
            "width": 110
        },
        {
            "dataIndex": "type",
            "title": "类型",
            "width": 100
        },
        {
            "dataIndex": "level",
            "title": "级别",
            "width": 100
        },
        {
            "dataIndex": "region",
            "title": "地区",
            "width": 100
        },
        {
            "dataIndex": "price",
            "title": "价格",
            "width": 100,
            "sorter": true,
            "sortOrder": (function () {
                if (sortby == "price") {
                    return sortdirection == 1 ? "ascend" : "descend";
                }

                return false;
            })(),
            render(text){
                return <span>{text.toString().replace(/\B(?=(...)+$)/ , ",")}</span>
            },
            "align" : "right"
        },
        {
            "dataIndex": "amount",
            "title": "数量",
            "width": 100,
            "sorter": true,
            "sortOrder": (function () {
                if (sortby == "amount") {
                    return sortdirection == 1 ? "ascend" : "descend";
                }

                return false;
            })()
        },
        {
            "dataIndex": "totalPrice",
            "title": "小计",
            "width": 100,
            "sorter": true,
            "sortOrder": (function () {
                if (sortby == "totalPrice") {
                    return sortdirection == 1 ? "ascend" : "descend";
                }

                return false;
            })()
        },
        {
            "dataIndex": "isPay",
            "title": "是否付款",
            "width": 80,
            render(text) {
                if (text) {
                    return <span><Icon component={duigou} /></span>
                } else {
                    return <span><Icon component={cha} /></span>
                }
            }
        },
        {
            "dataIndex": "staff",
            "title": "采办人",
            "width": 100
        },
        {
            "dataIndex": "date",
            "title": "日期",
            "width": 140,
            render(text) {
                return <span>{moment(text).format("YYYY-MM-DD")}</span>;
            }
        },
        {
            "title": "操作",
            "width" : 60,
            render(text,row) {
                return <span>
                    <Button 
                        type="primary" 
                        shape="circle" 
                        icon="edit"
                        onClick={()=>{
                            dispatch({ "type": "updateProcurementDrawerModel/init", "id" : row.id})
                        }}
                    />
                </span>;
            }
        } 
    ]
}