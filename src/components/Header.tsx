import { Link } from 'react-router-dom';
import LoginOut from './LoginOut';
import styled from 'styled-components';
import logo from '@/assets/images/logo.png';

const StyledNavContainer = styled.nav`
  height: 5rem;
  display: flex;
  align-items: center;
  color: #f9fffa;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  padding-right: 2rem;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1000;
`;

const StyledLogoLink = styled(Link)`
  text-decoration: none;
  margin-left: 21rem;
`;

const StyledLogoImage = styled.img`
  width: 4rem;
  height: auto;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #969696;
`;

const StyledUl = styled.ul`
  display: flex;
  align-items: center;
  gap: 2rem;
`;

const StyledLi = styled.li`
  list-style: none;
  margin: 0 1rem;
  font-size: 1.2rem;
`;

const LogoutWrapper = styled.div`
  margin-left: 24rem;
`;

const Header = () => {
  return (
    <>
      <StyledNavContainer>
        <StyledLogoLink to="/calendar">
          <StyledLogoImage src={logo} alt="logo사진" />
        </StyledLogoLink>
        <StyledUl>
          <StyledLi></StyledLi>
          <StyledLi>
            <StyledLink to="/mypage">나의 정보</StyledLink>
          </StyledLi>
          <StyledLi>
            <StyledLink to="">PT 신청</StyledLink>
          </StyledLi>
          <StyledLi>
            <StyledLink to="">PT 신청내역</StyledLink>
          </StyledLi>
        </StyledUl>
        <LogoutWrapper>
          <LoginOut />
        </LogoutWrapper>
      </StyledNavContainer>
    </>
  );
};

export default Header;
