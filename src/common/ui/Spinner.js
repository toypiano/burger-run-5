import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import classes from './Spinner.module.css';

import Backdrop from './Backdrop';

Spinner.propTypes = {
  className: PropTypes.string.isRequired,
};

function Spinner({ className, show }) {
  return (
    <>
      <Backdrop show={true} />
      <div className={`${className} ${classes.loader}`}>Loading...</div>
    </>
  );
}

export default styled(Spinner)`
  ${(props) => css`
    position: fixed;
    z-index: var(--z-spinner);
    top: 50vh;
    left: 50vw;
    transform: translate(-50%, -50%);
  `}
`;
