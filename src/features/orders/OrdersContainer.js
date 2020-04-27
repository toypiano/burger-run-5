import { connect } from 'react-redux';
import Orders from './Orders';
import * as actionCreators from '../../app/ducks/orders';

const mapState = (state) => {
  const {
    orders: { orders },
    auth: { idToken },
  } = state;
  return { orders, idToken }; // returning prop (object) here
};

export default connect(mapState, actionCreators)(Orders);
