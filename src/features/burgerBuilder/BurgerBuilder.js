import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { ingredients } from '../../common/mock';

import Burger from './burger/Burger';
import BuildControls from './burger/BuildControls';

BurgerBuilder.propTypes = {
  className: PropTypes.string.isRequired,
};

const controlItems = ['salad', 'bacon', 'cheese', 'beef'];

function BurgerBuilder({ className }) {
  return (
    <div className={className}>
      <Burger ingredients={ingredients} />
      <BuildControls controlItems={controlItems} />
    </div>
  );
}

export default styled(BurgerBuilder)`
  ${(props) => css`
    width: 100vw;
  `}
`;
