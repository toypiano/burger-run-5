import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { Route } from 'react-router-dom';

import CheckoutSummary from './CheckoutSummary';
import ContactData from './contactData/ContactData';
import withErrorHandler from '../../common/hoc/withErrorHandler';
import axios from '../../common/axios-orders';

Checkout.propTypes = {
  className: PropTypes.string.isRequired,
  history: PropTypes.object.isRequired,
};

function Checkout({
  className,
  history,
  match,
  ingredients,
  price,
  orderBurger,
  idToken,
}) {
  const continueCheckout = () => {
    history.replace('/checkout/contact-data');
  };
  const cancelCheckout = () => {
    history.goBack();
  };

  return (
    <div className={className}>
      <CheckoutSummary
        ingredients={ingredients}
        cancelCheckout={cancelCheckout}
        continueCheckout={continueCheckout}
      />
      <Route
        path={match.path + '/contact-data'}
        render={() => (
          <ContactData
            price={price}
            ingredients={ingredients}
            history={history}
            orderBurger={orderBurger}
            idToken={idToken}
          />
        )}
      />
    </div>
  );
}

const StyledCheckout = styled(Checkout)`
  ${(props) => css``}
`;

export default withErrorHandler(StyledCheckout, axios);
