import {getAllStaff} from "../axios/purchaseAPI";

export default {
    namespace : 'staffListModel',
    state : {
        top : 0,
        left : 0,
        results : [],
        keyword :"",
        isShow : false
    },
    reducers : {
        changeisShow(state , {isShow}){
            return {
                ...state ,
                isShow
            }
        },
        changeTL(state , {top , left}){
            return {
                ...state , 
                top , 
                left
            }
        },
        changeResults(state , {results}){
            return {
                ...state , 
                results
            }
        },
        changeKeyword(state , {keyword}){
            return {
                ...state,
                keyword
            }
        }
    },
    effects : {
        *init(action , {put}){
            const {results} = yield getAllStaff({});
            yield put({ "type": "changeResults" , results});
        },
        *changekeyword({ keyword }, { put }){
            yield put({ "type": "changeKeyword", keyword });
            const { results } = yield getAllStaff({
                keyword
            });
            yield put({ "type": "changeResults", results });
        }
    }
}