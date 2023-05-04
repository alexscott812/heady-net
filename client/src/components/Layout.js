import Navigation from './Navigation';
import Main from './Main';
import ScrollToTop from './ScrollToTop';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <>
      <Navigation />
      <Main>
        <ScrollToTop />
        <Outlet />
      </Main>
      <Footer />
    </>
  );
};

export default Layout;
