import { connect } from 'react-redux';
import App from './App';
import { checkAuthStatus } from './ducks/auth';

const AppContainer = connect(null, { checkAuthStatus })(App);

export default AppContainer;
