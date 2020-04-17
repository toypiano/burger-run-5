import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import Backdrop from './Backdrop';
import { shadow } from '../css';

Modal.propTypes = {
  className: PropTypes.string.isRequired,
  show: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
};

function Modal({ className, show, closeModal, children }) {
  return (
    <div className={className}>
      <Backdrop show={show} clicked={closeModal} />
      <section>{children}</section>
    </div>
  );
}

const slideInOut = (props) =>
  props.show ? 'translateY(0)' : 'translateY(-100vh)';

export default styled(Modal)`
  ${(props) => css`
    section {
      position: fixed;
      width: 80%;
      max-width: 500px;
      min-height: 10em;
      border-radius: 0.5em;
      top: 30%;
      left: 50%;
      transform: translateX(-50%) ${slideInOut};
      transition: transform 0.3s ease-in-out;
      background: var(--cl-light);
      z-index: var(--z-modal);
      padding: 3em 1em 2em;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      ${shadow}
    }
  `}
`;
