import { useEffect, useState } from 'react';
import styled from 'styled-components';
import UserInfoModal from './UserInfoModal';
import { ref, get } from 'firebase/database';
import { auth, db } from '@/firebase';
import Button from './Button';

const UserInfo = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [userInfoData, setUserInfoData] = useState({
    photoURL: '',
    birthday: '',
    phoneNumber: '',
    email: '',
    userName: '',
  });

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const loadData = async () => {
    const userId = auth.currentUser?.uid;
    const userRef = ref(db, `users/${userId}`);
    const snapshot = await get(userRef);
    if (snapshot.exists()) {
      const data = snapshot.val();
      setUserInfoData({
        photoURL: data.photoURL || '',
        birthday: data.birthday || '',
        phoneNumber: data.phoneNumber || '',
        email: data.email || '',
        userName: data.userName || '',
      });
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <>
      <UserInfoContainer>
        <main>
          <PrivateH2>개인정보</PrivateH2>
          <ProfileBox>
            {userInfoData.photoURL && <ProfileImage src={userInfoData.photoURL} alt="프로필 이미지" />}
          </ProfileBox>
          <UserInfoBox>
            <UserInfoSpan>닉네임: {userInfoData.userName}</UserInfoSpan>
            <UserInfoSpan>이메일: {userInfoData.email}</UserInfoSpan>
            <UserInfoSpan>생년월일: {userInfoData.birthday}</UserInfoSpan>
            <UserInfoSpan>핸드폰 번호: {userInfoData.phoneNumber}</UserInfoSpan>
          </UserInfoBox>
        </main>
        <BtnBox>
          <Button onClick={openModal}>수정</Button>
        </BtnBox>
      </UserInfoContainer>
      <UserInfoModal isOpen={isModalOpen} onClose={closeModal} setUserInfoData={setUserInfoData} />
    </>
  );
};

export default UserInfo;

const ProfileBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ProfileImage = styled.img`
  width: 10rem;
  height: 10rem;
  border-radius: 20%;
  margin: 2rem auto;
`;

const PrivateH2 = styled.h2`
  display: flex;
  justify-content: flex-start;
  margin-bottom: 1.5rem;
`;

const UserInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`;

const UserInfoBox = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
`;

const UserInfoSpan = styled.span`
  border: 1px solid var(--color-gray-light);
  border-radius: 0.5rem;
  padding: 0.5rem;
  width: 30rem;
  height: 4rem;
  display: flex;
  align-items: center;
`;

const BtnBox = styled.div`
  margin-top: 2rem;
`;
