import { connect } from 'react-redux';
import * as actionCreators from '../../app/ducks/burgerBuilder';

import BurgerBuilder from './BurgerBuilder';

const mapState = (state) => {
  const {
    burgerBuilder: { ingredients, price, fetchError },
  } = state;
  return { ingredients, price, fetchError };
};

export default connect(mapState, actionCreators)(BurgerBuilder);
