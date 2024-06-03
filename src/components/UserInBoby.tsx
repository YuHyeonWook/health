import { useState, useEffect } from 'react';
import { ref, get } from 'firebase/database';
import { auth, db } from '@/firebase';
import UserInBodyModal from '@/components/UserInBobyModal';
import {
  BtnBox,
  UserInformationBox,
  UserInformationContainer,
  UserInformationH2,
  UserInformationSpan,
} from '@/styles/userInformation';
import Button from './Button';
import { UserInBodyData } from '@/lib/types/userInformation';

const UserInBody = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [userBodyData, setUserBodyData] = useState<UserInBodyData>({
    muscleMass: '',
    bmi: '',
    height: '',
    weight: '',
  });

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const loadData = async () => {
    const userId = auth.currentUser?.uid;
    const userRef = ref(db, `users/${userId}/body`);
    const snapshot = await get(userRef);
    if (snapshot.exists()) {
      const data = snapshot.val();
      setUserBodyData({
        muscleMass: data.muscleMass || '',
        bmi: data.bmi || '',
        height: data.height || '',
        weight: data.weight || '',
      });
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <>
      <UserInformationContainer>
        <main>
          <UserInformationH2>신체 정보</UserInformationH2>
          <UserInformationBox>
            <p>
              키 (cm)<UserInformationSpan>{userBodyData.height}</UserInformationSpan>
            </p>
            <p>
              체중 (kg)
              <UserInformationSpan>{userBodyData.weight}</UserInformationSpan>
            </p>
            <p>
              BMI (kg/㎡)
              <UserInformationSpan>{userBodyData.bmi}</UserInformationSpan>
            </p>
            <p>
              근육량 (kg)
              <UserInformationSpan>{userBodyData.muscleMass}</UserInformationSpan>
            </p>
          </UserInformationBox>
        </main>
        <BtnBox>
          <Button onClick={openModal}>등록</Button>
        </BtnBox>
      </UserInformationContainer>
      <UserInBodyModal isOpen={isModalOpen} onClose={closeModal} setUserBodyData={setUserBodyData} />
    </>
  );
};

export default UserInBody;
