import styled from 'styled-components';

const NotFound = () => {
  return <NotFoundBox>404에러</NotFoundBox>;
};

export default NotFound;

const NotFoundBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
