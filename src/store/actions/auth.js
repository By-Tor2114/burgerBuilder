import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  };
};

export const authSuccess = (token, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    idToken: token,
    userId
  };
};

export const authFailed = error => {
  return {
    type: actionTypes.AUTH_FAILED,
    error
  };
};

export const auth = (email, password, isSignUp) => {
  return dispatch => {
    dispatch(authStart());

    let url =
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD9AgSOc5bX-4C4q55wKplZLb7y9F627gs';
    if (!isSignUp) {
      url =
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyD9AgSOc5bX-4C4q55wKplZLb7y9F627gs';
    }

    axios
      .post(url, { email, password, returnSecureToken: true })
      .then(({ data }) => {
        console.log(data);
        dispatch(authSuccess(data.idToken, data.localId));
      })
      .catch(err => {
        console.log(err);
        dispatch(authFailed(err));
      });
  };
};
