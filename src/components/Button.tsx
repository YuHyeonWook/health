import styled from 'styled-components';
import { ButtonProps } from '@/lib/types/button';

const Button = ({ variant = 'primary', children, ...props }: ButtonProps) => {
  return (
    <ButtonStyled variant={variant} {...props}>
      {children}
    </ButtonStyled>
  );
};

const ButtonStyled = styled.button<{ variant: 'primary' | 'white' }>`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem 3rem;
  border-radius: 0.6rem;
  border: 0.1rem solid var(--color-primary);
  background-color: ${(props) => (props.variant === 'primary' ? 'var(--color-primary)' : 'var(--color-white)')};
  color: ${(props) => (props.variant === 'primary' ? 'var(--color-white)' : 'var(--color-primary)')};
  font-size: 1.6rem;
  font-weight: 600;
  transition:
    background-color 0.2s,
    color 0.2s;
  &:hover {
    color: var(--color-white);
    background-color: ${(props) =>
      props.variant === 'primary' ? 'var(--color-primary-dark)' : 'var(--color-primary)'};
    border-color: ${(props) => (props.variant === 'primary' ? 'var(--color-primary-dark)' : 'var(--color-primary)')};
  }
`;

export default Button;
