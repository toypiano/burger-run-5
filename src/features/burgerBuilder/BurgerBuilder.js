import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { ingredients } from '../../common/mock';

import Burger from './burger/Burger';

BurgerBuilder.propTypes = {
  className: PropTypes.string.isRequired,
};

function BurgerBuilder({ className }) {
  return (
    <div className={className}>
      <Burger ingredients={ingredients} />
      <div>Control</div>
    </div>
  );
}

export default styled(BurgerBuilder)`
  ${(props) => css`
    width: 100vw;
  `}
`;
