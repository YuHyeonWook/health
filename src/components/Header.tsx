import { Link } from 'react-router-dom';
import SignOut from '@/components/SignOut';

import styled from 'styled-components';
import logo from '@/assets/images/logo.svg';

const Header = () => {
  return (
    <NavContainer>
      <LogoLink to="/calendar">
        <LogoImage src={logo} alt="health calendar" />
      </LogoLink>
      <NavList>
        <NavItem>
          <NavLink to="/mypage">마이페이지</NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/apply">PT 신청</NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/applyList">PT 신청내역</NavLink>
        </NavItem>
      </NavList>
      <LogoutBox>
        <SignOut />
      </LogoutBox>
    </NavContainer>
  );
};

const NavContainer = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 999;
  height: 8rem;
  padding: 0 8rem;
  color: var(--color-gray-dark);
  box-shadow: 0 0 15px 5px rgba(0, 0, 0, 0.03);
  background-color: var(--color-white);
`;

const LogoLink = styled(Link)`
  text-decoration: none;
`;

const LogoImage = styled.img`
  width: 6rem;
  height: auto;
`;

const NavList = styled.ul`
  display: flex;
  align-items: center;
  margin-right: auto;
  padding-left: 12rem;
  gap: 10rem;
`;

const NavItem = styled.li``;

const NavLink = styled(Link)`
  font-size: 1.8rem;
  color: var(--color-gray-dark);
  font-weight: 600;
  transition: color 0.2s;
  &:hover {
    color: var(--color-primary);
  }
`;

const LogoutBox = styled.div`
  font-size: 1.8rem;
  color: var(--color-primary);
  font-weight: 700;
`;

export default Header;
