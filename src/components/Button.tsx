import styled from 'styled-components';
import { ButtonProps, ButtonStyledProps } from '@/lib/types/button';

const Button = ({ variant = 'primary', children, ...props }: ButtonProps) => {
  return (
    <ButtonStyled variant={variant} {...props}>
      {children}
    </ButtonStyled>
  );
};

const ButtonStyled = styled.button<ButtonStyledProps>`
  display: flex;
  justify-content: center;
  align-items: center;

  padding: 1rem 3rem;

  border: 0.1rem solid var(--color-primary);
  border-radius: 0.6rem;
  background-color: ${(props) => {
    switch (props.variant) {
      case 'primary':
        return 'var(--color-primary)';
      case 'white':
        return 'var(--color-white)';
      case 'secondary':
        return 'var(--color-secondary)';
      default:
        return 'var(--color-primary)';
    }
  }};
  color: ${(props) => {
    switch (props.variant) {
      case 'primary':
      case 'secondary':
        return 'var(--color-white)';
      case 'white':
        return 'var(--color-primary)';
      default:
        return 'var(--color-white)';
    }
  }};

  font-size: 1.6rem;
  font-weight: 600;
  transition:
    background-color 0.2s,
    color 0.2s;
  &:hover {
    color: var(--color-white);
    background-color: ${(props) => {
      switch (props.variant) {
        case 'primary':
          return 'var(--color-primary-dark)';
        case 'white':
          return 'var(--color-primary)';
        case 'secondary':
          return 'var(--color-secondary-dark)';
        default:
          return 'var(--color-primary-dark)';
      }
    }};
    border-color: ${(props) => {
      switch (props.variant) {
        case 'primary':
          return 'var(--color-primary-dark)';
        case 'white':
          return 'var(--color-primary)';
        case 'secondary':
          return 'var(--color-secondary-dark)';
        default:
          return 'var(--color-primary-dark)';
      }
    }};
  }
`;

export default Button;
