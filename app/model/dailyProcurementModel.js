import server from "../axios/server";
import { findDailyProcurement} from "../axios/purchaseAPI";
var R = require("ramda");
/*********************************
**  author: 陈洪泽
**  desc: 日常采购model
*********************************/

export default {
    namespace: "dailyProcurementModel",
    state : {
        //页码
        page : 1,
        //页面容量
        pagesize : 10,
        //排序
        sortby : "id",
        //方向
        sortdirection : 1,
        //总页数
        total : 0,
        //结果
        results : [],
        //过滤器
        filters : [
             
        ]
    },
    reducers : {
        //改变page
        changePageSync(state , {page}){
            return R.set(R.lensProp("page"), page, state);
        },
        //改变pagesize
        changePagesizeSync(state , {pagesize}){
            return R.set(R.lensProp("pagesize"), pagesize, state);
        },
        //改变排序
        changeSortby(state , {sortby}){
            return R.set(R.lensProp("sortby"), sortby, state);
        },
        //改变排序方向
        changeSortdirection(state, { sortdirection }) {
            return R.set(R.lensProp("sortdirection"), sortdirection, state);
        },
        //改变total
        changeTotal(state, { total }) {
            return R.set(R.lensProp("total"), total, state);
        },
        //改变results
        changeResults(state, { results }) {
            return R.set(R.lensProp("results"), results, state);
        },
        //下面要写三个关于filters的操作
        //增加一项
        addItem(state , {k , v}){
            return R.set(R.lensProp("filters") , R.insert(state.filters.length,{k,v},state.filters) , state);
        },
        //删除一项
        removeItem(state , {k}){
            return R.set(R.lensProp("filters"), R.filter(item => item.k != k ,state.filters) , state)
        },
        //更改一项
        updateItem(state, { k, v }) {
            return R.set(R.lensProp("filters"), R.map(item => item.k == k ? R.set(R.lensProp("v"),v,item): item, state.filters), state)
        }
    },
    //异步的
    effects : {
        //拉取数据
        *loadData(action , {put , select , call}){
            yield call(loadData, { select, put });
        },
        //改变分页或排序
        *changePageOrSort({ page , pagesize , sortby , sortdirection}, { put, select, call}){
            //判断是换还是改变页面容量
            //得到信号量
            const state = yield select(({ dailyProcurementModel }) => dailyProcurementModel);


            if (pagesize != state.pagesize){
                //用户的意图是改变pagesize
                //改变页码为1
                yield put({ "type": "changePageSync", "page" : 1 });
                //换页面容量
                yield put({ "type": "changePagesizeSync", pagesize});
            }else{
                if(sortby != state.sortby || sortdirection != state.sortdirection){
                    //用户的意图是改变排序
                    yield put({ "type": "changeSortdirection", sortdirection})
                    yield put({ "type": "changeSortby", sortby})
                    yield put({ "type": "changePageSync", "page" : 1});
                }else{
                    //用户的意图是换页
                    //换页
                    yield put({ "type": "changePageSync", page });
                }
            }

            yield call(loadData, { select, put });
        },
        //改变过滤器
        *changeFilters({ k, v }, { put, select, call }){
            //得到当前filters
            const { filters } = yield select(({ dailyProcurementModel }) => dailyProcurementModel);
            //判断filters中有没有传入的载荷k，如果有，表示用户试图修改，如果没有，表示用户试图增加。
            var isHaveK = false;
            filters.forEach(item => {
                if(item.k == k){
                    isHaveK = true;
                }
            });
            //如果有 
            if(isHaveK){
                //看v，如果v是空，表示要删除；不是空就是修改
                if(v){
                    yield put({ "type": "updateItem", k, v });
                }else{
                    yield put({ "type": "removeItem", k});
                }
            }else{
                //如果没有，那就增加
                yield put({ "type": "addItem",k ,v});
            }

            //改变页码为1
            yield put({ "type": "changePageSync", "page": 1 });

            yield call(loadData, { select, put });
        }
    }
}

//发出请求的函数
function* loadData({select , put}){
    //得到信号量
    const { page, pagesize , filters , sortby , sortdirection} = yield select(({ dailyProcurementModel }) => dailyProcurementModel);

    //查询对象
    var queryObj = {
        page,
        pagesize, 
        sortby, 
        sortdirection
    };

    //遍历过滤器，拓展查询对象
    for(let i = 0 ; i < filters.length ; i++){
        queryObj[filters[i].k] = filters[i].v;
    }

    //真正发出Ajax请求
    const { results, total } = yield findDailyProcurement(queryObj);

    //改变results
    yield put({ "type": "changeResults", results });
    yield put({ "type": "changeTotal", total });
}