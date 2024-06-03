import React, { useState, ChangeEvent, FormEvent } from 'react';
import { db } from '@/firebase';
import { ref, set } from 'firebase/database';
import Button from '@/components/Button';
import Input from '@/components/Input';
import Radio from '@/components/Radio';
import RadioGroup from '@/components/RadioGroup';
import Layout from '@/components/layout/Layout';
import styled from 'styled-components';

const ApplyForm: React.FC = () => {
  const [count, setCount] = useState('');
  const [cost, setCost] = useState('');
  const [startDate, setStartDate] = useState('');
  const [trainer, setTrainer] = useState('');

  const handleCountChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newCount = e.target.nextSibling?.textContent || '';
    setCount(newCount);
    setCost((Number(e.target.value) * 50000).toLocaleString() + '원');
  };

  const handleDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    setStartDate(e.target.value);
  };

  const handleTrainerChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTrainer(e.target.nextSibling?.textContent || '');
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!startDate || !trainer || !count) {
      alert('모든 항목을 입력해 주세요.');
      return;
    }

    try {
      await set(ref(db, 'applyForm/' + new Date().getTime()), {
        startDate,
        trainer,
        count,
        cost,
      });
      alert('PT 신청이 완료되었습니다.');
      window.location.reload();
    } catch (error) {
      console.error('Error saving data to Firebase Database:', error);
      alert('신청 중 오류가 발생했습니다. 다시 시도해주세요.');
    }
  };

  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const dd = String(today.getDate()).padStart(2, '0');
  const minDate = `${yyyy}-${mm}-${dd}`;

  return (
    <Layout>
      <TitleLayout>PT 신청</TitleLayout>
      <form onSubmit={handleSubmit}>
        <InputBox>
          <Input type="date" label="PT 시작 날짜" value={startDate} onChange={handleDateChange} min={minDate} />
        </InputBox>
        <RadioGroup label="퍼스널 트레이너">
          <Radio name="trainer" value="trainer1" onChange={handleTrainerChange}>
            박민주 T
          </Radio>
          <Radio name="trainer" value="trainer2" onChange={handleTrainerChange}>
            유현욱 T
          </Radio>
          <Radio name="trainer" value="trainer3" onChange={handleTrainerChange}>
            이동희 T
          </Radio>
          <Radio name="trainer" value="trainer4" onChange={handleTrainerChange}>
            정보현 T
          </Radio>
        </RadioGroup>
        <RadioGroup label="횟수">
          <Radio name="count" value="10" onChange={handleCountChange}>
            10회
          </Radio>
          <Radio name="count" value="15" onChange={handleCountChange}>
            15회
          </Radio>
          <Radio name="count" value="20" onChange={handleCountChange}>
            20회
          </Radio>
          <Radio name="count" value="25" onChange={handleCountChange}>
            25회
          </Radio>
          <Radio name="count" value="30" onChange={handleCountChange}>
            30회
          </Radio>
        </RadioGroup>

        <InputBox>
          <Input type="text" label="비용 (1회 - 5만원)" value={cost} readOnly />
        </InputBox>
        <ApplyBtn type="submit">신청하기</ApplyBtn>
      </form>
    </Layout>
  );
};

const TitleLayout = styled.h2`
  margin-bottom: 4rem;
  font-size: 2.8rem;
  font-weight: 700;
`;

const InputBox = styled.div`
  margin-bottom: 6rem;
`;

const ApplyBtn = styled(Button)`
  margin: 6rem auto 0;
`;

export default ApplyForm;
