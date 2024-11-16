import { SET_AUTH_STATUS, SIGN_IN_SUCCESS, SIGN_UP_SUCCESS } from '../reduxConst'

const initialState = {
  isAuthenticated: !!localStorage.getItem('token'),
};

export default function authReducer(state = initialState, action: any) {
  switch (action.type) {
    case SIGN_IN_SUCCESS:
      return { ...state, isAuthenticated: true };
    case SIGN_UP_SUCCESS:
      return { ...state };
    case SET_AUTH_STATUS:
      return {
        ...state,
        isAuthenticated: action.payload,
      };
    default:
      return state;
  }
}
