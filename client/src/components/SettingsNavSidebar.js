import React from 'react';
import {
  VStack,
  Link,
  useColorModeValue,
  Icon
} from '@chakra-ui/react';
import { NavLink, useMatch } from 'react-router-dom';
import {
  FaPalette,
  FaUserCircle,
  FaCog
} from 'react-icons/fa';

const NavSidebarItem = ({ to, onClick, isActive = false, children }) => {
  const color = useColorModeValue('gray.500', 'whiteAlpha.600');
  const activeColor = useColorModeValue('brand.500', 'brand.200');
  const activeBgColor = useColorModeValue('brand.50', 'whiteAlpha.100');
  const hoverBgColor = useColorModeValue('gray.50', 'whiteAlpha.50');
  return (
    <Link
      as={NavLink}
      py={2}
      px={3}
      w="100%"
      rounded="md"
      d="flex"
      alignItems="center"
      to={to}
      onClick={onClick}
      name={to}
      fontWeight="semibold"
      color={isActive ? activeColor : color}
      bg={isActive ? activeBgColor : null}
      _hover={{ bg: isActive ? null : hoverBgColor }}
    >
      {children}
    </Link>
  );
};

const navLinks = [{
  name: 'Profile',
  route: 'profile',
  icon: FaUserCircle
}, {
  name: 'Account',
  route: 'account',
  icon: FaCog
}, {
  name: 'Appearance',
  route: 'appearance',
  icon: FaPalette
}];

const SettingsNavSidebar = () => {
  const loc = useMatch('settings/:tab');
  const activeTab = loc?.params?.tab || 'profile';

  return (
    <VStack spacing={1}>
      {navLinks.map(link => (
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