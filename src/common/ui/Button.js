import styled, { css } from 'styled-components';

const dangerCss = css`
  background: var(--cl-danger);
  color: var(--cl-light);
`;
const successCss = css`
  background: var(--cl-success);
  color: var(--cl-light);
`;

const getButtonVariant = (variant) => {
  switch (variant) {
    case 'danger':
      return dangerCss;
    case 'success':
      return successCss;
    default:
      return null;
  }
};

export default styled.button`
  display: block;
  text-transform: uppercase;
  padding: 0.5em 1.5em;
  font-weight: var(--fw-bold);
  border-radius: 5px;
  margin: 0.3em;
  flex: 1 1 0;
  ${(props) => getButtonVariant(props.variant)}
  &:hover {
    filter: brightness(1.3);
  }
  &:active {
    position: relative;
    left: 1px;
    top: 1px;
    filter: brightness(0.9);
  }
`;
