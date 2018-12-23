import { getTheSupplierDocumentInquiryById } from "../axios/purchaseAPI";
export default {
    namespace : 'sdim_model',
    state : {
        isShow : false,
        info : {
            
        }
    },
    reducers : {
        showSync(state ){
            return {
                ...state,
                isShow: true
            }
        },
        hide(state){
            return {
                ...state ,
                isShow : false
            }
        },
        changeInfo(state , {info}){
            return {
                ...state,
                info
            }
        }
    },
    effects : {
        *show({id} , {put}){
            const info = yield getTheSupplierDocumentInquiryById({
                id
            });
            
            yield put({ "type": "showSync"});
            yield put({"type" : "changeInfo" , info})
        }
    }
}