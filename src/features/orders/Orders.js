import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { Redirect } from 'react-router-dom';

import axios from '../../common/axios-orders';
import Order from './Order';
import Spinner from '../../common/ui/Spinner';
import withErrorHandler from '../../common/hoc/withErrorHandler';

Orders.propTypes = {
  className: PropTypes.string.isRequired,
};

function Orders({ className, orders, fetchOrders, idToken, localId }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let cancel;
    (async () => {
      cancel = await fetchOrders(idToken, localId); // call thunked dispatcher with source
      setIsLoading(false); // spinner off when done
    })();
    return () => {
      if (cancel) {
        cancel('request canceled by user(Orders)'); // cleanup: cancel req with specified token on unmount
      }
    };
  }, [fetchOrders, idToken, localId]);
  return (
    <div className={className}>
      {!idToken && <Redirect to="/" />}
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
    min-height: 100vmax;
    z-index: var(--z-orders);
    padding: var(--h-navbar) 1em;
  `}
`;

export default withErrorHandler(StyledOrders, axios);
