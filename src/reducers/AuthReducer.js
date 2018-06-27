import {
  LOGIN_RESPONSE,
  LOGIN_ERROR,
} from '../constants/actions';

const INITIAL_STATE = { user: null }

export default(state = INITIAL_STATE, action) => {
  switch(action.type) {
    case LOGIN_RESPONSE:
      return { ...state, user: action.user };
    case LOGIN_ERROR:
      return { ...state, error: action.error };
    default:
      return state;
  }
};