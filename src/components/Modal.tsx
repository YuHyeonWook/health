import { useState } from 'react';
import styled, { keyframes } from 'styled-components';

const Modal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openModalHandler = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <ModalContainer>
        <ModalBtn onClick={openModalHandler}>
          {isOpen ? "Opened !" : "+"}
        </ModalBtn>
        {isOpen ? 
        <ModalBackdrop onClick={openModalHandler}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <CloseBtn onClick={openModalHandler}>&times;</CloseBtn>
            <div>Hello World</div>
          </ModalContent>
        </ModalBackdrop> 
        : null}
      </ModalContainer>
    </>    
  );
};

export default Modal;

const ModalContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalBtn = styled.button`
  background-color: #4000c7;
  text-decoration: none;
  border: none;
  padding: 20px;
  color: white;
  border-radius: 30px;
  cursor: pointer; /* grab 대신 pointer로 변경 */
`;

const ModalBackdrop = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.5);
  top: 0;
  left: 0;
`;

const ModalContent = styled.div.attrs(props => ({
  role: 'dialog'
}))`
  position: relative; /* 상대 위치 설정을 추가 */
  text-align: center;
  text-decoration: none;
  padding: 30px 90px;
  background-color: white;
  border-radius: 30px;
  color: #4000c7;
  width: 400px;
  height: 600px;
`;

const CloseBtn = styled.div`
  position: absolute;
  top: 10px; /* 모달 내부 상단에 위치하도록 설정 */
  right: 10px; /* 모달 내부 우측에 위치하도록 설정 */
  cursor: pointer;
  font-size: 24px;
`;
