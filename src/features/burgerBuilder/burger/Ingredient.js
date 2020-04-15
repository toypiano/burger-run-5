import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

Ingredient.propTypes = {
  className: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

const breadTop = css`
  position: relative;
  width: 80%;
  height: 20%;
  margin: 1% auto;
  border-radius: 50% 50% 0 0;
  background: linear-gradient(#bc581e, #e27b36);
  box-shadow: inset -15px 0 #c15711;
`;
const breadBottom = css`
  width: 80%;
  height: 13%;
  margin: 1% auto;
  border-radius: 0 0 30px 30px;
  background: linear-gradient(#bc581e, #e27b36);
  box-shadow: inset -15px 0 #c15711;
`;
// seeds are nested inside breadTop

const seed = css`
  position: absolute;
  border-radius: 40%;
  background-color: white;
  box-shadow: inset -2px -3px #c9c9c9;
  width: 10%;
  height: 15%;
`;

const content = css`
  content: '';
  display: block;
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 40%;
  background-color: white;
  box-shadow: inset -1px 2px #c9c9c9;
`;
const seeds1 = css`
  ${seed}
  top: 50%;
  left: 30%;
  transform: rotate(-20deg);
  &::after,
  &::before {
    ${content}
  }
  &::after {
    left: -170%;
    top: -200%;
    transform: rotate(-40deg);
    transform-origin: center center;
  }
  &::before {
    left: 180%;
    top: 90%;
  }
`;
const seeds2 = css`
  ${seed}
  top: 50%;
  left: 64%;
  transform: rotate(10deg);
  &::before {
    ${content}
    left: 150%;
    top: -130%;
    transform: rotate(30deg);
  }
`;
const salad = css`
  width: 85%;
  height: 7%;
  border-radius: 20px;
  background: linear-gradient(#56ab2f, #a8e063);
  margin: 1% auto;
`;
const bacon = css`
  width: 80%;
  height: 3%;
  border-radius: 20px;
  background: linear-gradient(#bf3813, #c45e38);
  margin: 1% auto;
`;
const cheese = css`
  width: 90%;
  height: 5%;
  border-radius: 20px;
  background: linear-gradient(#ffb347, #ffcc33);
  margin: 1% auto;
`;
const beef = css`
  width: 80%;
  height: 8%;
  border-radius: 20px;
  background: linear-gradient(#7f3608, #702e05);
  margin: 1% auto;
`;

// Ingredient also renders nesting components: functions that returns a node in React tree
function Ingredient({ className, children }) {
  return <div className={className}>{children}</div>;
}

export default styled(Ingredient)`
  ${(props) => {
    switch (props.type) {
      case 'bread-top':
        return breadTop;
      case 'seeds1':
        return seeds1;
      case 'seeds2':
        return seeds2;
      case 'salad':
        return salad;
      case 'bacon':
        return bacon;
      case 'cheese':
        return cheese;
      case 'beef':
        return beef;
      case 'bread-bottom':
        return breadBottom;
      default:
        return null;
    }
  }}
`;
