import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { userNameState } from '@/lib/store/userNameState';
import UserInfoModal from './UserInfoModal';
import { ref, get } from 'firebase/database';
import { auth, db } from '@/firebase';
import Button from './Button';

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
          {userInfoData.photoURL && (
            <img
              src={userInfoData.photoURL}
              alt="Profile"
              style={{ width: '100px', height: '100px', borderRadius: '50%' }}
            />
          )}
          <UserInfoBox>
            <UserInfoSpan>닉네임: {userName && <p>닉네임: {userName}</p>}</UserInfoSpan>
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
