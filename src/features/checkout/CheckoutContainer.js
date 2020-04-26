import { connect } from 'react-redux';
import Checkout from './Checkout';
import { orderBurger } from '../../app/ducks/orders';

const mapState = (state) => {
  const {
    burgerBuilder: { ingredients, price },
  } = state;
  return { ingredients, price };
};

export default connect(mapState, { orderBurger })(Checkout);
