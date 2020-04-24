import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import axios from '../../common/axios-orders';

import Button from '../../common/ui/Button';
import Spinner from '../../common/ui/Spinner';

ContactData.propTypes = {
  className: PropTypes.string.isRequired,
};

function ContactData({ className, ingredients, price, history }) {
  const [isLoading, setIsLoading] = useState(false);
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const order = {
      ingredients,
      price,
      customer: {
        name: 'Elaine',
        address: {
          street: 'Purple creek 777',
          zipCode: '12345',
          country: 'Canada',
        },
        email: 'test@test.com',
      },
      deliveryMethod: 'fastest',
    };
    try {
      const response = await axios.post('/orders.json', order);
      setIsLoading(false);
      console.log(response);
      history.push('/');
    } catch (err) {
      setIsLoading(false);
      console.error(err);
    }
  };

  return (
    <>
      {isLoading ? <Spinner show={isLoading} /> : null}
      <div className={className}>
        <h2>Order Form</h2>
        <form onSubmit={handleFormSubmit}>
          <label htmlFor="name">Name</label>
          <input type="text" id="name" />
          <label htmlFor="email">Email</label>
          <input type="text" id="email" />
          <label htmlFor="street">Street</label>
          <input type="text" id="street" />
          <label htmlFor="zip">Zip code</label>
          <input type="text" id="zip" />
          <Button variant="success">Order</Button>
        </form>
      </div>
    </>
  );
}

export default styled(ContactData)`
  ${(props) => css``}
`;
