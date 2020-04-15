import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

BuildControl.propTypes = {
  className: PropTypes.string.isRequired,
};

const moreButton = css`
  background-color: var(--cl-secondary);
`;
const lessButton = css`
  background-color: var(--cl-primary);
`;

const StyledButton = styled.button`
  font: inherit; /* button normalizer */
  cursor: pointer;
  width: 5em;
  padding: 0.5em;
  margin: 0 0.25em;
  border: none;
  color: var(--cl-light);
  border: 2px solid var(--cl-secondary);
  border-radius: 5px;
  font-weight: var(--fw-bold);
  ${(props) =>
    props.type === 'more'
      ? moreButton
      : props.type === 'less'
      ? lessButton
      : null}
  &:hover, &:focus {
    filter: brightness(0.9);
  }
  &:active {
    filter: brightness(1.1);
  }
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

function BuildControl({ className, label, add, remove, disabled }) {
  return (
    <div className={className}>
      <label>{label}</label>
      <StyledButton type="less" onClick={remove} disabled={disabled}>
        Less
      </StyledButton>
      <StyledButton type="more" onClick={add}>
        More
      </StyledButton>
    </div>
  );
}

export default styled(BuildControl)`
  ${(props) => css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0.3em;
    label {
      text-transform: uppercase;
      font-weight: var(--fw-bold);
      /* without fixed-width, texts will be center-aligned
      (due to flex container & align-items: center)*/
      width: 5em;
    }
  `}
`;
