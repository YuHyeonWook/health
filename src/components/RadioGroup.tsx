import styled from 'styled-components';
import { RadioGroupProps } from '@/lib/types/radio';

const RadioGroup = ({ label, children }: RadioGroupProps) => {
  return (
    <FieldsetLayout>
      <LegendLayout>{label}</LegendLayout>
      {children}
    </FieldsetLayout>
  );
};

const FieldsetLayout = styled.fieldset`
  border: none;
  margin-bottom: 6rem;
`;

const LegendLayout = styled.legend`
  display: block;
  font-size: 1.6rem;
  font-weight: 500;
  margin-bottom: 1.2rem;
`;

export default RadioGroup;
