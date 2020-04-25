import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import Button from '../../common/ui/Button';

OrderSummary.propTypes = {
  className: PropTypes.string.isRequired,
};

function OrderSummary({ className, ingredients, cancelOrder, continueOrder }) {
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
      <div className="order-summary__buttons">
        <Button variant="danger" onClick={cancelOrder}>
          Cancel
        </Button>
        <Button variant="success" onClick={continueOrder}>
          Continue
        </Button>
      </div>
    </div>
  );
}

export default styled(OrderSummary)`
  ${(props) => css`
    text-align: center;
    h3 {
      &::after {
        content: '';
        display: block;
        height: 1px;
        width: 3ch;
        margin: 1em auto;
        background-color: var(--cl-dark);
        opacity: 0.2;
      }
    }
    p {
      margin-bottom: 1em;
      font-style: italic;
      padding: 0 1em;
    }
    ul {
      display: inline-block;
      transform: translateX(-1em);
      li {
        &:not(:last-of-type) {
          margin-bottom: 0.5em;
        }
        span.summary__ingredient {
          display: inline-block;
          width: 5em;
          text-transform: capitalize;
        }
      }
    }
    .order-summary__buttons {
      margin: 1em auto 0;
      display: flex;
      flex-wrap: wrap;
    }
  `}
`;
