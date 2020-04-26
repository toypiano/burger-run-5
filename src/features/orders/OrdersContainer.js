import { connect } from 'react-redux';
import Orders from './Orders';
import * as actionCreators from '../../app/ducks/orders';

const mapState = (state) => {
  console.log(state);
  const {
    orders: { orders },
  } = state;
  return { orders }; // returning prop (object) here
};

export default connect(mapState, actionCreators)(Orders);
