import { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import { ref, set, get } from 'firebase/database';
import { db } from '@/firebase';
import Button from './Button';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  // setUserInfoData: React.Dispatch<
  //   React.SetStateAction<{
  //     photoURL: string;
  //     birthday: string;
  //     phoneNumber: string;
  //     email: string;
  //   }>
  // >;
}

const UserInfoModal = ({ isOpen, onClose, setUserInfoData }: ModalProps) => {
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const loadData = async () => {
    const userRef = ref(db, 'users/userId'); // 실제 userId로 대체
    const snapshot = await get(userRef);
    if (snapshot.exists()) {
      const data = snapshot.val();
      setEmail(data.email || '');
      setBirthday(data.birthday || '');
      setPhoneNumber(data.phoneNumber || '');
    }
  };

  const handleSave = async () => {
    const userRef = ref(db, 'users/userId'); // 실제 userId로 대체
    await set(userRef, {
      email,
      birthday,
      phoneNumber,
    });
    setUserInfoData({ email, birthday, phoneNumber });
    onClose();
  };

  useEffect(() => {
    if (isOpen) {
      loadData();
    }
  }, [isOpen]);

  return (
    <>
      {isOpen && <ModalBackground isOpen={isOpen} onClose={onClose} onClick={onClose} />}{' '}
      <UserInfoModalBox isOpen={isOpen} onClose={onClose}>
        <h2>개인정보 수정</h2>
        <label>
          이메일:
          <UserInfoInput type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label>
          생년월일:
          <UserInfoInput type="date" value={birthday} onChange={(e) => setBirthday(e.target.value)} />
        </label>
        <label>
          전화번호:
          <UserInfoInput
            type="tel"
            pattern="[0-9]{11}"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </label>
        <UserInfoModalBtnBox>
          <Button onClick={handleSave}>저장</Button>
          <Button onClick={onClose}>취소</Button>
        </UserInfoModalBtnBox>
      </UserInfoModalBox>
    </>
  );
};

export default UserInfoModal;

const modalStyles = css`
  display: block;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
`;

const modalBackgroundStyles = css`
  display: block;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
`;

const UserInfoModalBox = styled.div<ModalProps>`
  display: none;
  ${({ isOpen }) => isOpen && modalStyles}
`;

const ModalBackground = styled.div<ModalProps>`
  display: none;
  ${({ isOpen }) => isOpen && modalBackgroundStyles}
`;

const UserInfoInput = styled.input`
  width: 100%;
  padding: 0.5rem;
  margin: 0.5rem 0;
  border-radius: 5px;
  border: 1px solid #ccc;
`;

const UserInfoModalBtnBox = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1rem;
  gap: 1rem;
`;

const ModalBtn = styled.button`
  padding: 0.5rem 1rem;
  margin: 0.5rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  background-color: #007bff;
  color: white;

  &:hover {
    background-color: #0056b3;
  }
`;
