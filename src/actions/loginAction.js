import axios from 'axios';

import {
    LOGIN_USER_START,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAILED
} from '../constants/actionTypes';

export const loginStart = () => {
  return {
    type: LOGIN_USER_START
  };
}
export const loginSuccess = (payload) => {
  return {
    type: LOGIN_USER_SUCCESS,
    payload
  };
}
export const loginFailed = (message) => {
  return {
    type: LOGIN_USER_FAILED,
    error: message
  };
}

export default userInfo => dispatch => {
  dispatch(loginStart());
  axios('https://stormy-eyrie-81072.herokuapp.com/api/auth/signin', {
       method: 'POST',
       headers: {
         Accept: 'application/json',
         'Content-Type': 'application/json'
       },
       body: JSON.stringify(userInfo),
       credentials: true,
       mode: 'no-cors'
   })
   .then(res => {
     console.log(res);
     dispatch(loginSuccess())
   })
   .catch(err => {
     dispatch(loginFailed())
   })
}
