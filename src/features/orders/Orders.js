import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

import Order from './Order';

Orders.propTypes = {
  className: PropTypes.string.isRequired,
};

function Orders({ className }) {
  const initialOrders = [
    {
      ingredients: {
        salad: 1,
        bacon: 1,
        cheese: 1,
        beef: 1,
      },
      price: 4.99,
    },
  ];

  const [orders] = useState(initialOrders);
  return (
    <div className={className}>
      <Order ingredients={orders[0].ingredients} price={orders[0].price} />
      <Order ingredients={orders[0].ingredients} price={orders[0].price} />
      <Order ingredients={orders[0].ingredients} price={orders[0].price} />
    </div>
  );
}

export default styled(Orders)`
  ${(props) => css`
    background: var(--cl-accent);
    position: absolute;
    top: var(--h-navbar);
    bottom: 0;
    left: 0;
    right: 0;
    z-index: var(--z-orders);
    padding: 2em 1em;
  `}
`;
