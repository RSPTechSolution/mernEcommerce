import { CLEAR_ERRORS, LOGOUT_FAIL, LOGOUT_SUCCESS, LOAD_USER_REQUEST, LOAD_USER_SUCCESS, LOAD_USER_FAIL, LOGIN_FAIL, LOGIN_REQUEST, LOGIN_SUCCESS, REGISTER_USER_FAIL, REGISTER_USER_REQUEST, REGISTER_USER_SUCCESS } from "../constants/userconstants"
import axios from 'axios';


//LOGIN USER
export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({type: LOGIN_REQUEST});

        const config = { header: {"Content-Type": "application/json"} };

        const {data} = await axios.post(`/api/v1/login`, {email, password}, config);

        dispatch({ type: LOGIN_SUCCESS, payload: data.user });
    } catch (error) {
        dispatch({type: LOGIN_FAIL, payload: error.response.data.error});
    }
}

// REGISTER USER
export const register = (userData) => async (dispatch) => {
    try {
        dispatch({type: REGISTER_USER_REQUEST});

        const config = { header: {"Content-Type": "multipart/form-data"} };

        const {data} = await axios.post(`/api/v1/register`, userData , config);

        dispatch({ type: REGISTER_USER_SUCCESS, payload: data.user });
    } catch (error) {
        dispatch({type: REGISTER_USER_FAIL, payload: error.response.data.error});
    }
};

// LOAD USER
export const loadUser = () => async (dispatch) => {
    try {
        dispatch({ type: LOAD_USER_REQUEST });

        const {data} = await axios.get(`/api/v1/me`);
        
        dispatch({ type: LOAD_USER_SUCCESS, payload:data.user });
    } catch (error) {
        dispatch({type: LOAD_USER_FAIL, payload: error.response.data.error});
    }
}

// Logout User
export const logout = () => async (dispatch) => {
    try {
      await axios.get(`/api/v1/logout`);
  
      dispatch({ type: LOGOUT_SUCCESS });
    } catch (error) {
      dispatch({ type: LOGOUT_FAIL, payload: error.response.data.error });
    }
};

// CLEAR ERRORS
export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    });
}