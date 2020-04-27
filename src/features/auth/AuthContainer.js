import { connect } from 'react-redux';
import Auth from './Auth';
import * as actionCreators from '../../app/ducks/auth';

const mapState = (state) => {
  return { ...state.auth };
};

export default connect(mapState, actionCreators)(Auth);
