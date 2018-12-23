import { getTb1 , getTb2} from "../axios/indexAPI";

export default {
    namespace : 'indexModel',
    state : {
        results : [],
        results2 : []
    },
    reducers : {
        changeResults(state , {results}){
            return {
                ...state ,
                results
            }
        },
        changeResults2(state, { results }) {
            return {
                ...state,
                results2: results
            }
        }
    },
    effects : {
        *getTb1(action , {put}){
            const {results} = yield getTb1();
            yield put({ "type": "changeResults", results})
        },
        *getTb2(action, { put }) {
            const { results } = yield getTb2();
            yield put({ "type": "changeResults2", results })
        }
    }
}   