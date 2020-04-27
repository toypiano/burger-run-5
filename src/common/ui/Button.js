import styled, { css } from 'styled-components';

const dangerCss = css`
  background: var(--cl-danger);
  color: var(--cl-light);
  border: 2px solid var(--cl-danger);
`;
const successCss = css`
  background: var(--cl-success);
  color: var(--cl-light);
  border: 2px solid var(--cl-success);
`;

const outlineSuccessCss = css`
  background: transparent;
  color: var(--cl-success);
  border: 2px solid var(--cl-success);
  transition: all 200ms ease;
  &:hover {
    color: var(--cl-light);
    background: var(--cl-success);
  }
`;

const getButtonVariant = (variant) => {
  switch (variant) {
    case 'danger':
      return dangerCss;
    case 'success':
      return successCss;
    case 'outline-success':
      return outlineSuccessCss;
    default:
      return null;
  }
};

export default styled.button`
  display: block;
  text-transform: uppercase;
  padding: 0.75em 1.5em;
  font-weight: var(--fw-bold);
  border-radius: 5px;
  margin: 0.3em;
  flex: 1 1 0;
  ${(props) => getButtonVariant(props.variant)}
  &:hover {
    filter: brightness(1.3);
  }
  &:active {
    filter: brightness(0.9);
  }
  &:disabled {
    opacity: 0.5;
  }

  &:disabled:hover {
    filter: none;
    cursor: not-allowed;
  }
`;
