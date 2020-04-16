import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

OrderSummary.propTypes = {
  className: PropTypes.string.isRequired,
};

function OrderSummary({ className, ingredients }) {
  const ingredientsSummary = Object.entries(ingredients).map(([ing, qty]) => (
    <li key={ing}>
      <span className="summary__ingredient">{ing}</span>
      <span className="summary__quantity">{qty}</span>
    </li>
  ));

  return (
    <div className={className}>
      <h3>Your Order</h3>
      <p>A tasty burger with the following ingredients!</p>
      <ul>{ingredientsSummary}</ul>
    </div>
  );
}

export default styled(OrderSummary)`
  ${(props) => css`
    display: flex;
    flex-direction: column;
    align-items: center;
    p {
      text-align: center;
    }
    ul {
      transform: translateX(-1em);
      li {
        span.summary__ingredient {
          display: inline-block;
          width: 5em;
          text-transform: capitalize;
        }
      }
    }
  `}
`;
