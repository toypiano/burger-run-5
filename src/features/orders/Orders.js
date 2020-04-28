import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

import Axios from 'axios';
import axios from '../../common/axios-orders';
import Order from './Order';
import Spinner from '../../common/ui/Spinner';
import withErrorHandler from '../../common/hoc/withErrorHandler';

Orders.propTypes = {
  className: PropTypes.string.isRequired,
};

function Orders({ className, orders, fetchOrders, idToken }) {
  console.log('Orders render');
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    console.log('Orders effect');

    const source = Axios.CancelToken.source(); // get req source
    (async () => {
      const thrown = await fetchOrders(source, idToken); // call thunked dispatcher with source
      // stop if request canceled
      if (!Axios.isCancel(thrown)) {
        console.log('Orders - setIsLoading: false');
        setIsLoading(false); // spinner off when done
      }
    })();

    return () => {
      console.log('Orders effect callback');
      source.cancel(); // cleanup: cancel req with specified token on unmount
    };
  }, [fetchOrders, idToken]);
  return (
    <div className={className}>
      {isLoading && <Spinner show={isLoading} />}
      {orders &&
        orders.map((order) => (
          <Order
            key={order.id}
            ingredients={order.ingredients}
            price={order.price}
          />
        ))}
    </div>
  );
}

const StyledOrders = styled(Orders)`
  ${(props) => css`
    background: var(--cl-accent);
    position: relative;
    z-index: var(--z-orders);
    padding: var(--h-navbar) 1em;
  `}
`;

export default withErrorHandler(StyledOrders, axios);
