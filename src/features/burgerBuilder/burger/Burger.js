import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import Ingredient from './Ingredient';

Burger.propTypes = {
  className: PropTypes.string.isRequired,
};

const mapIngredients = (ingredients) => {
  return Object.entries(ingredients).map(([ing, qty]) =>
    [...Array(qty)].map((_) => <Ingredient key={ing} type={ing} />)
  );
};

function Burger({ className, ingredients }) {
  let mappedIngredients = mapIngredients(ingredients);
  return (
    <div className={className}>
      <Ingredient type="bread-top">
        <Ingredient type="seeds1" />
        <Ingredient type="seeds2" />
      </Ingredient>
      {mappedIngredients}
      <Ingredient type="bread-bottom" />
    </div>
  );
}

export default styled(Burger)`
  ${(props) => css`
    position: relative;
    width: 90%;
    max-width: 450px;
    height: 300px;
    margin: 0.8em auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    @media (min-width: 500px) {
      width: 450px;
      height: 350px;
    }
  `}
`;
