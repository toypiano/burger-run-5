import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

OrderButton.propTypes = {
  className: PropTypes.string.isRequired,
};

function OrderButton({ className, children, clicked, ...props }) {
  return (
    <button className={className} onClick={clicked} {...props}>
      {children}
    </button>
  );
}

export default styled(OrderButton)`
  ${(props) => css`
    padding: 15px 30px;
    margin: 1em auto 0.75em;
    font-size: 1.2rem;
    font-weight: var(--fw-bold);
    color: var(--cl-secondary);
    background-color: var(--cl-accent);
    border-radius: 5px;
    &:not(:disabled):hover,
    &:focus {
      filter: brightness(1.1);
    }
    &:active {
      filter: drop-shadow(0 0 5px rgba(0, 0, 0, 0.2));
    }
    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
    &:not(:disabled) {
      animation: enabled 0.3s ease-in-out;
    }
    @keyframes enabled {
      0% {
        transform: scale(1);
      }
      60% {
        transform: scale(1.1);
      }
      100% {
        transform: scale(1);
      }
    }
  `}
`;
