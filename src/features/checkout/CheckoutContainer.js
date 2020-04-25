import { connect } from 'react-redux';
import Checkout from './Checkout';

const mapState = (state) => {
  const {
    burgerBuilder: { ingredients, price },
  } = state;
  return { ingredients, price };
};

export default connect(mapState)(Checkout);
