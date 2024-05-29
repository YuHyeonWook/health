import { Link } from 'react-router-dom';
import LoginOut from './LoginOut';
import styled from 'styled-components';
import logo from '@/assets/images/logo.png';

const NavContainer = styled.nav`
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

const LogoLink = styled(Link)`
  text-decoration: none;
  margin-left: 21rem;
`;

const LogoImage = styled.img`
  width: 4rem;
  height: auto;
`;

const NavLink = styled(Link)`
  text-decoration: none;
  color: #969696;
`;

const NavList = styled.ul`
  display: flex;
  align-items: center;
  gap: 2rem;
`;

const NavItem = styled.li`
  list-style: none;
  margin: 0 1rem;
  font-size: 1.2rem;
`;

const LogoutBox = styled.div`
  margin-left: 24rem;
`;

const Header = () => {
  return (
    <>
      <NavContainer>
        <LogoLink to="/calendar">
          <LogoImage src={logo} alt="logo사진" />
        </LogoLink>
        <NavList>
          <NavItem>
            <NavLink to="/mypage">나의 정보</NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="">PT 신청</NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="">PT 신청내역</NavLink>
          </NavItem>
        </NavList>
        <LogoutBox>
          <LoginOut />
        </LogoutBox>
      </NavContainer>
    </>
  );
};

export default Header;
