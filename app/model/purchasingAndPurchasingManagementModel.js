import _ from "lodash/fp";
import { addPurchasingAndPurchasing } from "../axios/purchaseAPI";

export default {
    namespace: 'purchasingAndPurchasingManagementModel',
    state : {
        step : 2,
        step1Form : {

        } 
    },
    reducers : {
        changeStep1Form(state, { step1Form}){
            return _.set("step1Form", step1Form ,state);
        },
        changeStep(state, { step }) {
            return _.set("step", step, state);
        }
    },
    effects : {
        *submitForm1({ step1Form } , {put}){
            yield put({ "type": "changeStep1Form", step1Form});
            yield put({ "type": "changeStep", "step" : 2});
        },
        *submitForm2({step2Form} , {put , select}){
            const { step1Form } = yield select(({ purchasingAndPurchasingManagementModel }) => purchasingAndPurchasingManagementModel);
            //提交
            yield addPurchasingAndPurchasing({
                step1Form ,
                step2Form 
            });
            yield put({ "type": "changeStep", "step": 3 });
        }
    }
}