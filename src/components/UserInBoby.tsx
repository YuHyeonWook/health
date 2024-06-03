import { useState, useEffect } from 'react';
import { ref, get } from 'firebase/database';
import styled from 'styled-components';
import { auth, db } from '@/firebase';
import UserInBodyModal from '@/components/UserInBobyModal';

const UserInBody = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [userBodyData, setUserBodyData] = useState({
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
      <UserBodyBox>
        <h2>신체 정보</h2>
        <p>근육량: {userBodyData.muscleMass}</p>
        <p>BMI: {userBodyData.bmi}</p>
        <p>키: {userBodyData.height}</p>
        <p>체중: {userBodyData.weight}</p>
      </UserBodyBox>
      <button onClick={openModal}>수정</button>
      <UserInBodyModal isOpen={isModalOpen} onClose={closeModal} setUserBodyData={setUserBodyData} />
    </>
  );
};

export default UserInBody;

const UserBodyBox = styled.div`
  margin-top: 10rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
