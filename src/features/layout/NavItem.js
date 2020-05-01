import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { NavLink } from 'react-router-dom';

import { media } from '../../common/utils/styles-utils';

NavItem.propTypes = {
  className: PropTypes.string.isRequired,
};

function NavItem({ className, linkTo, exact, children }) {
  const ref = useRef();
  useEffect(() => {
    if (ref.current.children[0].classList.contains('active')) {
      ref.current.children[0].focus();
    }
  });
  return (
    <li className={className} ref={ref}>
      <NavLink className="navLink" to={linkTo} exact={exact}>
        {children}
      </NavLink>
    </li>
  );
}

export default styled(NavItem)`
  ${(props) => css`
    &:not(:last-of-type) {
      border-bottom: 3px dashed rgba(0, 0, 0, 0.1);
    }
    flex: 1 1 auto;
    width: 100%;
    display: flex;
    .navLink {
      text-decoration: none;
      color: var(--cl-dark);
      cursor: pointer;
      flex-basis: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      &:hover {
        color: var(--cl-light);
      }
      &:focus,
      &.active {
        color: var(--cl-light);
        background: rgba(0, 0, 0, 0.35);
      }
      &:active {
        background: rgba(0, 0, 0, 0.15);
        color: var(--cl-light);
      }
    }
    ${media.sm`
      border-bottom: none;
      /* 
      parent flex-container has width: auto; which will take the minimum width of the content 
      flex-item's width: 100%; will make the width of itself: min-width; 
      */
      width: auto; 
      .navLink {
       padding: 1em 1em;
       color: var(--cl-accent);
      }
    `}
  `}
`;
