import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

Backdrop.propTypes = {
  className: PropTypes.string.isRequired,
  show: PropTypes.bool.isRequired,
  clicked: PropTypes.func,
};

function Backdrop({ className, clicked, show }) {
  return show ? <div className={className} onClick={clicked}></div> : null;
}

export default styled(Backdrop)`
  ${(props) => css`
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: var(--z-backdrop);
    background: rgba(0, 0, 0, 0.5);
  `}
`;
