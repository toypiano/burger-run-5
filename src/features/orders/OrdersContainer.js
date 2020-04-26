import { connect } from 'react-redux';
import Orders from './Orders';
import * as actionCreators from '../../app/ducks/orders';

const mapState = (state) => {
  const {
    orders: { orders },
  } = state;
  return orders;
};

export default connect(mapState, actionCreators)(Orders);
