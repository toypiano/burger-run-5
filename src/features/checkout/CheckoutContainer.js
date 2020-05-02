import { connect } from 'react-redux';
import Checkout from './Checkout';
import { orderBurger } from '../../app/ducks/orders';

const mapState = (state) => {
  const {
    burgerBuilder: { ingredients, price },
    auth: { idToken, localId },
  } = state;
  return { ingredients, price, idToken, localId };
};

export default connect(mapState, { orderBurger })(Checkout);
