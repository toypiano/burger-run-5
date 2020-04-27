import { connect } from 'react-redux';
import Auth from './Auth';
import * as actionCreators from '../../app/ducks/auth';

const mapState = (state) => {
  const {
    auth: { error },
  } = state;
  return { error };
};

export default connect(mapState, actionCreators)(Auth);
