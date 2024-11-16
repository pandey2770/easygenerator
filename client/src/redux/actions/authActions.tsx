import { Dispatch } from 'redux';
import { postData } from '../../utils/apiClient';
import { SET_AUTH_STATUS, SIGN_IN_SUCCESS, SIGN_UP_SUCCESS } from '../reduxConst';
import { API_END_POINT } from '../../utils/appConst';

export const signUpUser = (data: { email: string; name: string; password: string }) => async (dispatch: Dispatch) => {
  try {
    const response = await postData(API_END_POINT.SIGN_UP, data);
    dispatch({ type: SIGN_UP_SUCCESS, payload: response.data });
  } catch (error) {
    console.error('Error posting data:', error);
  }
};

export const signInUser = (data: { email: string; password: string }) => async (dispatch: Dispatch) => {
  try {
    const response = await postData(API_END_POINT.SIGN_IN, data);
    localStorage.setItem('token', response.data.token);
    dispatch({ type: SIGN_IN_SUCCESS, payload: response.data });
  } catch (error) {
    console.error('Error posting data:', error);
  }
};

export const checkUserAuth = () => async (dispatch: Dispatch) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    dispatch({ type: SET_AUTH_STATUS, payload: true });
  } else {
    dispatch({ type: SET_AUTH_STATUS, payload: false });
  }
};