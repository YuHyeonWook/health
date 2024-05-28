import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';

const ModalWrap = styled.div`
  position: fixed;
  inset: 0px;
  display: flex;
  justify-content: center;
  z-index: 1200;
`;
const ModalUI = styled.div`
  width: 340px;
  background-color: #585757;
  overflow: hidden;
  border-radius: 10px;
  margin-top: 180px;
  margin-bottom: 180px;
`;
const Modalbutton = styled.div`
  display: flex;
  justify-content: space-between;
`;
const Xbutton = styled.button`
  height: 32px;
  margin: 32px 0 0 20px;
  padding: 0px 13px;
  z-index: 1000;
  cursor: pointer;
  border: none;
  border-radius: 8px;
  background-color: #eeeeee;
`;
const Createbutton = styled.button`
  height: 32px;
  margin: 32px 20px 0 0;
  padding: 0px 13px;
  z-index: 1000;
  cursor: pointer;
  border: none;
  border-radius: 8px;
  background-color: #eeeeee;
`;
const ModalName = styled.div`
  margin-top: 40px;
  color: #fff;
  font-size: 20px;
  text-align: center;
`;
const InputUI = styled.div`
  height: 400px;
`;
const FirstInput = styled.input`
  height: 34px;
  margin: 40px 0 0 23px;
  padding-left: 13px;
  width: 295px;
  border: none;
  border-radius: 8px;
`;
const SecondInput = styled.input`
  height: 34px;
  margin: 12px 0 0 23px;
  padding-left: 13px;
  width: 295px;
  border: none;
  border-radius: 8px;
`;
const Whitebox = styled.div`
  position: relative;
  width: 295px;
  height: 110px;
  margin: 30px 0 0 23px;
  border-radius: 8px;
  background-color: #fff;
`;
const StartInput = styled.input`
  height: 32px;
  margin: 18px 0 0 17px;
  padding-left: 13px;
  width: 260px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
`;
const StartDateButton = styled.button`
  position: absolute;
  top: 23px;
  right: 23px;
  height: 22px;
  width: 90px;
  border: none;
  border-radius: 8px;
`;
const EndInput = styled.input`
  height: 32px;
  margin: 9px 0 0 17px;
  padding-left: 13px;
  width: 260px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
`;
const EndDateButton = styled.button`
  position: absolute;
  top: 64px;
  right: 23px;
  height: 22px;
  width: 90px;
  border: none;
  border-radius: 8px;
`;
const MemoInput = styled.textarea`
  width: 295px;
  max-width: 295px;
  max-height: 188px;
  margin: 30px 0 0 23px;
  padding: 13px 0 150px 13px;
  border-radius: 8px;
  background-color: #fff;
  scrollbar-width: none;
`;

interface ModalType {
  setModalOpen: (open: boolean) => void;
  startDate: Date;
}

const Modal: React.FC<ModalType> = ({ setModalOpen, startDate }) => {
  const Today = startDate.toLocaleDateString();
  const tomorrow = new Date(startDate);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const Tomorrow = tomorrow.toLocaleDateString();

  const modalRef = useRef<HTMLDivElement>(null);

  const useOnClickOutside = (event: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      setModalOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', useOnClickOutside);
    return () => {
      document.removeEventListener('mousedown', useOnClickOutside);
    };
  });

  return (
    <ModalWrap>
      <ModalUI ref={modalRef}>
        <Modalbutton>
          <Xbutton onClick={() => setModalOpen(false)}>취소</Xbutton>
          <ModalName>일정 추가</ModalName>
          <Createbutton>추가</Createbutton>
        </Modalbutton>
        <InputUI>
          <FirstInput placeholder="운동" />
          <SecondInput placeholder="운동 시간 / 횟수" />
          <Whitebox>
            <StartInput placeholder="시작"></StartInput>
            <StartDateButton>{Today}</StartDateButton>
            <EndInput placeholder="종료" />
            <EndDateButton>{Tomorrow}</EndDateButton>
          </Whitebox>
          <MemoInput placeholder="메모" />
        </InputUI>
      </ModalUI>
    </ModalWrap>
  );
};

export default Modal;
