import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import * as mock from '../../common/mock';

import Burger from './burger/Burger';
import BuildControls from './burger/BuildControls';
import Modal from '../../common/ui/Modal';
import OrderSummary from './burger/OrderSummary';

BurgerBuilder.propTypes = {
  className: PropTypes.string.isRequired,
};

const controlItems = ['salad', 'bacon', 'cheese', 'beef'];
const BASE_PRICE = 4.99;
const INGREDIENT_PRICE = {
  salad: 0.5,
  bacon: 0.7,
  cheese: 0.4,
  beef: 1.3,
};

const getPurchasable = (ingredients) => {
  const totalQty = Object.values(ingredients).reduce(
    (sum, val) => sum + val,
    0
  );
  return totalQty > 0;
};

function BurgerBuilder({ className }) {
  const [ingredients, setIngredients] = useState({ ...mock.ingredients });
  const [price, setPrice] = useState(BASE_PRICE);
  const [isOrdering, setIsOrdering] = useState(false);

  const addIngredient = (ing) => {
    setIngredients({ ...ingredients, [ing]: ingredients[ing] + 1 });
    setPrice((p) => p + INGREDIENT_PRICE[ing]);
  };
  const removeIngredient = (ing) => {
    if (ingredients[ing] <= 0) return;
    setIngredients({ ...ingredients, [ing]: ingredients[ing] - 1 });
    setPrice((p) => p - INGREDIENT_PRICE[ing]);
  };

  const beginOrder = () => {
    setIsOrdering(true);
  };
  const cancelOrder = () => {
    setIsOrdering(false);
  };

  const continueOrder = () => {
    alert('Order continued!');
  };

  return (
    <div className={className}>
      <Modal show={isOrdering} closeModal={cancelOrder}>
        <OrderSummary
          ingredients={ingredients}
          continueOrder={continueOrder}
          cancelOrder={cancelOrder}
        />
      </Modal>
      <Burger ingredients={ingredients} />
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

export default styled(BurgerBuilder)`
  ${(props) => css`
    width: 100vw;
  `}
`;
