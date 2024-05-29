import { EditUserInfoModalProps, ModalProps } from '@/lib/types/editUserInfoModalType';
import { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';

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

const EditUserInfoModal = ({ isOpen, onClose, onSave, user }: EditUserInfoModalProps) => {
  const [birthday, setBirthday] = useState(user?.birthday || '');
  const [phoneNumber, setPhoneNumber] = useState(user?.phoneNumber || '');
  const [displayName, setDisplayName] = useState(user?.displayName || '');
  const [email, setEmail] = useState(user?.email || '');

  useEffect(() => {
    if (user) {
      setBirthday(user.birthday || '');
      setPhoneNumber(user.phoneNumber || '');
      setDisplayName(user.displayName || '');
      setEmail(user.email || '');
    }
  }, [user]);

  const handleSave = () => {
    onSave({ birthday, phoneNumber });
    setBirthday('');
    setPhoneNumber('');
    onClose();
  };

  const handleClose = () => {
    setBirthday('');
    setPhoneNumber('');
    onClose();
  };

  return (
    <>
      <ModalBackground isOpen={isOpen} onClick={handleClose} />
      <UserInfoModalBox isOpen={isOpen}>
        <h2>개인정보 수정</h2>
        <label>
          이름:
          <UserInfoInput type="text" value={displayName} disabled />
        </label>
        <label>
          이메일:
          <UserInfoInput type="email" value={email} disabled />
        </label>
        <label>
          생년월일:
          <UserInfoInput type="date" value={birthday} onChange={(e) => setBirthday(e.target.value)} />
        </label>
        <label>
          전화번호:
          <UserInfoInput type="number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
        </label>
        <ModalBtn onClick={handleSave}>저장</ModalBtn>
        <ModalBtn onClick={handleClose}>취소</ModalBtn>
      </UserInfoModalBox>
    </>
  );
};

export default EditUserInfoModal;
