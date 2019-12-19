import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  };
};

export const authSuccess = authData => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    authData
  };
};

export const authFailed = error => {
  return {
    type: actionTypes.AUTH_FAILED,
    error
  };
};

export const auth = (email, password) => {
  return dispatch => {
    console.log(email, password, '<------');

    dispatch(authStart());
    axios
      .post(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD9AgSOc5bX-4C4q55wKplZLb7y9F627gs',
        { email, password, returnSecureToken: true }
      )
      .then(({ data }) => {
        console.log(data);
        dispatch(authSuccess(data));
      })
      .catch(err => {
        console.log(err);
        dispatch(authFailed(err));
      });
  };
};
