import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import Burger from '../burgerBuilder/burger/Burger';
import Button from '../../common/ui/Button';

CheckoutSummary.propTypes = {
  className: PropTypes.string.isRequired,
  cancelCheckout: PropTypes.func.isRequired,
  continueCheckout: PropTypes.func.isRequired,
};

const Wrapper = styled.div`
  margin: 0 auto;
  width: 50vw;
  max-width: 90%;
  height: 40vw;
  max-height: 350px;
`;

function CheckoutSummary({
  className,
  ingredients,
  cancelCheckout,
  continueCheckout,
}) {
  return (
    <div className={className}>
      <h2>
        Your burger is <span>ready for order</span>!
      </h2>
      <Wrapper>
        <Burger ingredients={ingredients} />
      </Wrapper>
      <div className="buttons">
        <Button variant="danger" onClick={cancelCheckout}>
          Cancel
        </Button>
        <Button variant="success" onClick={continueCheckout}>
          Continue
        </Button>
      </div>
    </div>
  );
}

export default styled(CheckoutSummary)`
  ${(props) => css`
    text-align: center;
    padding: 3em 0 1em;
    h2 {
      font-weight: var(--fw-normal);
      opacity: 0.7;
      line-height: 1.6;
      span {
        /* border-bottom: 3px solid var(--cl-secondary); */
        padding-bottom: 2px;
        font-weight: var(--fw-bold);
      }
    }
    .buttons {
      max-width: 400px;
      margin: 0 auto;
      padding: 0 1em;
      display: flex;
      flex-wrap: wrap;
    }
  `}
`;
