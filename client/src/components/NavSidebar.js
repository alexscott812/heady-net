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
  Divider
} from '@chakra-ui/react';
import { NavLink, useLocation } from 'react-router-dom';
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
import Card from './Card.js';
import CardBody from './CardBody.js';
import CardTitle from './CardTitle.js';

const NavSidebarItem = ({ to, onClick, isActive = false, children }) => {
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

const NavSidebar = ({ ...props }) => {
  const navLinks = [{
    name: 'Home',
    route: '/',
    icon: FaHome
  }, {
    name: 'Shows',
    route: '/shows',
    icon: FaTicketAlt
  }, {
    name: 'Venues',
    route: '/venues',
    icon: FaMapMarkerAlt
  }, {
    name: 'Songs',
    route: '/songs',
    icon: FaMusic
  }, {
    name: 'About',
    route: '/about',
    icon: FaInfoCircle
  }];

  const { user, isAuthenticated } = useAuth();
  const { pathname } = useLocation();

  return (
    <Card>
      <CardBody>
      {isAuthenticated && (
        <>
          <CardTitle>{`Welcome, ${user.first_name}`}</CardTitle>
          <Divider my={3} />
        </>
      )}
      <Box flexDirection="column" {...props}>
      <VStack as="nav" spacing={1}>
        {navLinks.map(link => (
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
            <NavSidebarItem to={`/users/${user._id}`}>
              <Icon as={FaUser} boxSize={5} mr={4} />
              Your Profile
            </NavSidebarItem>
            <NavSidebarItem to="/settings">
              <Icon as={FaCog} boxSize={5} mr={4} />
              Settings
            </NavSidebarItem>
          </VStack>
        </>
      )}
    </Box>
      </CardBody>
    </Card>
    
  );
};

export default NavSidebar;
