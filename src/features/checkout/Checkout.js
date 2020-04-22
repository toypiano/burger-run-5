import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { ingredients as ing } from '../../common/mock/';
import CheckoutSummary from './CheckoutSummary';

Checkout.propTypes = {
  className: PropTypes.string.isRequired,
  history: PropTypes.object.isRequired,
};

function useIngredients(location) {
  const [ingredients, setIngredients] = useState({ ...ing });
  useEffect(() => {
    // location represents current location
    const query = new URLSearchParams(location.search);
    const parsedIngredients = [...query.entries()].reduce((obj, [ing, qty]) => {
      obj[ing] = +qty; // query param is string!!
      return obj;
    }, {});
    setIngredients(parsedIngredients);
  }, [location]);
  return ingredients;
}

function Checkout({ className, history, location }) {
  const ingredients = useIngredients(location);
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
