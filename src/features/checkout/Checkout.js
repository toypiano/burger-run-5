import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { ingredients } from '../../common/mock/';
import CheckoutSummary from './CheckoutSummary';

Checkout.propTypes = {
  className: PropTypes.string.isRequired,
  history: PropTypes.object.isRequired,
};

function Checkout({ className, history }) {
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
    </div>
  );
}

export default styled(Checkout)`
  ${(props) => css``}
`;
