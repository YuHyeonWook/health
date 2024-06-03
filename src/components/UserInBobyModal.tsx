import { useState, useEffect } from 'react';
import { ref, set, get } from 'firebase/database';
import { auth, db } from '@/firebase';
import { userInBodyModalProps } from '@/lib/types/userInformation';
import Button from '@/components/Button';
import FormInput from '@/components/FormInput';
import {
  LabelBox,
  ModalBackgroundBox,
  UserInformationModalBox,
  UserInformationModalBtnBox,
  UserModalInformationH2,
} from '@/styles/userInformation';

const UserInBodyModal = ({ isOpen, onClose, setUserBodyData }: userInBodyModalProps) => {
  const [muscleMass, setMuscleMass] = useState<string>('');
  const [bmi, setBmi] = useState<string>('');
  const [height, setHeight] = useState<string>('');
  const [weight, setWeight] = useState<string>('');

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
      {isOpen && <ModalBackgroundBox isOpen={isOpen} onClose={onClose} onClick={onClose} />}
      <UserInformationModalBox isOpen={isOpen} onClose={onClose}>
        <UserModalInformationH2>신체정보 수정</UserModalInformationH2>
        <LabelBox>
          <label>
            근육량:
            <FormInput type="text" value={muscleMass} onChange={(e) => setMuscleMass(e.target.value)} />
          </label>
          <label>
            BMI:
            <FormInput type="text" value={bmi} onChange={(e) => setBmi(e.target.value)} />
          </label>
          <label>
            키:
            <FormInput type="text" value={height} onChange={(e) => setHeight(e.target.value)} />
          </label>
          <label>
            체중:
            <FormInput type="text" value={weight} onChange={(e) => setWeight(e.target.value)} />
          </label>
        </LabelBox>
        <UserInformationModalBtnBox>
          <Button onClick={handleSave}>저장</Button>
          <Button onClick={onClose}>취소</Button>
        </UserInformationModalBtnBox>
      </UserInformationModalBox>
    </>
  );
};

export default UserInBodyModal;
