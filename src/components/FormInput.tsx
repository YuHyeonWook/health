import { ChangeEvent, FC } from 'react';
import styled from 'styled-components';

interface InputProps {
  type: 'text' | 'number' | 'email' | 'password' | 'date';
  value: string | number;
  label?: string;
  name?: string;
  placeholder?: string;
  error?: boolean;
  errorMessage?: string;
  disabled?: boolean;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}

const FormInput: FC<InputProps> = ({
  type,
  label,
  value,
  name,
  placeholder,
  error,
  disabled,
  errorMessage,
  onChange,
  required,
}) => {
  return (
    <>
      <LabelStyled htmlFor={name}>{label}</LabelStyled>
      <InputStyled
        type={type}
        id={name}
        value={value}
        name={name}
        placeholder={placeholder}
        onChange={onChange}
        disabled={disabled}
        required={required}
      />
      {error && <ErrorText>{errorMessage}</ErrorText>}
    </>
  );
};

const LabelStyled = styled.label`
  display: block;
  margin-bottom: 1rem;
  font-weight: 500;
`;

const InputStyled = styled.input`
  display: block;
  width: 100%;
  height: 5rem;
  padding: 0 1.5rem;
  color: var(--color-black);
  border-radius: 6px;
  border: var(--border-gray);
  background-color: var(--color-white);

  &::placeholder {
    color: var(--color-gray-light);
  }

  &:focus {
    border: var(--border-primary);
  }
`;

const ErrorText = styled.p`
  .ErrorText {
    color: var(--chip-red);
    font-size: 1.4rem;
    margin-top: 0.06rem;
    margin-left: 1rem;
  }
`;

export default FormInput;
