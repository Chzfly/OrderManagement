import server from "./server";
import querystring from "querystring";
import mock from "mockjs";
/*********************************
**  author: 陈洪泽
**  desc: 采购接口，含模拟
*********************************/

//得到日常采购信息
export const getTb1 = (qs) => {
    // 真实接口
    // return server({
    //     method: 'get',
    //     url: '/getTb1?' + querystring.stringify(qs)
    // });
 
    //模拟接口
    return {
        "results": [
            { 
                value: (function(){
                    return mock.Random.integer(10,999)
                })(), name: '生产原料' 
            },
            {
                value: (function () {
                    return mock.Random.integer(10, 999)
                })(), name: '生产辅料' },
            {
                value: (function () {
                    return mock.Random.integer(10, 999)
                })(), name: '外协加工' },
            {
                value: (function () {
                    return mock.Random.integer(10, 999)
                })(), name: '电气元件' },
            {
                value: (function () {
                    return mock.Random.integer(10, 999)
                })(), name: '机械模组' }
        ]
    }
}
 

//得到日常采购信息
export const getTb2 = (qs) => {
    // 真实接口
    // return server({
    //     method: 'get',
    //     url: '/getTb1?' + querystring.stringify(qs)
    // });

    //模拟接口
    return {
        "results": [
            {
                value: (function () {
                    return mock.Random.integer(10, 999)
                })(), name: '直接访问'
            },
            {
                value: (function () {
                    return mock.Random.integer(10, 999)
                })(), name: '邮件营销'
            },
            {
                value: (function () {
                    return mock.Random.integer(10, 999)
                })(), name: '联盟广告'
            },
            {
                value: (function () {
                    return mock.Random.integer(10, 999)
                })(), name: '视频广告'
            },
            {
                value: (function () {
                    return mock.Random.integer(10, 999)
                })(), name: '搜索引擎'
            }
        ]
    }
}
