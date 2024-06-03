import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { ref, set, get } from 'firebase/database';
import { auth, db } from '@/firebase';
import { userInBodyModalProps } from '@/lib/types/userInformation';
import Button from '@/components/Button';
import { UserModalBtnBoxProps } from '@/lib/types/userInformation';

const UserInBodyModal = ({ isOpen, onClose, setUserBodyData }: userInBodyModalProps) => {
  const [muscleMass, setMuscleMass] = useState('');
  const [bmi, setBmi] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');

  const loadData = async () => {
    const userId = auth.currentUser?.uid;
    const userRef = ref(db, `users/${userId}/body`);
    const snapshot = await get(userRef);

    if (snapshot.exists()) {
      const data = snapshot.val();
      setMuscleMass(data.muscleMass || '');
      setBmi(data.bmi || '');
      setHeight(data.height || '');
      setWeight(data.weight || '');
    }
  };

  const handleSave = async () => {
    const userId = auth.currentUser?.uid;
    const userRef = ref(db, `users/${userId}/body`);
    await set(userRef, {
      muscleMass,
      bmi,
      height,
      weight,
    });

    setUserBodyData({ muscleMass, bmi, height, weight });
    onClose();
  };

  useEffect(() => {
    if (isOpen) {
      loadData();
    }
  }, [isOpen]);

  return (
    <>
      {isOpen && <ModalBackground isOpen={isOpen} onClose={onClose} onClick={onClose} />}
      <UserInBodyModalBox isOpen={isOpen} onClose={onClose}>
        <h2>신체 정보 수정</h2>
        <label>
          근육량:
          <UserInBodyInput type="text" value={muscleMass} onChange={(e) => setMuscleMass(e.target.value)} />
        </label>
        <label>
          BMI:
          <UserInBodyInput type="text" value={bmi} onChange={(e) => setBmi(e.target.value)} />
        </label>
        <label>
          키:
          <UserInBodyInput type="text" value={height} onChange={(e) => setHeight(e.target.value)} />
        </label>
        <label>
          체중:
          <UserInBodyInput type="text" value={weight} onChange={(e) => setWeight(e.target.value)} />
        </label>
        <UserInBodyModalBtnBox>
          <Button onClick={handleSave}>저장</Button>
          <Button onClick={onClose}>취소</Button>
        </UserInBodyModalBtnBox>
      </UserInBodyModalBox>
    </>
  );
};

export default UserInBodyModal;

const UserInBodyModalBox = styled.div<UserModalBtnBoxProps>`
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
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

const ModalBackground = styled.div<UserModalBtnBoxProps>`
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
`;

const UserInBodyInput = styled.input`
  width: 100%;
  padding: 0.5rem;
  margin: 0.5rem 0;
  border-radius: 5px;
  border: 1px solid #ccc;
`;

const UserInBodyModalBtnBox = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1rem;
  gap: 1rem;
`;
