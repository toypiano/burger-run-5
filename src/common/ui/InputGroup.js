import React from 'react';
import styled from 'styled-components';

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
  border: ${(props) =>
    !props.valid && props.touched
      ? '2px solid red'
      : '1px solid var(--cl-gray)'};

  border-radius: 8px;
  padding: 0.5em 1em;
  width: 100%;
`;

const Input = ({ inputType, config, valid, touched, onChange, focused }) => {
  switch (inputType) {
    case 'input':
      return (
        <StyledInput
          as="input"
          {...config}
          valid={valid}
          touched={touched}
          onChange={onChange}
          onFocus={focused}
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
      />
    </StyledInputGroup>
  );
}

export default InputGroup;
