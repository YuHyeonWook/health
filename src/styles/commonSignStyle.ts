import styled from 'styled-components';

export const SignForm = styled.form`
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
  gap: 2.5rem;
  border: 1px solid var(--color-white);
  padding: 3rem;
  border-radius: 1rem;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
  width: 45rem;
  height: 80%;
`;

export const BgLoginImg = styled.img`
  position: relative;
`;

export const LogoImg = styled.img`
  width: 8rem;
`;

export const SignLabel = styled.label`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 70%;
`;
