import { connect } from 'react-redux';
import * as actionCreators from '../../app/ducks/burgerBuilder';

import BurgerBuilder from './BurgerBuilder';

const mapState = (state) => {
  const {
    burgerBuilder: { ingredients, price, fetchError },
    auth: { idToken },
  } = state;
  return { ingredients, price, fetchError, isAuthenticated: idToken !== null };
};

export default connect(mapState, actionCreators)(BurgerBuilder);
