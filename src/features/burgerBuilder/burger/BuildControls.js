import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import BuildControl from './BuildControl';

BuildControls.propTypes = {
  className: PropTypes.string.isRequired,
  controlItems: PropTypes.arrayOf(PropTypes.string).isRequired,
};

function BuildControls({ className, controlItems }) {
  return (
    <div className={className}>
      {controlItems.map((item) => (
        <BuildControl key={item} label={item} />
      ))}
    </div>
  );
}

export default styled(BuildControls)`
  ${(props) => css`
    background: var(--cl-primary);
    padding: 1em 0;
    display: flex;
    flex-direction: column;
    align-items: center;
  `}
`;
