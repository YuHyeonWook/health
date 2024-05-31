import Button from '@/components/Button';
import FormInput from '@/components/FormInput';
import FormRadio from '@/components/FormRadio';
import FormRadioGroup from '@/components/FormRadioGroup';
import Layout from '@/components/layout/Layout';
import styled from 'styled-components';

const ApplyForm: React.FC = () => {
  return (
    <Layout>
      <Title>PT 신청</Title>
      <form>
        <FormInput type="date" label="시작 날짜" value="dateStart" />
        <FormRadioGroup label="횟수">
          <FormRadio name="number" value="10" defaultChecked>
            10회
          </FormRadio>
          <FormRadio name="number" value="15">
            15회
          </FormRadio>
          <FormRadio name="number" value="20">
            20회
          </FormRadio>
          <FormRadio name="number" value="25">
            25회
          </FormRadio>
          <FormRadio name="number" value="30">
            30회
          </FormRadio>
        </FormRadioGroup>
        <FormRadioGroup label="퍼스널 트레이너">
          <FormRadio name="trainer" value="trainer1" defaultChecked>
            박민주 T
          </FormRadio>
          <FormRadio name="trainer" value="trainer2">
            유현욱 T
          </FormRadio>
          <FormRadio name="trainer" value="trainer3">
            이동희 T
          </FormRadio>
          <FormRadio name="trainer" value="trainer4">
            정보현 T
          </FormRadio>
        </FormRadioGroup>
        <FormInput type="text" label="비용 (1회 - 5만원)" value="" />
        <ApplyBtn>신청하기</ApplyBtn>
      </form>
    </Layout>
  );
};

const Title = styled.h2`
  margin-bottom: 4rem;
  font-size: 2.8rem;
  font-weight: 700;
`;

const ApplyBtn = styled(Button)`
  margin: 6rem auto 0;
`;

export default ApplyForm;
