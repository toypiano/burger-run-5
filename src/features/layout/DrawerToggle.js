import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

DrawerToggle.propTypes = {
  className: PropTypes.string.isRequired,
};

function DrawerToggle({ className, clicked }) {
  return (
    <div className={className} onClick={clicked}>
      <div className="hamburger"></div>
    </div>
  );
}

export default styled(DrawerToggle)`
  ${(props) => css`
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    .hamburger {
      &,
      &::before,
      &::after {
        content: '';
        display: block;
        width: 2.25em;
        height: 3px;
        background: var(--cl-light);
      }
      &::before {
        transform: translateY(-10px);
      }
      &::after {
        transform: translateY(7px);
      }
    }
  `}
`;
