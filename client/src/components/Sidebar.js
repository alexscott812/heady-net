import React from 'react';
import {
  Box,
  VStack,
  Link,
  Icon,
  Divider,
  useStyleConfig
} from '@chakra-ui/react';
import { useLocation } from 'react-router-dom';
import {
  FaHome,
  FaTicketAlt,
  FaMapMarkerAlt,
  FaMusic,
  FaInfoCircle,
  FaUser,
  FaCog
} from 'react-icons/fa';
import isRouteMatch from '../utils/is-route-match.js';
import { useAuth } from '../lib/auth';
import NavSidebarItem from './NavSidebarItem';

const Sidebar = ({ ...props }) => {
  const { user, isAuthenticated } = useAuth();
  const { pathname } = useLocation();

  const navLinks = [
    {
      name: 'Home',
      route: isAuthenticated ? '/home' : '/',
      icon: FaHome,
      exact: true
    },
    {
      name: 'Shows',
      route: '/shows',
      icon: FaTicketAlt
    },
    {
      name: 'Venues',
      route: '/venues',
      icon: FaMapMarkerAlt
    },
    {
      name: 'Songs',
      route: '/songs',
      icon: FaMusic
    },
    {
      name: 'About',
      route: '/about',
      icon: FaInfoCircle,
      exact: false
    }
  ];

  const authNavLinks = [
    {
      name: 'Your Profile',
      route: `/users/${user?._id}`,
      icon: FaUser
    },
    {
      name: 'Settings',
      route: '/settings',
      icon: FaCog
    }
  ];

  return (
    <Box __css={useStyleConfig('Sidebar')}>
      {/* {isAuthenticated && (
        <>
          <CardTitle>{`Welcome, ${user.first_name}`}</CardTitle>
          <Divider my={3} />
        </>
      )} */}
      <Box flexDirection="column" {...props}>
        <VStack as="nav" spacing={1}>
          {navLinks.map((link) => (
            <NavSidebarItem
              key={link.name}
              to={link.route}
              isActive={isRouteMatch(pathname, link.route, link.exact)}
            >
              <Icon as={link.icon} boxSize={5} mr={4} />
              {link.name}
            </NavSidebarItem>
          ))}
        </VStack>
        {isAuthenticated && (
          <>
            <Divider my={3} />
            <VStack as="nav" spacing={1}>
              {authNavLinks.map((link) => (
                <NavSidebarItem
                  key={link.name}
                  to={link.route}
                  isActive={isRouteMatch(pathname, link.route, link.exact)}
                >
                  <Icon as={link.icon} boxSize={5} mr={4} />
                  {link.name}
                </NavSidebarItem>
              ))}
            </VStack>
          </>
        )}
      </Box>
    </Box>
  );
};

export default Sidebar;
