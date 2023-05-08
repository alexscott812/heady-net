import { Link } from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';

const NavSidebarItem = ({ to, onClick, isActive = false, children }) => {
  return (
    <Link
      as={NavLink}
      variant={isActive ? 'nav-active' : 'nav'}
      to={to}
      onClick={onClick}
      name={to}
    >
      {children}
    </Link>
  );
};

export default NavSidebarItem;
