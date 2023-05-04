import Navigation from './Navigation';
import Main from './Main';
import ScrollToTop from './ScrollToTop';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

const Layout = () => {
  return (
    <>
      <Navigation />
      <Sidebar />
      <Main>
        <ScrollToTop />
        <Outlet />
      </Main>
      <Footer />
    </>
  );
};

export default Layout;
