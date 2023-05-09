import React from 'react';
import {
  Box,
  VStack,
  useColorModeValue,
  Icon,
  Divider,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Heading,
  Button
} from '@chakra-ui/react';
import { Link as RouterLink, NavLink, useLocation } from 'react-router-dom';
import {
  FaBolt,
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

const NavDrawer = ({ ...props }) => {
  const { user, isAuthenticated } = useAuth();
  const { pathname, search } = useLocation();

  const navLinks = [
    {
      name: 'Home',
      route: isAuthenticated ? '/home' : '/',
      exact: true,
      icon: FaHome,
      hasSubNav: false,
      isMainNavItem: false
    },
    {
      name: 'Shows',
      route: '/shows',
      exact: false,
      icon: FaTicketAlt,
      hasSubNav: true,
      isMainNavItem: true
    },
    {
      name: 'Venues',
      route: '/venues',
      exact: false,
      icon: FaMapMarkerAlt,
      hasSubNav: true,
      isMainNavItem: true
    },
    {
      name: 'Songs',
      route: '/songs',
      exact: false,
      icon: FaMusic,
      hasSubNav: true,
      isMainNavItem: true
    },
    {
      name: 'About',
      route: '/about',
      exact: false,
      icon: FaInfoCircle,
      hasSubNav: false,
      isMainNavItem: false
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
    <Drawer {...props}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader borderBottomWidth={1}>
          <Heading
            color={useColorModeValue('brand.500', 'brand.200')}
            as={NavLink}
            to={isAuthenticated ? '/home' : '/'}
            size="md"
            fontWeight="extrabold"
            onClick={props.onClose}
          >
            <Icon
              as={FaBolt}
              boxSize={4}
              color={useColorModeValue('brand.500', 'brand.200')}
              mr={1}
            />
            shakedown
          </Heading>
        </DrawerHeader>
        <DrawerBody>
          <Box flexDirection="column">
            <VStack as="nav" spacing={1}>
              {navLinks.map((link) => (
                <NavSidebarItem
                  key={link.name}
                  to={link.route}
                  onClick={props.onClose}
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
                      onClick={props.onClose}
                      isActive={isRouteMatch(pathname, link.route, link.exact)}
                    >
                      <Icon as={link.icon} boxSize={5} mr={4} />
                      {link.name}
                    </NavSidebarItem>
                  ))}
                </VStack>
              </>
            ) : (
              <>
                <VStack spacing={2}>
                  <Button
                    isFullWidth
                    as={RouterLink}
                    to={
                      ['/auth/login', '/auth/register'].includes(pathname)
                        ? '/auth/register'
                        : `/auth/register?redirect=${encodeURIComponent(
                            pathname + search
                          )}`
                    }
                    onClick={props.onClose}
                  >
                    Sign Up
                  </Button>
                  <Button
                    isFullWidth
                    as={RouterLink}
                    colorScheme="gray"
                    to={
                      ['/auth/login', '/auth/register'].includes(pathname)
                        ? '/auth/login'
                        : `/auth/login?redirect=${encodeURIComponent(
                            pathname + search
                          )}`
                    }
                    onClick={props.onClose}
                  >
                    Log In
                  </Button>
                </VStack>
              </>
            )}
          </Box>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default NavDrawer;
