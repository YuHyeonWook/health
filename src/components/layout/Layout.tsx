import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { LayoutProps } from '@/lib/types/layoutProps';

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};

export default Layout;
