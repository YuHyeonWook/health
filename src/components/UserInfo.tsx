import React, { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { userNameState } from '@/lib/store/userNameState';
import UserInfoModal from './UserInfoModal';
import { ref, get } from 'firebase/database';
import { db } from '@/firebase';

const UserInfo = () => {
  const userName = useRecoilValue(userNameState);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [userInfoData, setUserInfoData] = useState({
    photoURL: '',
    birthday: '',
    phoneNumber: '',
    email: '',
  });

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const loadData = async () => {
    const userRef = ref(db, 'users/userId'); // 실제 userId로 대체
    const snapshot = await get(userRef);
    if (snapshot.exists()) {
      const data = snapshot.val();
      setUserInfoData({
        photoURL: data.photoURL || '',
        birthday: data.birthday || '',
        phoneNumber: data.phoneNumber || '',
        email: data.email || '',
      });
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <>
      <UserInfoBox>
        {userName && <p>이름: {userName}!</p>}
        <p>Email: {userInfoData.email}</p>
        <p>Birthday: {userInfoData.birthday}</p>
        <p>Phone Number: {userInfoData.phoneNumber}</p>
      </UserInfoBox>
      <button onClick={openModal}>수정</button>
      <UserInfoModal isOpen={isModalOpen} onClose={closeModal} setUserInfoData={setUserInfoData} />
    </>
  );
};

export default UserInfo;

const UserInfoBox = styled.div`
  margin-top: 10rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
