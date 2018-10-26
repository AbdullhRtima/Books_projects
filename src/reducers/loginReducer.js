import {
    LOGIN_USER_START,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAILED
} from '../constants/actionTypes';

const initalState = {
    error: undefined,
    isFetching: false
}

const Login = (state = initalState , action)  => {
    switch(action.type){
        case LOGIN_USER_START:{
            return{
                ...state,
                isFetching:true
            }
        }
        case LOGIN_USER_SUCCESS :{
            return{
                ...state,
                isFetching:false
            }
        }
        case LOGIN_USER_FAILED :{
            return{
                ...state,
                error: action.error,
                isFetching: false
            }
        }
        default: return state
    }
}

export default Login;
