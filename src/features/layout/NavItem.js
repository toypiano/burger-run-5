import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { media } from '../../common/utils/styles-utils';

NavItem.propTypes = {
  className: PropTypes.string.isRequired,
};

function NavItem({ className, linkTo, children }) {
  return (
    <li className={className}>
      <a href={linkTo}>{children}</a>
    </li>
  );
}

export default styled(NavItem)`
  ${(props) => css`
    border-bottom: 3px dashed rgba(0, 0, 0, 0.1);
    flex: 1 1 auto;
    width: 100%;
    display: flex;
    a {
      cursor: pointer;
      flex-basis: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: background-color 250ms ease;
      &:hover,
      &:focus {
        background: rgba(0, 0, 0, 0.35);
        color: var(--cl-light);
        transition: none;
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
      a {
       padding: 1em 1em;
      }
    `}
  `}
`;
