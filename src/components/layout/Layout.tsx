import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { LayoutProps } from '@/lib/types/layoutProps';
import styled from 'styled-components';

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
  max-width: 120rem;
  margin: 0 auto;
  padding: 14rem 0 10rem;
`;
