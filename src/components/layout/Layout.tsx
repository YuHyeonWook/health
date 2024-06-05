import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { LayoutProps } from '@/lib/types/layoutProps';
import styled from 'styled-components';
import { device } from '@/styles/media';

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Header />
      <Container>{children}</Container>
      <Footer />
    </>
  );
};

export default Layout;

const Container = styled.div`
  max-width: 126rem;
  margin: 0 auto;
  padding: 14rem 3rem 10rem;

  @media ${device.tablet} {
    padding: 8rem 3rem 5rem;
  }
`;
