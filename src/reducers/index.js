import { combineReducers } from 'redux';
import new_user from './registerReducer';
import login_user from './loginReducer';

export default combineReducers({
  new_user,
  login_user
})
