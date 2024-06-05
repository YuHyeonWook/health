import UserInBody from '@/components/UserInBoby';
import UserInfo from '@/components/UserInfo';
import styled from 'styled-components';

const MyPage = () => {
  return (
    <>
      <UserInfomationBox>
        <UserInfo />
        <UserInBody />
      </UserInfomationBox>
    </>
  );
};

export default MyPage;

const UserInfomationBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 5rem;
`;
