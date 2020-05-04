import produce from 'immer';
import axios from '../../common/axios-orders';

// IDs for listeners / timers
let authTimeoutID;

// Actions
const REQUEST = 'auth/request';
const SUCCESS = 'auth/success';
const FAIL = 'auth/fail';
const LOGOUT = 'auth/logOut';
const REDIRECT_PATH_SET = 'auth/redirectPathSet';
const TIMEOUT_SET = 'auth/timeoutSet';
const TIMEOUT_CLEAR = 'auth/timeoutCleared';

// Reducer
const initialState = {
  idToken: null,
  localId: null,
  email: null,
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
        d.email = action.email;
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
        d.email = null;
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

export const authSuccess = ({ idToken, localId, email }) => ({
  type: SUCCESS,
  idToken,
  localId,
  email,
});

export const authFail = (error) => ({
  type: FAIL,
  error,
});

export const clearAuthTimeout = () => {
  clearTimeout(authTimeoutID);
  return { type: TIMEOUT_CLEAR };
};

// Thunks Action Dispatcher
const SIGN_UP =
  'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=';
const SIGN_IN =
  'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=';

export const auth = (email, password, isSignIn) => async (dispatch) => {
  dispatch(authRequest());
  const payload = {
    email,
    password,
    returnSecureToken: true,
  };
  const uri = isSignIn ? SIGN_IN : SIGN_UP;
  try {
    // authenticate user
    const response = await axios.post(uri, payload);
    console.log(response);
    // set localStorage
    localStorage.setItem('idToken', response.data.idToken);
    localStorage.setItem('localId', response.data.localId);
    const expirationDate = new Date(
      new Date().getTime() + response.data.expiresIn * 1000
    );
    localStorage.setItem('expirationDate', expirationDate);
    // dispatch to the store
    dispatch(authSuccess(response.data));
    dispatch(setAuthTimeout(response.data.expiresIn));
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

export const logout = () => (dispatch, getState) => {
  // clear auto-logout
  if (getState().auth.idToken) {
    dispatch(clearAuthTimeout());
  }
  // clear localStorage
  localStorage.removeItem('idToken');
  localStorage.removeItem('expirationDate');
  localStorage.removeItem('localId');
  // logout
  dispatch({ type: LOGOUT });
};

/**
 * Logout user automatically after firebase auth-token expires
 * @param {number} seconds
 */
export const setAuthTimeout = (seconds) => (dispatch) => {
  authTimeoutID = setTimeout(() => {
    dispatch(logout());
  }, seconds * 1000);
  dispatch({ type: TIMEOUT_SET });
};

export const checkAuthStatus = () => (dispatch) => {
  const idToken = localStorage.getItem('idToken');
  const localId = localStorage.getItem('localId');
  if (!idToken) {
    // If token is not there, logout
    dispatch(logout());
  } else {
    // if token is there, check expiration time
    const expirationDate = new Date(localStorage.getItem('expirationDate'));

    // if it hasn't expired,
    if (new Date() < expirationDate) {
      const data = { idToken, localId };
      // update token and id in state with
      // the ones retrieved from the localStorage
      dispatch(authSuccess(data));

      // And reset the timeout to auto-logout
      // So that when a user logs in and reload the page (state is lost)
      // one will still be logged out automatically after initial expiration time
      const remainingSeconds = Math.floor(
        (expirationDate.getTime() - new Date().getTime()) / 1000
      );

      dispatch(clearAuthTimeout()); // must be called before setAuthTimeout
      dispatch(setAuthTimeout(remainingSeconds)); // updates global timer id
    }
  }
};
