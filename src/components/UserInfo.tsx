import { userNameState } from '@/lib/store/userNameState';
import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

const UserInfo = () => {
  const userName = useRecoilValue(userNameState);
  const [file, setFile] = useState<string>('');
  const [userInfoData, setUserInfoData] = useState({
    birthday: '',
    phoneNumber: '',
    email: '',
  });

  const handleFileUpload = (event) => {
    setFile(event.target.value);
  };

  return (
    <UserInfoBox>
      <label htmlFor="file-upload">
        <input type="file" onChange={handleFileUpload} />
      </label>
      {userName ? `Hello, ${userName}!` : ''}
    </UserInfoBox>
  );
};

export default UserInfo;

const UserInfoBox = styled.div`
  margin-top: 10rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
