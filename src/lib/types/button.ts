import { ButtonHTMLAttributes } from 'react';

// 새로운 variant 타입 추가하고 싶다면 ButtonVaraint에 추가
export type ButtonVaraint = 'primary' | 'white' | 'secondary';

export type ButtonProps = Pick<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'onClick' | 'disabled' | 'type' | 'className' | 'style'
> & {
  variant?: ButtonVaraint;
  children: React.ReactNode;
};

export type ButtonStyledProps = {
  variant: ButtonVaraint;
};
