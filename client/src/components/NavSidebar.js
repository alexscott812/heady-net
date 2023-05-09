import React from 'react';
import {
  Box,
  VStack,
  Icon,
  Divider,
  Text,
  Button,
  useStyleConfig
} from '@chakra-ui/react';
import { Link, useLocation } from 'react-router-dom';
import {
  FaHome,
  FaTicketAlt,
  FaMapMarkerAlt,
  FaMusic,
  FaInfoCircle,
  FaUser,
  FaCog,
  FaArrowRight
} from 'react-icons/fa';
import isRouteMatch from '../utils/is-route-match.js';
import { useAuth } from '../lib/auth';
import NavSidebarItem from './NavSidebarItem';

const NavSidebar = ({ ...props }) => {
  const { user, isAuthenticated } = useAuth();
  const { pathname, search } = useLocation();

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
        <Divider my={3} />
        {isAuthenticated ? (
          <>
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
        ) : (
          <Box pt={2} px={3}>
            <Text fontSize="lg" fontWeight="semibold" mb={2}>
              Welcome!
            </Text>
            <Text mb={2}>Create an account to join the community!</Text>
            <Button
              // variant="solid"
              // isFullWidth
              // py={1}
              variant="link"
              rightIcon={<FaArrowRight />}
              as={Link}
              to={`/auth/register?redirect=${encodeURIComponent(
                pathname + search
              )}`}
            >
              Join shakedown
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default NavSidebar;
