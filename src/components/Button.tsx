import { ButtonHTMLAttributes } from 'react';
import styled from 'styled-components';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  mode?: 'primary' | 'white';
  onClick?: () => void;
}

const Button = ({ mode = 'primary', children, ...props }: Props) => {
  return (
    <ButtonStyled mode={mode} {...props}>
      {children}
    </ButtonStyled>
  );
};

export default Button;

const ButtonStyled = styled.button<{ mode: 'primary' | 'white' }>`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem 3rem;
  border-radius: 6px;
  border: 1px solid var(--color-primary);
  background-color: ${(props) => (props.mode === 'primary' ? 'var(--color-primary)' : 'var(--color-white)')};
  color: ${(props) => (props.mode === 'primary' ? 'var(--color-white)' : 'var(--color-primary)')};
  font-size: 1.6rem;
  font-weight: 500;
  transition: background-color 0.3s, color 0.3s;
  &:hover {
    color: var(--color-white);
    background-color: ${(props) => (props.mode === 'primary' ? 'var(--color-primary-dark)' : 'var(--color-primary)')};
    border-color: ${(props) => (props.mode === 'primary' ? 'var(--color-primary-dark)' : 'var(--color-primary)')};
  }
`;
