import { connect } from 'react-redux';
import Auth from './Auth';
import * as actionCreators from '../../app/ducks/auth';

const mapState = (state) => {
  const {
    auth: { idToken, authRedirectPath },
    burgerBuilder: { isBuilding },
  } = state;
  return { isAuthenticated: idToken !== null, authRedirectPath, isBuilding };
};

export default connect(mapState, actionCreators)(Auth);
