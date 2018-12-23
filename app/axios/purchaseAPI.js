import server from "./server";
import querystring from "querystring";
import mock_dailypurchase_data from "./mock_dailypurchase_data.json";
import mock400 from "./mock400.json";
import mock from "mockjs";
/*********************************
**  author: 陈洪泽
**  desc: 采购接口
*********************************/

//得到日常采购信息
export const findDailyProcurement = (qs) => {
    // 真实接口
    // return server({
    //     method: 'get',
    //     url: '/findDailyProcurement?' + querystring.stringify(qs)
    // });
 
    //模拟接口
    if(!qs.sortby){
        qs.sortby = "id";
        qs.sortdirection = 1;
    }

    var results = mock_dailypurchase_data.filter(item => {
        var flag = true;
        if (qs.type && !qs.type.split("v").includes(item.type)){
            flag = false;
        }

        if (qs.level && !qs.level.split("v").includes(item.level)) {
            flag = false;
        }

        if (qs.region && !qs.region.split("v").includes(item.region)) {
            flag = false;
        }

        if (qs.price) {
            if(! (item.price > Number(qs.price.split("to")[0]) && item.price < Number(qs.price.split("to")[1]))){
                flag = false;
            }
        }

        if (qs.isPay) {
            if(qs.isPay == "y" && item.isPay == false){
                flag = false;
            } else if (qs.isPay == "n" && item.isPay == true){
                flag = false;
            }
        }

        if (qs.amount) {
            if (!(item.amount > Number(qs.amount.split("to")[0]) && item.amount < Number(qs.amount.split("to")[1]))){
                flag = false;
            }
        }

        if (qs.date) {
            if (!(item.date > Number(qs.date.split("to")[0]) && item.date < Number(qs.date.split("to")[1]))){
                flag = false;
            }
        }

        if(qs.keyword){
            if(!(new RegExp(qs.keyword).test(item.thing))){
                flag = false;
            }
        }


        return flag
    });
 
    return {
        "total": results.length,
        "results": results.sort((a,b)=>qs.sortdirection * (a[qs.sortby] - b[qs.sortby])).slice((qs.page - 1) * qs.pagesize, qs.page * qs.pagesize)
    }
}

//得到某个日常采购信息
export const findTheDailyProcurement = (qs) => {
    // return server({
    //     method: 'get',
    //     url: '/findTheDailyProcurement?' + querystring.stringify(qs)
    // });

    return {
        "info": mock_dailypurchase_data.filter(item => item.id == qs.id)[0]
    }
}

export const doupdate = (qs) => {
    // return server({
    //     method: 'post',
    //     url: '/doupdate',
    //     data : {
    //         ...qs
    //     }
    // });

    return {
        result : 200,
        err : ""
    }
}

export const checkFapiao = (qs) => {
    // return server({
    //     method: 'get',
    //     url: '/checkFapiao?' + querystring.stringify(qs)
    // });

    return {
        "occupied" : Math.random() > 0.5
    }
}


export const addPurchasingAndPurchasing = (qs) => {
    return server({
        method: 'post',
        url: '/addPurchasingAndPurchasing',
        data : qs
    });
}


export const getSupplierDocumentInquiry = (qs) => {
    // return server({
    //     method: 'get',
    //     url: '/getSupplierDocumentInquiry' + querystring.stringify(qs)
    // });

    return mock.mock({
            // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
            'results|1-10': [{
                // 属性 id 是一个自增数，起始值为 1，每次增 1
                'id|+1': 1,
                'company' : function(){
                    return mock.Random.cword(4)
                },
                'thing': function () {
                    return mock.Random.cword(4)
                },
                'price': function () {
                    return mock.Random.integer(1000,2000)
                },
                'amount': function () {
                    return mock.Random.integer(1000, 2000)
                }
            }]
    })
}

export const getTheSupplierDocumentInquiryById = (qs) => {
    // return server({
    //     method: 'get',
    //     url: '/getTheSupplierDocumentInquiryById' + querystring.stringify(qs)
    // });

    return mock.mock({
        'id': qs.id,
        'company': function () {
            return mock.Random.cword(4)
        },
        'thing': function () {
            return mock.Random.cword(4)
        },
        'price': function () {
            return mock.Random.integer(1000, 2000)
        },
        'amount': function () {
            return mock.Random.integer(1000, 2000)
        },
        'bgy': [
            { "name": "迪丽热巴", "avatar": "dilireba.png"},
            { "name": "鹿晗", "avatar": "luhan.png"},
            { "name": "李易峰", "avatar": "liyifeng.png"}
        ]
    })
}


export const getAllStaff = (qs) => {
    // return server({
    //     method: 'get',
    //     url: '/getAllStaff' + querystring.stringify(qs)
    // });

    return {
        "results": mock400.filter(item => {
            return new RegExp(qs.keyword).test(item.name) || new RegExp(qs.keyword).test(item.id.toString())
        })
    };
}
