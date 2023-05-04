// import React from 'react';
// import {
//   Box,
//   VStack,
//   Link,
//   useColorModeValue,
//   Icon,
//   Divider
// } from '@chakra-ui/react';
// import { NavLink, useLocation } from 'react-router-dom';
// import {
//   FaHome,
//   FaTicketAlt,
//   FaMapMarkerAlt,
//   FaMusic,
//   FaInfoCircle,
//   FaUserCircle,
//   FaCog
// } from 'react-icons/fa';
// import isRouteMatch from '../utils/is-route-match.js';
// import { useAuth } from '../lib/auth';
// import Card from './Card.js';
// import CardBody from './CardBody.js';
// import CardTitle from './CardTitle.js';

// const NavSidebarItem = ({ to, isActive = false, children }) => {
//   const color = useColorModeValue('gray.500', 'whiteAlpha.600');
//   const activeColor = useColorModeValue('gray.800', 'whiteAlpha.900');
//   const hoverBgColor = useColorModeValue('gray.100', 'whiteAlpha.50');
//   return (
//     <Link
//       as={NavLink}
//       py={2}
//       px={3}
//       w="100%"
//       rounded="md"
//       d="flex"
//       alignItems="center"
//       to={to}
//       fontWeight="semibold"
//       color={isActive ? activeColor : color}
//       _hover={{ bg: hoverBgColor }}
//     >
//       {children}
//     </Link>
//   );
// };

// const NavSidebar = ({ ...props }) => {
//   const navLinks = [{
//     name: 'Home',
//     route: '/',
//     icon: FaHome
//   }, {
//     name: 'Shows',
//     route: '/shows',
//     icon: FaTicketAlt
//   }, {
//     name: 'Venues',
//     route: '/venues',
//     icon: FaMapMarkerAlt
//   }, {
//     name: 'Songs',
//     route: '/songs',
//     icon: FaMusic
//   }, {
//     name: 'About',
//     route: '/about',
//     icon: FaInfoCircle
//   }];

//   const { user, isAuthenticated } = useAuth();
//   const { pathname } = useLocation();

//   return (
//     <Card>
//       <CardBody>
//       {isAuthenticated && (
//         <>
//           <CardTitle>{`Welcome, ${user.first_name}`}</CardTitle>
//           <Divider my={3} />
//         </>
//       )}
//       <Box flexDirection="column" {...props}>
//       <VStack as="nav" spacing={1}>
//         {navLinks.map(link => (
//           <NavSidebarItem
//             key={link.name}
//             to={link.route}
//             isActive={isRouteMatch(pathname, link.route, link.exact)}
//           >
//             <Icon as={link.icon} boxSize={5} mr={4} />
//             {link.name}
//           </NavSidebarItem>
//         ))}
//       </VStack>
//       {isAuthenticated && (
//         <>
//           <Divider my={3} />
//           <VStack as="nav" spacing={1}>
//             <NavSidebarItem to={`/users/${user._id}`}>
//               <Icon as={FaUserCircle} boxSize={5} mr={4} />
//               Your Profile
//             </NavSidebarItem>
//             <NavSidebarItem to="/settings">
//               <Icon as={FaCog} boxSize={5} mr={4} />
//               Settings
//             </NavSidebarItem>
//           </VStack>
//         </>
//       )}
//     </Box>
//       </CardBody>
//     </Card>

//   );
// };

// export default NavSidebar;

import React from 'react';
import {
  Box,
  VStack,
  Link,
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

const NavDrawerItem = ({ to, onClick, isActive = false, children }) => {
  const color = useColorModeValue('gray.500', 'whiteAlpha.600');
  const activeColor = useColorModeValue('brand.600', 'brand.200');
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
                <NavDrawerItem
                  key={link.name}
                  to={link.route}
                  onClick={props.onClose}
                  isActive={isRouteMatch(pathname, link.route, link.exact)}
                >
                  <Icon as={link.icon} boxSize={5} mr={4} />
                  {link.name}
                </NavDrawerItem>
              ))}
            </VStack>
            <Divider my={3} />
            {isAuthenticated ? (
              <>
                <VStack as="nav" spacing={1}>
                  <NavDrawerItem
                    to={`/users/${user._id}`}
                    onClick={props.onClose}
                  >
                    <Icon as={FaUser} boxSize={5} mr={4} />
                    Your Profile
                  </NavDrawerItem>
                  <NavDrawerItem to="/settings" onClick={props.onClose}>
                    <Icon as={FaCog} boxSize={5} mr={4} />
                    Settings
                  </NavDrawerItem>
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
