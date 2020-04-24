import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import axios from '../../common/axios-orders';

import Button from '../../common/ui/Button';
import Spinner from '../../common/ui/Spinner';
import InputGroup from '../../common/ui/InputGroup';
import useImmer from '../../common/hooks/useImmer';
import initialOrderForm from './initialOrderForm';
import { validateInputValue } from '../../common/validation/inputValidation';

ContactData.propTypes = {
  className: PropTypes.string.isRequired,
};

let counter = 0;

function ContactData({ className, ingredients, price, history }) {
  const [isLoading, setIsLoading] = useState(false);
  const [orderForm, updateOrderForm] = useImmer(initialOrderForm);
  const [isFormValid, setIsFormValid] = useState(false);
  console.log('render', ++counter);
  useEffect(() => {
    console.log('effect', counter);
    const isFormValid = Object.keys(orderForm).reduce(
      (isValid, field) => isValid && orderForm[field].valid,
      true
    );
    console.log('isFormValid:', isFormValid);
    setIsFormValid(isFormValid);
  }, [orderForm]); // will run whenever orderForm is updated.

  // post order information
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
    console.log('change', counter);
    const isValid = validateInputValue(value, orderForm[inputField].validation);
    updateOrderForm((draft) => {
      draft[inputField].value = value;
      draft[inputField].touched = true;
      draft[inputField].valid = isValid;
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
      touched={o.touched}
      valid={o.valid}
    />
  ));
  console.log('function end');
  return (
    <>
      {isLoading ? <Spinner show={isLoading} /> : null}
      <div className={className}>
        <h2>Order Form</h2>
        <form onSubmit={handleFormSubmit}>
          {inputs}
          <Button
            className="order-form__button"
            variant="success"
            disabled={!isFormValid}
          >
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
