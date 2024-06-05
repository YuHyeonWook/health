import styled from 'styled-components';
import { TbError404 } from 'react-icons/tb';

const NotFound = () => {
  return (
    <NotFoundBox>
      <p>
        <NotFoundIcon />
      </p>
      <p>페이지를 찾을 수 없습니다. 입력하신 페이지 주소가 정확한지 또는 존재하는지 확인바랍니다.</p>
    </NotFoundBox>
  );
};

export default NotFound;

const NotFoundIcon = styled(TbError404)`
  font-size: 20rem;
  color: var(--color-primary);
`;
const NotFoundBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100vh;
`;
