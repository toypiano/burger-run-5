import { connect } from 'react-redux';
import App from './App';
import { checkAuthStatus } from './ducks/auth';

const mapState = (state) => {
  const {
    auth: { idToken },
  } = state;
  return { isAuthenticated: idToken ? true : false };
};
const AppContainer = connect(mapState, { checkAuthStatus })(App);

export default AppContainer;
