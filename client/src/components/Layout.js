import Navigation from './Navigation';
import Main from './Main';
import ScrollToTop from './ScrollToTop';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';
import NavSidebar from './NavSidebar';

const Layout = () => {
  return (
    <>
      <Navigation />
      <NavSidebar />
      <Main>
        <ScrollToTop />
        <Outlet />
        <Footer />
      </Main>
    </>
  );
};

export default Layout;
