import styled from 'styled-components';

export const UserInformationContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`;

export const UserInformationH2 = styled.h2`
  display: flex;
  justify-content: flex-start;
  margin-bottom: 1.5rem;
`;

export const UserInformationBox = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
`;

export const UserInformationSpan = styled.span`
  border: 1px solid var(--color-gray-light);
  border-radius: 0.5rem;
  padding: 0.5rem;
  width: 30rem;
  height: 4rem;
  display: flex;
  align-items: center;
`;

export const BtnBox = styled.div`
  margin-top: 2rem;
`;
