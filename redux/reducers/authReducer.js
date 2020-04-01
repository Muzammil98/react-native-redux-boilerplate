import {LOGIN_USER, LOGOUT_USER} from '../actions/types'; // Reducers requires action types for switch cases

const initialState = {
  isAuthenticated: false,
};
export default function(state = initialState, action) {
  switch (action.type) {
    case LOGIN_USER:
      return {
        ...state,
        isAuthenticated: action.payload,
      };
    case LOGOUT_USER:
      return {
        ...state,
        isAuthenticated: action.payload,
      };
    default:
      return state;
  }
}
