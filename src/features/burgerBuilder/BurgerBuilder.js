import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import * as mock from '../../common/mock';

import Burger from './burger/Burger';
import BuildControls from './burger/BuildControls';

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

function BurgerBuilder({ className }) {
  const [ingredients, setIngredients] = useState({ ...mock.ingredients });
  const [price, setPrice] = useState(BASE_PRICE);

  const addIngredient = (ing) => {
    setIngredients({ ...ingredients, [ing]: ingredients[ing] + 1 });
    setPrice((p) => p + INGREDIENT_PRICE[ing]);
  };
  const removeIngredient = (ing) => {
    if (ingredients[ing] <= 0) return;
    setIngredients({ ...ingredients, [ing]: ingredients[ing] - 1 });
    setPrice((p) => p - INGREDIENT_PRICE[ing]);
  };

  return (
    <div className={className}>
      <Burger ingredients={ingredients} />
      <BuildControls
        price={price}
        controlItems={controlItems}
        ingredients={ingredients}
        addIngredient={addIngredient}
        removeIngredient={removeIngredient}
      />
    </div>
  );
}

export default styled(BurgerBuilder)`
  ${(props) => css`
    width: 100vw;
  `}
`;
