import { connect } from 'react-redux';
import * as actionCreators from '../../app/ducks/burgerBuilder';

import BurgerBuilder from './BurgerBuilder';

const mapState = (state) => {
  const {
    burgerBuilder: { ingredients, price },
  } = state;
  return { ingredients, price };
};

export default connect(mapState, actionCreators)(BurgerBuilder);
