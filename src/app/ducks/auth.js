import produce from 'immer';
import axios from '../../common/axios-orders';

// Actions
const REQUEST = 'auth/request';
const SUCCESS = 'auth/success';
const FAIL = 'auth/fail';
const SIGN_OUT = 'auth/signOut';
const REDIRECT_PATH_SET = 'auth/redirectPathSet';

// Reducer
const initialState = {
  error: null,
};
export default function (state = initialState, action) {
  switch (action.type) {
    case SUCCESS:
      return produce(state, (d) => {
        d.error = null;
      });
    case FAIL:
      return produce(state, (d) => {
        d.error = action.error;
      });
    default:
      return state;
  }
}

// Action Creators
export const signOut = () => {
  localStorage.removeItem('idToken');
  localStorage.removeItem('expirationDate');
  localStorage.removeItem('localId');
  return { type: SIGN_OUT };
};

export const setAuthRedirectPath = (path) => ({
  type: REDIRECT_PATH_SET,
  path,
});

export const authRequest = () => ({
  type: REQUEST,
});

export const authSuccess = ({ idToken, localId }) => ({
  type: SUCCESS,
  idToken,
  localId,
});

export const authFail = (error) => ({
  type: FAIL,
  error,
});

// Thunks Action Dispatcher
const SIGN_UP =
  'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA1pWZdfPD4UUUAre_lIUZK-WwyZvIyuW4';
const SIGN_IN =
  'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA1pWZdfPD4UUUAre_lIUZK-WwyZvIyuW4';

export const auth = (email, password, isSignIn) => async (dispatch) => {
  dispatch(authRequest());
  const payload = {
    email,
    password,
    returnSecureToken: true,
  };
  const uri = isSignIn ? SIGN_IN : SIGN_UP;
  try {
    const response = await axios.post(uri, payload);
    console.log(response);
    dispatch(authSuccess(response.data));
  } catch (err) {
    // use err if no response (server error)
    const error = err.response ? err.response.data.error : err;
    console.error(error);
    dispatch(authFail(error));
  }
};
