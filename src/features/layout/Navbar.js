import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { ReactComponent as Logo } from '../../common/images/a-w.svg';
import DrawerToggle from './DrawerToggle';

Navbar.propTypes = {
  className: PropTypes.string.isRequired,
};

function Navbar({ className }) {
  return (
    <div className={className}>
      <DrawerToggle />
      <Logo className="logo" />
    </div>
  );
}

export default styled(Navbar)`
  ${(props) => css`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: var(--h-navbar);
    padding: 0 1.25em;
    background-color: var(--cl-secondary);
    color: var(--cl-light);
    display: flex;
    justify-content: space-between;
    align-items: center;
    z-index: var(--z-navbar);
    .logo {
      margin: 0;
      width: 5em;
    }
  `}
`;
