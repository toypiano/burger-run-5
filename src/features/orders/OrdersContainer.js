import { connect } from 'react-redux';
import Orders from './Orders';
import * as actionCreators from '../../app/ducks/orders';

const mapState = (state) => {
  const {
    orders: { orders },
    auth: { idToken, localId },
  } = state;
  return { orders, idToken, localId }; // returning prop (object) here
};

export default connect(mapState, actionCreators)(Orders);
