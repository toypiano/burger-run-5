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

const Input = ({ inputType, config, valid, touched, onChange }) => {
  switch (inputType) {
    case 'input':
      return (
        <StyledInput
          as="input"
          {...config}
          valid={valid}
          touched={touched}
          onChange={onChange}
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
      return (
        <StyledInput
          as="input"
          placeholder={config.placeholder}
          type={config.type}
        />
      );
  }
};

function InputGroup({ inputType, config, value, onChange, valid, touched }) {
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
      />
    </StyledInputGroup>
  );
}

export default InputGroup;
