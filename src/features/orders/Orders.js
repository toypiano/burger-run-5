import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

import axios from '../../common/axios-orders';
import Order from './Order';
import Spinner from '../../common/ui/Spinner';

Orders.propTypes = {
  className: PropTypes.string.isRequired,
};

/* 
{
    "-M5dtbghMiWIj2hKBa5c": { // cspell: disable-line
        "customer": {
            "address": {
                "country": "Canada",
                "street": "Purple creek 777",
                "zipCode": "12345"
            },
            "email": "test@test.com",
            "name": "Elaine"
        },
        "deliveryMethod": "fastest",
        "ingredients": {
            "bacon": 1,
            "beef": 1,
            "cheese": 1,
            "salad": 1
        },
        "price": 4.99
    }
}
*/

/**
 * @returns {Array} [orders, isLoading]
 */
function useOrders() {
  const [orders, setOrders] = useState(null);
  // Fetch orders as soon as we nav to this page
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    axios
      .get('/orders.json')
      .then((res) => {
        const orders = Object.entries(res.data).map(([id, order]) => ({
          id,
          ...order,
        }));
        setOrders(orders);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        console.error(err);
      });
  }, []);
  return [orders, isLoading];
}

function Orders({ className }) {
  // const initialOrders = [
  //   {
  //     ingredients: {
  //       salad: 1,
  //       bacon: 1,
  //       cheese: 1,
  //       beef: 1,
  //     },
  //     price: 4.99,
  //   },
  // ];
  const [orders, isLoading] = useOrders();

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
