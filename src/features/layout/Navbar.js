import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { media } from '../../common/utils/styles-utils';

import { ReactComponent as Logo } from '../../common/images/a-w.svg';
import DrawerToggle from './DrawerToggle';
import NavItems from './NavItems';

Navbar.propTypes = {
  className: PropTypes.string.isRequired,
};

function Navbar({ className, openSideDrawer, isAuthenticated }) {
  return (
    <div className={className}>
      <DrawerToggle clicked={openSideDrawer} />
      <Logo className="logo" />
      <NavItems isAuthenticated={isAuthenticated} desktopOnly />
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
    ${media.xl`
      justify-content: space-around;
    `}
    align-items: center;
    z-index: var(--z-navbar);
    .logo {
      margin: 0;
      width: 5em;
    }
  `}
`;
