import { connect } from 'react-redux';
import Checkout from './Checkout';
import { orderBurger } from '../../app/ducks/orders';

const mapState = (state) => {
  const {
    burgerBuilder: { ingredients, price },
    auth: { idToken, localId, email },
  } = state;
  return { ingredients, price, idToken, localId, email };
};

export default connect(mapState, { orderBurger })(Checkout);
