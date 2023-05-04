import React from 'react';
import { VStack, Link, useColorModeValue, Icon } from '@chakra-ui/react';
import { NavLink, useMatch } from 'react-router-dom';
import { FaPalette, FaUserCircle, FaCog } from 'react-icons/fa';

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

const navLinks = [
  {
    name: 'Profile',
    route: 'profile',
    icon: FaUserCircle
  },
  {
    name: 'Account',
    route: 'account',
    icon: FaCog
  },
  {
    name: 'Appearance',
    route: 'appearance',
    icon: FaPalette
  }
];

const SettingsNavSidebar = () => {
  const loc = useMatch('settings/:tab');
  const activeTab = loc?.params?.tab || 'profile';

  return (
    <VStack spacing={1}>
      {navLinks.map((link) => (
        <NavSidebarItem
          key={link.name}
          to={link.route}
          isActive={activeTab === link.route}
        >
          <Icon as={link.icon} boxSize={5} mr={4} />
          {link.name}
        </NavSidebarItem>
      ))}
    </VStack>
  );
};

export default SettingsNavSidebar;
