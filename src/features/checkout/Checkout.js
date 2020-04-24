import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { Route } from 'react-router-dom';

import { ingredients as ing } from '../../common/mock/';
import CheckoutSummary from './CheckoutSummary';
import ContactData from './ContactData';
import withErrorHandler from '../../common/hoc/withErrorHandler';
import axios from '../../common/axios-orders';

Checkout.propTypes = {
  className: PropTypes.string.isRequired,
  history: PropTypes.object.isRequired,
};

function useIngredientsAndPrice(location) {
  const [ingredients, setIngredients] = useState({ ...ing });
  const [price, setPrice] = useState(0);
  const searchRef = useRef();
  searchRef.current = location.search;
  useEffect(() => {
    // location represents current location
    const query = new URLSearchParams(searchRef.current);
    const parsedIngredients = [...query.entries()].reduce((obj, [ing, qty]) => {
      obj[ing] = +qty; // query param is string!!
      return obj;
    }, {});
    setPrice(+parsedIngredients.price);
    delete parsedIngredients.price;
    setIngredients(parsedIngredients);
  }, []);
  return [ingredients, price];
}

function Checkout({ className, history, location, match }) {
  const [ingredients, price] = useIngredientsAndPrice(location);
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
