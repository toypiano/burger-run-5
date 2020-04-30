import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import axios from '../../common/axios-orders';
import Axios from 'axios';

import withErrorHandler from '../../common/hoc/withErrorHandler';

import Burger from './burger/Burger';
import BuildControls from './buildControls/BuildControls';
import Modal from '../../common/ui/Modal';
import OrderSummary from './OrderSummary';
import Spinner from '../../common/ui/Spinner';

BurgerBuilder.propTypes = {
  className: PropTypes.string.isRequired,
};

const controlItems = ['salad', 'bacon', 'cheese', 'beef'];

const getPurchasable = (ingredients) => {
  if (ingredients) {
    const totalQty = Object.values(ingredients).reduce(
      (sum, val) => sum + val,
      0
    );
    return totalQty > 0;
  }
  return false;
};

function BurgerBuilder({
  className,
  history,
  ingredients,
  price,
  addIngredient,
  removeIngredient,
  initIngredients,
  fetchError,
  isAuthenticated,
}) {
  const [isOrdering, setIsOrdering] = useState(false);
  const [fetchingIngredients, setFetchingIngredients] = useState(false);

  useEffect(() => {
    setFetchingIngredients(true);
    const source = Axios.CancelToken.source();
    initIngredients(source.token).then(() => {
      setFetchingIngredients(false);
    });
    return () => {
      source.cancel('request canceled by user');
    };
  }, [initIngredients]);

  const beginOrder = () => {
    setIsOrdering(true);
  };
  const cancelOrder = () => {
    setIsOrdering(false);
  };

  const continueOrder = async () => {
    history.push('/checkout');
  };

  const orderSummary = (
    <Modal show={isOrdering} closeModal={cancelOrder}>
      <OrderSummary
        ingredients={ingredients}
        continueOrder={continueOrder}
        cancelOrder={cancelOrder}
      />
    </Modal>
  );

  const fetchErrorMessage = (
    <div className="errorMessage">
      Ingredients cannot be loaded from the server.
    </div>
  );

  return (
    <div className={className}>
      {fetchingIngredients && <Spinner />}
      {orderSummary}
      <div className="burger-container">
        {fetchError ? fetchErrorMessage : <Burger ingredients={ingredients} />}
      </div>
      <BuildControls
        price={price}
        controlItems={controlItems}
        ingredients={ingredients}
        addIngredient={addIngredient}
        removeIngredient={removeIngredient}
        isPurchasable={getPurchasable(ingredients)}
        beginOrder={beginOrder}
        fetchError={fetchError}
        isAuthenticated={isAuthenticated}
      />
    </div>
  );
}

const StyledBurgerBuilder = styled(BurgerBuilder)`
  ${(props) => css`
    width: 100vw;
    .burger-container {
      margin: 0 auto;
      width: 50vh;
      max-width: 90%;
      height: 40vh;
      max-height: 350px;
    }
    .errorMessage {
      padding: 1em;
      background: var(--cl-dark);
      color: var(--cl-light);
      position: relative;
      top: 50%;
      transform: translateY(-50%);
      text-align: center;
    }
  `}
`;

export default withErrorHandler(StyledBurgerBuilder, axios);
