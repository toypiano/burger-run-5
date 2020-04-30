import { connect } from 'react-redux';
import Auth from './Auth';
import * as actionCreators from '../../app/ducks/auth';

const mapState = (state) => {
  const {
    auth: { idToken },
  } = state;
  return { isAuthenticated: idToken !== null };
};

export default connect(mapState, actionCreators)(Auth);
