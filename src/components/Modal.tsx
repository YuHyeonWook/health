import { useState } from 'react';
import styled from 'styled-components';

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
          <ModalView>
            <div onClick={openModalHandler}>&times;</div>
            <div>Hello World</div>
          </ModalView>
        </ModalBackdrop> 
        : null}
      </ModalContainer>
    </>    
  );
};

export default Modal;

export const ModalContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: row wrep;
  justify-content: center;
  align-items: center;
`;
export const ModalBtn = styled.button`
  background-color: #4000c7;
  text-decoration: none;
  border: none;
  padding: 20px;
  color: white;
  border-radius: 30px;
  cursor: grab;
`;
export const ModalBackdrop = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  display: flex;
  flex-flow: row wrep;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.5);
`;
export const ModalView = styled.div.attrs(props => ({
  role: 'dialog'
}))`
  text-align: center;
  text-decoration: none;
  padding: 30px 90px;
  background-color: white;
  border-radius: 30px;
  color: #4000c7;
`;