import axios from 'axios';
import * as actionTypes from './actionTypes';


export const authStart= () => {
  return {
    type: actionTypes.AUTH_START
  }
};


export const authSuccess = token => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    token: token
  }
};


export const authFail = error => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error
  }
};


export const authLogout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('expirationDate');
  return { type: actionTypes.AUTH_LOGOUT }
};


export const checkAuthTimeout = expirationTime => dispatch => setTimeout(() => dispatch(authLogout()), expirationTime * 1000);


export const authLogin = (username, password) => {
  return dispatch => {
    dispatch(authStart());
    axios.post('http://127.0.0.1:8000/rest-auth/login/', { username, password })
      .then(res => {
        const token = res.data.key;
        // create a date which is one hour in the future
        const expirationDate = new Date(new Date().getTime() + 3600 * 1000).toString();
        localStorage.setItem('token', token);
        localStorage.setItem('expirationDate', expirationDate);
        dispatch(authSuccess(token));
        dispatch(checkAuthTimeout(3600))
      }).catch(err => dispatch(authFail(err)))
  }
};


export const authSignup = (username, email, password1, password2) => {
  return dispatch => {
    dispatch(authStart());
    axios.post('http://127.0.0.1:8000/rest-auth/registration/', { username, email, password1, password2 })
      .then(res => {
        const token = res.data.key;
        // create a date which is one hour in the future
        const expirationDate = new Date(new Date().getTime() + 3600 * 1000).toString();
        localStorage.setItem('token', token);
        localStorage.setItem('expirationDate', expirationDate);
        dispatch(authSuccess(token));
        dispatch(checkAuthTimeout(3600))
      }).catch(err => dispatch(authFail(err)))
  }
};


export const authCheckState = () => dispatch => {
  const token = localStorage.getItem('token');
  if (!token) {
    dispatch(authLogout())
  } else {
    const expirationDate = new Date(localStorage.getItem('expirationDate'));
    if (expirationDate < new Date()) {
      dispatch(authLogout())
    } else {
      dispatch(authSuccess(token));
      dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000))
    }
  }
};
