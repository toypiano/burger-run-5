import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import BuildControl from './BuildControl';
import OrderButton from './OrderButton';

BuildControls.propTypes = {
  className: PropTypes.string.isRequired,
  controlItems: PropTypes.arrayOf(PropTypes.string).isRequired,
};

function BuildControls({
  className,
  controlItems,
  price,
  addIngredient,
  removeIngredient,
  ingredients,
  isPurchasable,
  beginOrder,
}) {
  return (
    <div className={className}>
      <p>
        Current Price: $<span>{price.toFixed(2)}</span>
      </p>
      {controlItems.map((item) => (
        <BuildControl
          key={item}
          label={item}
          add={() => addIngredient(item)}
          remove={() => removeIngredient(item)}
          disabled={ingredients[item] <= 0}
        />
      ))}
      <OrderButton disabled={!isPurchasable} clicked={beginOrder}>
        Order Now
      </OrderButton>
    </div>
  );
}

export default styled(BuildControls)`
  ${(props) => css`
    background: var(--cl-primary);
    padding: 1em 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    p {
      span {
        font-weight: var(--fw-bold);
      }
    }
  `}
`;
