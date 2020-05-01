import produce from 'immer';
import axios from '../../common/axios-orders';

// Actions
const REQUEST = 'auth/request';
const SUCCESS = 'auth/success';
const FAIL = 'auth/fail';
const LOGOUT = 'auth/logOut';
const REDIRECT_PATH_SET = 'auth/redirectPathSet';

// Reducer
const initialState = {
  idToken: null,
  localId: null,
  error: null,
  isLoading: false,
  authRedirectPath: '/',
};
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case REQUEST:
      return produce(state, (d) => {
        d.isLoading = true;
        d.error = null;
      });
    case SUCCESS:
      return produce(state, (d) => {
        d.error = null;
        d.localId = action.localId;
        d.idToken = action.idToken;
        d.isLoading = false;
      });
    case FAIL:
      return produce(state, (d) => {
        d.error = action.error;
        d.isLoading = false;
      });
    case LOGOUT:
      return produce(state, (d) => {
        d.localId = null;
        d.idToken = null;
      });
    case REDIRECT_PATH_SET:
      return produce(state, (d) => {
        d.authRedirectPath = action.path;
      });
    default:
      return state;
  }
}

// Action Creators

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

export const logout = () => ({
  type: LOGOUT,
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
    dispatch(checkAuthTimeout(response.data.expiresIn));
  } catch (err) {
    if (err.response) {
      // server response > 200
      dispatch(authFail('Error: ' + err.response.data.error.message));
    } else if (err.request) {
      // request made, but No response from the server
      dispatch(authFail('Error: No response from the server'));
    } else {
      // error thrown before sending request
      dispatch(authFail("Error: request couldn't be made"));
      console.error(err.config);
    }
  }
};

export const checkAuthTimeout = (seconds) => (dispatch) => {
  setTimeout(() => {
    dispatch(logout());
  }, seconds * 1000);
};
