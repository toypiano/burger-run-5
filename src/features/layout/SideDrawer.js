import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { media } from '../../common/utils/styles-utils';
import Backdrop from '../../common/ui/Backdrop';
import NavItems from './NavItems';

SideDrawer.propTypes = {
  className: PropTypes.string.isRequired,
};

function SideDrawer({ className, isOpen, closeSideDrawer, isAuthenticated }) {
  return (
    <>
      <Backdrop show={isOpen} clicked={closeSideDrawer} />
      <div className={className} onClick={closeSideDrawer}>
        <NavItems isAuthenticated={isAuthenticated} />
      </div>
    </>
  );
}

export default styled(SideDrawer)`
  ${(props) => css`
    position: fixed;
    top: 0;
    left: 0;
    width: 80%;
    height: 100%;
    background: var(--cl-light);
    z-index: var(--z-side-drawer);
    transform: ${(props) =>
      props.isOpen ? 'translateX(0)' : 'translateX(-100%)'};
    transition: transform 250ms ease-in-out;
    ${media.sm`
        display: none; 
    `}
  `}
`;
