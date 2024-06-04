import styled from 'styled-components';
import logoWhite from '@/assets/images/logo-white.svg';
import iconGithub from '@/assets/images/icon-github-white.svg';
import iconbuilding from '@/assets/images/icon-building.svg';

const Footer = () => {
  return (
    <FooterLayout>
      <InnerBox>
        <InfoBox>
          <Logo>
            <LogoImg src={logoWhite} alt="Heath Calendar" />
          </Logo>
          <InfoText>A personalized fitness training management platform.</InfoText>
          <CopyText>&copy; 2024 Team 5 of the Toy Project. All Rights Reserved.</CopyText>
          {/* <LinkBox>
            <LinkLayout href="">
              <LinkImg src={iconGithub} alt="깃허브 아이콘" />
            </LinkLayout>
            <LinkLayout href="">
              <LinkImg src={iconbuilding} alt="빌딩 아이콘" />
            </LinkLayout>
          </LinkBox> */}
        </InfoBox>
        <ContributorsBox>
          <Title>CONTRIBUTORS</Title>
          <ContributorList>
            <ContributorItem>
              <NameText>박민주</NameText>
              <ContributorLink href="https://github.com/minnug-dev">GitRepository</ContributorLink>
              <ContributorLink href="https://velog.io/@minnug/posts">Blog</ContributorLink>
            </ContributorItem>
            <ContributorItem>
              <NameText>유현욱</NameText>
              <ContributorLink href="https://github.com/YuHyeonWook">GitRepository</ContributorLink>
              <ContributorLink href="https://yho7955.tistory.com/">Blog</ContributorLink>
            </ContributorItem>
            <ContributorItem>
              <NameText>이동희</NameText>
              <ContributorLink href="https://github.com/ldh9669">GitRepository</ContributorLink>
              <ContributorLink href="https://velog.io/@ldh96/posts">Blog</ContributorLink>
            </ContributorItem>
            <ContributorItem>
              <NameText>정보현</NameText>
              <ContributorLink href="https://github.com/jeongbohyeoun">GitRepository</ContributorLink>
              <ContributorLink href="https://velog.io/@wjdfksdl4756/posts">Blog</ContributorLink>
            </ContributorItem>
          </ContributorList>
        </ContributorsBox>
      </InnerBox>
    </FooterLayout>
  );
};

const FooterLayout = styled.footer`
  padding: 4rem 0;
  font-size: 1.4rem;
  color: var(--color-white);
  background-color: var(--color-gray-dark);
`;

const InnerBox = styled.div`
  display: flex;
  justify-content: space-between;
  max-width: 120rem;
  width: 100%;
  margin: 0 auto;
`;

const InfoBox = styled.div`
  font-weight: 300;
`;

const Logo = styled.h1`
  margin-bottom: 1.2rem;
`;

const LogoImg = styled.img`
  width: 6rem;
`;

const InfoText = styled.span`
  display: block;
  margin-bottom: 0.4rem;
`;

const CopyText = styled.span`
  display: block;
  margin-bottom: 0.8rem;
`;

const LinkBox = styled.div`
  display: flex;
  align-items: center;
  column-gap: 0.8rem;
`;

const LinkLayout = styled.a`
  display: block;
`;

const LinkImg = styled.img`
  display: block;
`;

const ContributorsBox = styled.div``;

const Title = styled.h3`
  margin-bottom: 3.6rem;
  font-size: 2rem;
`;

const ContributorList = styled.ul`
  display: flex;
  column-gap: 8rem;
`;

const ContributorItem = styled.li`
  display: flex;
  flex-direction: column;
  row-gap: 0rem;
`;

const NameText = styled.span`
  display: block;
  margin-bottom: 1.2rem;
  font-weight: 600;
`;

const ContributorLink = styled.a`
  display: block;
  padding: 0.2rem 0;
  font-weight: 300;

  &:hover {
    text-decoration: underline;
  }
`;

export default Footer;
