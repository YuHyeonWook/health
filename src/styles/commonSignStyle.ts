import styled from 'styled-components';

export const SignForm = styled.form`
  position: relative;
  display: flex;
  position: absolute;
  top: 50%;
  left: 25%;
  transform: translate(-50%, -50%);

  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: auto;
`;

export const SignSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  border: 1px solid var(--color-white);
  padding: 3rem;
  border-radius: 1rem;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
  width: 30%;
  height: 60rem;
`;

export const BgLoginImg = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -1;
`;

export const LogoImg = styled.img`
  width: 8rem;
`;

export const SignLabel = styled.label`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  width: 70%;
`;

export const BorderBox = styled.div`
  background: #ededf4;
  border: none;
  height: 1px;
  width: 70%;
`;
