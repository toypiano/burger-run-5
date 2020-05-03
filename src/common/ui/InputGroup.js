import React from 'react';
import styled, { css } from 'styled-components';

const StyledInputGroup = styled.div`
  margin-bottom: 1em;
  & label {
    display: block;
    margin-bottom: 0.3em;
    opacity: 0.9;
  }
`;
const StyledInput = styled.div`
  display: block;
  font: inherit;
  font-size: 1.2rem;
  border: 1px solid var(--cl-gray);
  ${(props) =>
    !props.valid && props.touched
      ? css`
          border: 2px solid red;
          background: rgba(255, 230, 230, 0.8);
        `
      : null}
  border-radius: 8px;
  padding: 0.5em 1em;
  width: 100%;
`;

const Input = ({
  inputType,
  config,
  valid,
  touched,
  onChange,
  focused,
  autoFocus,
  value,
}) => {
  switch (inputType) {
    case 'input':
      return (
        <StyledInput
          as="input"
          {...config}
          value={value}
          valid={valid}
          touched={touched}
          onChange={onChange}
          onFocus={focused}
          autoFocus={autoFocus}
        />
      );
    case 'textarea':
      return (
        <StyledInput
          as="textarea"
          {...config}
          valid={valid}
          touched={touched}
          onChange={onChange}
          autoFocus={autoFocus}
          value={value}
        />
      );
    case 'select':
      return (
        <StyledInput
          as="select"
          defaultValue=""
          valid={valid}
          touched={touched}
          onChange={onChange}
          autoFocus={autoFocus}
          value={value}
        >
          {config.options.map((option) =>
            option.value ? (
              <option key={option.displayValue} value={option.value}>
                {option.displayValue}
              </option>
            ) : (
              <option key="placeholder" value="" disabled>
                {option.displayValue}
              </option>
            )
          )}
        </StyledInput>
      );
    default:
      throw new Error('unknown inputType');
  }
};

function InputGroup({
  inputType,
  config,
  value,
  onChange,
  valid,
  touched,
  focused,
  autoFocus,
}) {
  return (
    <StyledInputGroup>
      <label>{config.label}</label>
      <Input
        value={value}
        onChange={onChange}
        config={config}
        inputType={inputType}
        valid={valid}
        touched={touched}
        focused={focused}
        autoFocus={autoFocus}
      />
    </StyledInputGroup>
  );
}

export default InputGroup;
