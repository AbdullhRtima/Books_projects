import {
    REGISTER_USER_START,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAILED
} from '../constants/actionTypes';

const initalState = {
    userinfo : {},
    error: undefined,
    isFetching: false
}

const user = (state = initalState , action)  => {
    switch(action.type){
        case REGISTER_USER_START:{
            return{
                ...state,
                isFetching:true
            }
        }
        case REGISTER_USER_SUCCESS :{
            return{
                ...state,
                userinfo:action.payload,
                isFetching:false
            }
        }
        case REGISTER_USER_FAILED :{
            return{
                ...state,
                error: action.error,
                isFetching: false
            }
        }
        default: return state
    }
}

export default user;
