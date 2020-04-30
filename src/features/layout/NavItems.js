import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { media } from '../../common/utils/styles-utils';

import NavItem from './NavItem';

NavItems.propTypes = {
  className: PropTypes.string.isRequired,
};

function NavItems({ className, isAuthenticated }) {
  return (
    <ul className={className}>
      <NavItem linkTo="/" exact>
        Burger Builder
      </NavItem>
      {isAuthenticated && <NavItem linkTo="/orders">Orders</NavItem>}
      {isAuthenticated ? (
        <NavItem linkTo="/signout">Sign Out</NavItem>
      ) : (
        <NavItem linkTo="/auth">SignUp</NavItem>
      )}
    </ul>
  );
}

export default styled(NavItems)`
  ${(props) => css`
    height: 100%;
    width: 100%;
    /* If desktopOnly = true, display none by default */
    display: ${props.desktopOnly ? 'none' : 'flex'};
    flex-direction: column;
    margin: 0;
    padding: 0;
    align-items: center;
    justify-content: space-around;
    background: var(--cl-accent);
    list-style: none;
    font-size: 1.2rem;
    overflow: hidden;
    /* show when viewport greater than sm */
    ${media.sm`
        display: flex;
        flex-direction: row;
        background: transparent;
        width: auto;    
    `}
  `}
`;
