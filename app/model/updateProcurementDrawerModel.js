import immutable from "immutable";
import { findTheDailyProcurement, doupdate} from "../axios/purchaseAPI";
import { message, Button } from 'antd';

export default {
    namespace: 'updateProcurementDrawerModel',
    state : {
        visible : false,
        id : 0,
        info : {}
    },
    reducers : {
        changeVisible(state , {visible}){
            return immutable.fromJS(state).set("visible", visible).toJS();
        },
        changeId(state , {id}){
            return immutable.fromJS(state).set("id" , id).toJS();
        },
        changeInfo(state , {info}){
            return immutable.fromJS(state).set("info", info).toJS();
        }
    },
    effects : {
        *init({id} , {put , select}){
            yield put({ "type" : "changeId" , id});
            yield put({ "type": "changeVisible" , "visible" : true});

            const {info} = yield findTheDailyProcurement({
                id
            });   

            yield put({ "type": "changeInfo", "info": info });
        },
        //执行修改
        *doUpdate({info} , {put, select}){
            const { result } = yield doupdate(info);  
            yield put({ "type": "changeVisible", "visible": false });

            if(result == 200){
                message.success('成功修改！' , 1);
            }else{
                message.error('修改失败！' , 1);
            } 
            
            //页面刷新
            // window.location.reload();
        }
    }
}