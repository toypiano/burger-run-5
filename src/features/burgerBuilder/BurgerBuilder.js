import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import axios from '../../common/axios-orders';

import withErrorHandler from '../../common/hoc/withErrorHandler';

import Burger from './burger/Burger';
import BuildControls from './buildControls/BuildControls';
import Modal from '../../common/ui/Modal';
import OrderSummary from './OrderSummary';

BurgerBuilder.propTypes = {
  className: PropTypes.string.isRequired,
};

const controlItems = ['salad', 'bacon', 'cheese', 'beef'];

const getPurchasable = (ingredients) => {
  const totalQty = Object.values(ingredients).reduce(
    (sum, val) => sum + val,
    0
  );
  return totalQty > 0;
};

function BurgerBuilder({
  className,
  history,
  ingredients,
  price,
  addIngredient,
  removeIngredient,
}) {
  const [isOrdering, setIsOrdering] = useState(false);
  // const [isLoading, setIsLoading] = useState(false);

  const beginOrder = () => {
    setIsOrdering(true);
  };
  const cancelOrder = () => {
    setIsOrdering(false);
  };

  const continueOrder = async () => {
    // const order = {
    //   ingredients,
    //   price,
    //   customer: {
    //     name: 'Elaine',
    //     address: {
    //       street: 'test',
    //       zipCode: '123',
    //       country: 'Canada',
    //     },
    //     email: 'test@test.com',
    //   },
    //   deliveryMethod: 'fastest',
    // };
    // try {
    //   setIsLoading(true);
    //   const response = await axios.post('/orders.json', order);
    //   setIsLoading(false);
    //   setIsOrdering(false);
    //   console.log(response);
    // } catch (err) {
    //   setIsLoading(false);
    //   setIsOrdering(false);
    //   console.error(err);
    // }
    const searchParam = Object.entries(ingredients)
      .map(([ing, qty]) => `${ing}=${qty}`)
      .join('&');

    history.push({
      pathname: '/checkout',
      search: '?' + searchParam + `&price=${price}`,
    });
  };

  const modal = (
    <Modal show={isOrdering} closeModal={cancelOrder}>
      <OrderSummary
        ingredients={ingredients}
        continueOrder={continueOrder}
        cancelOrder={cancelOrder}
      />
    </Modal>
  );

  return (
    <div className={className}>
      {modal}
      <div className="burger-container">
        <Burger ingredients={ingredients} />
      </div>
      <BuildControls
        price={price}
        controlItems={controlItems}
        ingredients={ingredients}
        addIngredient={addIngredient}
        removeIngredient={removeIngredient}
        isPurchasable={getPurchasable(ingredients)}
        beginOrder={beginOrder}
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
  `}
`;

export default withErrorHandler(StyledBurgerBuilder, axios);
