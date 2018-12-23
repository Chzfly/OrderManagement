import { getSupplierDocumentInquiry} from "../axios/purchaseAPI";

export default {
    namespace: 'supplierDocumentInquiryModel',
    state : {
        results : [
            {"id" :"1" , "company" : "" , "thing" : "" , "price" : "" , "amount" : ""},
            {"id" :"2" , "company" : "" , "thing" : "" , "price" : "" , "amount" : ""},
            {"id" :"3" , "company" : "" , "thing" : "" , "price" : "" , "amount" : ""},
            {"id" :"4" , "company" : "" , "thing" : "" , "price" : "" , "amount" : ""},
            {"id" :"5" , "company" : "" , "thing" : "" , "price" : "" , "amount" : ""}
        ]
    },
    reducers : {
        changeResults(state , {results}){
            return {
                ...state , 
                results
            }
        }
    },
    effects : {
        *init(action , {put , call}){
            const {results} = yield getSupplierDocumentInquiry();
            yield put({ "type": "changeResults", results});
        }
    }
}