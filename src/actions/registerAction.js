import axios from 'axios';

import {
    REGISTER_USER_START,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAILED
} from '../constants/actionTypes';

export const registerStart = () => {
  return {
    type: REGISTER_USER_START
  };
}
export const registerSuccess = (payload) => {
  return {
    type: REGISTER_USER_SUCCESS,
    payload
  };
}
export const registerFailed = (message) => {
  return {
    type: REGISTER_USER_FAILED,
    error: message
  };
}

export default userData => dispatch => {
  dispatch(registerStart());
  console.log('user data ', userData);
  console.log('i am inside fetch');
  axios.post('https://stormy-eyrie-81072.herokuapp.com/api/auth/signup',
      {
       name: "mmm",
       password: "123",
       email:"mm@gmail.com"
      }
  )
  .then(res => {
    console.log(res.status, 'status is here');
  })
  .catch(err => {
    dispatch(registerFailed(err.message))
  })
  //
  //
  // fetch('https://stormy-eyrie-81072.herokuapp.com/api/auth/signup',
  //   {
  //     method: 'POST',
  //     headers: {
  //       Accept: 'application/json',
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify(userData),
  //     credentials: true,
  //     mode: 'no-cors'
  //   }
  // )
  // .then(res => {
  //   if (res.status >= 400) {
  //     console.log(res.status, ' res.status');
  //     throw new Error('Bad Response from server');
  //   }
  //   return res.json();
  // }).then(json => {
  //   console.log(json, " json");
  //   return dispatch(registerSuccess(json));
  // }).catch(err => dispatch(registerFailed(err.message)));
};
