import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

Order.propTypes = {
  className: PropTypes.string.isRequired,
};

function Order({ className, ingredients, price }) {
  const ingredientSpans = Object.entries(ingredients).map(([ing, qty]) => (
    <span key={ing}>
      {ing}({qty})
    </span>
  ));
  return (
    <div className={className}>
      Ingredients:
      <p className="order__ingredients">{ingredientSpans}</p>
      <p className="order__price">
        Price: <span>${price.toFixed(2)}</span>
      </p>
    </div>
  );
}

export default styled(Order)`
  ${(props) => css`
    margin: 1em auto;
    padding: 2em;
    background: var(--cl-light);
    border-radius: 8px;
    max-width: var(--mw-modal);
    font-weight: var(--fw-bold);
    text-transform: uppercase;
    .order__ingredients {
      display: flex;
      flex-wrap: wrap;
      margin-top: 0.5em;
      span {
        text-transform: capitalize;
        opacity: 0.9;
        margin: 0 0.5em 0.5em 0;
        border: 1px solid var(--cl-gray);
        border-radius: 100vmax;
        padding: 0 0.5em;
        font-size: 0.9em;
        line-height: 1.5;
        font-weight: var(--fw-normal);
      }
    }
    .order__price {
      span {
        font-weight: var(--fw-normal);
      }
    }
  `}
`;
