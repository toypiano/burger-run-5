import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import axios from '../../common/axios-orders';

import Button from '../../common/ui/Button';
import Spinner from '../../common/ui/Spinner';
import InputGroup from '../../common/ui/InputGroup';
import useImmer from '../../common/hooks/useImmer';
import initialOrderForm from './initialOrderForm';

ContactData.propTypes = {
  className: PropTypes.string.isRequired,
};

function ContactData({ className, ingredients, price, history }) {
  const [isLoading, setIsLoading] = useState(false);
  const [orderForm, updateOrderForm] = useImmer(initialOrderForm);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const order = {
      ingredients,
      price,
      customer: { ...orderForm.customer },
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

  const handleInputChange = (value, inputField) => {
    updateOrderForm((draft) => {
      draft[inputField].value = value;
    });
  };

  const inputObjects = Object.keys(orderForm).map((inputField) => ({
    inputField,
    ...orderForm[inputField],
  }));

  const inputs = inputObjects.map((o) => (
    <InputGroup
      key={o.inputField}
      inputType={o.inputType}
      config={o.config}
      value={o.value}
      onChange={(e) => handleInputChange(e.target.value, o.inputField)}
    />
  ));

  return (
    <>
      {isLoading ? <Spinner show={isLoading} /> : null}
      <div className={className}>
        <h2>Order Form</h2>
        <form onSubmit={handleFormSubmit}>
          {inputs}
          <Button className="order-form__button" variant="success">
            Order
          </Button>
        </form>
      </div>
    </>
  );
}

export default styled(ContactData)`
  ${(props) => css`
    width: 80%;
    margin: 0 auto;
    h2 {
      text-align: center;
    }
    .order-form__button {
      margin-bottom: 2em;
    }
  `}
`;
