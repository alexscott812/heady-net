import React from 'react';
import { Link as RouterLink, NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '../lib/auth';
import {
  Box,
  Button,
  Flex,
  HStack,
  Heading,
  Icon,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Text,
  Tooltip,
  useDisclosure,
  useColorModeValue,
  useStyleConfig
} from '@chakra-ui/react';
import AvatarButton from './AvatarButton.js';
import {
  FaBars,
  FaUser,
  FaSignOutAlt,
  FaSignInAlt,
  FaUserPlus,
  FaBolt,
  FaCog,
  FaSearch
} from 'react-icons/fa';
// import isRouteMatch from '../utils/is-route-match.js';
import SearchModal from './SearchModal';
import NavDrawer from './NavDrawer';
import useLogout from '../hooks/mutations/useLogout';
import Logo from './Logo';

// const NavItem = ({ to, isActive, onClick, children }) => {
//   const color = useColorModeValue('gray.500', 'whiteAlpha.600');
//   const activeColor = useColorModeValue('gray.800', 'whiteAlpha.900');
//   const hoverBgColor = useColorModeValue('gray.50', 'whiteAlpha.50');
//   return (
//     <Link
//       as={NavLink}
//       py={2}
//       px={3}
//       rounded="md"
//       to={to}
//       onClick={onClick}
//       d="flex"
//       alignItems="center"
//       fontWeight="semibold"
//       color={isActive ? activeColor : color}
//       _hover={{ bg: hoverBgColor }}
//     >
//       {children}
//     </Link>
//   );
// };

const Navigation = () => {
  const {
    isOpen: isDrawerOpen,
    onOpen: onDrawerOpen,
    onClose: onDrawerClose
  } = useDisclosure();
  const {
    isOpen: isSearchModalOpen,
    onOpen: onSearchModalOpen,
    onClose: onSearchModalClose
  } = useDisclosure();
  const { pathname, search } = useLocation();
  const { user, isAuthenticated } = useAuth();
  const logout = useLogout();

  // const authNavLinks = [
  //   {
  //     name: 'Your Profile',
  //     route: `/users/${user?._id}`,
  //     exact: true,
  //     icon: FaUserCircle,
  //     hasSubNav: false,
  //     isMainNavItem: false
  //   },
  //   {
  //     name: 'Settings',
  //     route: '/settings',
  //     exact: true,
  //     icon: FaCog,
  //     hasSubNav: false,
  //     isMainNavItem: false
  //   }
  // ];
  // const navLinks = [
  //   {
  //     name: 'Home',
  //     route: '/',
  //     exact: true,
  //     icon: FaHome,
  //     hasSubNav: false,
  //     isMainNavItem: false
  //   },
  //   {
  //     name: 'Shows',
  //     route: '/shows',
  //     exact: false,
  //     icon: FaTicketAlt,
  //     hasSubNav: true,
  //     isMainNavItem: true
  //   },
  //   {
  //     name: 'Venues',
  //     route: '/venues',
  //     exact: false,
  //     icon: FaMapMarkerAlt,
  //     hasSubNav: true,
  //     isMainNavItem: true
  //   },
  //   {
  //     name: 'Songs',
  //     route: '/songs',
  //     exact: false,
  //     icon: FaMusic,
  //     hasSubNav: true,
  //     isMainNavItem: true
  //   },
  //   {
  //     name: 'About',
  //     route: '/about',
  //     exact: false,
  //     icon: FaInfoCircle,
  //     hasSubNav: false,
  //     isMainNavItem: false
  //   }
  // ];

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <>
      <Box
        __css={useStyleConfig('Navigation')}
        // boxShadow={
        //   navLinks
        //     .filter(link => link.hasSubNav)
        //     .some(link => link.route === pathname)
        //       ? 'none'
        //       : 'base'
        // }
      >
        {/* <Container> */}
        <Flex h={14} align="center" justifyContent="space-between">
          <Flex flex={1} align="center">
            <Tooltip label="Menu">
              <IconButton
                isRound
                variant="ghost"
                mr={2}
                //display={{ base: 'none', md: 'flex' }}
                colorScheme="gray"
                icon={<FaBars />}
                aria-label="Menu"
                onClick={isDrawerOpen ? onDrawerClose : onDrawerOpen}
              />
            </Tooltip>
            {/* <Heading
              color={useColorModeValue('brand.500', 'brand.200')}
              as={NavLink}
              to={isAuthenticated ? '/home' : '/'}
              size="md"
              fontWeight="extrabold"
              onClick={handleScrollToTop}
            >
              <Icon
                as={FaBolt}
                boxSize={4}
                color={useColorModeValue('brand.500', 'brand.200')}
                mr={1}
              />
              shakedown
            </Heading> */}
            <Logo
              as={NavLink}
              to={isAuthenticated ? '/home' : '/'}
              onClick={handleScrollToTop}
            />
            <Button
              mx={8}
              display={{ base: 'none', md: 'flex' }}
              colorScheme="gray"
              leftIcon={<Icon as={FaSearch} mr={1} />}
              maxWidth="sm"
              borderRadius="md"
              color={useColorModeValue('gray.400', 'whiteAlpha.400')}
              fontWeight="normal"
              justifyContent="start"
              flex={1}
              onClick={onSearchModalOpen}
            >
              Search...
            </Button>
            {/* <HStack
                as="nav"
                spacing={1}
                display={{ base: 'none', md: 'flex' }}
                //ml={3}
                mr={5}
              >
                {navLinks
                  .filter(link => link.isMainNavItem)
                  .map(link => (
                    <NavItem
                      key={link.name}
                      to={link.route}
                      isActive={isRouteMatch(pathname, link.route, link.exact)}
                      onClick={handleScrollToTop}
                    >
                      {link.name}
                    </NavItem>
                ))}
              </HStack> */}
          </Flex>
          <HStack
            spacing={2}
            justifyContent="flex-end"
            d={{ base: 'none', md: 'flex' }}
          >
            {isAuthenticated ? (
              <Menu placement="bottom-end">
                <MenuButton
                  as={AvatarButton}
                  size="sm"
                  name={`${user.first_name}`}
                />
                <MenuList>
                  <MenuItem
                    as={RouterLink}
                    to={`/users/${user._id}`}
                    icon={<FaUser />}
                  >
                    Your profile
                  </MenuItem>
                  <MenuItem as={RouterLink} to="/settings" icon={<FaCog />}>
                    Settings
                  </MenuItem>
                  <MenuDivider />
                  <MenuItem icon={<FaSignOutAlt />} onClick={logout.mutate}>
                    Log Out
                  </MenuItem>
                </MenuList>
              </Menu>
            ) : (
              <>
                <Button
                  as={RouterLink}
                  colorScheme="gray"
                  to={
                    ['/auth/login', '/auth/register'].includes(pathname)
                      ? '/auth/login'
                      : `/auth/login?redirect=${encodeURIComponent(
                          pathname + search
                        )}`
                  }
                >
                  Log In
                </Button>
                <Button
                  as={RouterLink}
                  to={
                    ['/auth/login', '/auth/register'].includes(pathname)
                      ? '/auth/register'
                      : `/auth/register?redirect=${encodeURIComponent(
                          pathname + search
                        )}`
                  }
                >
                  Sign Up
                </Button>
                <Menu placement="bottom-end">
                  <MenuButton
                    as={IconButton}
                    isRound
                    variant="ghost"
                    cursor="pointer"
                    colorScheme="gray"
                    icon={
                      <Text
                        fontSize="lg"
                        fontWeight="bold"
                        transform="rotate(90deg)"
                      >
                        ···
                      </Text>
                    }
                    aria-label="Options"
                  />
                  <MenuList>
                    <MenuItem as={RouterLink} to="/settings" icon={<FaCog />}>
                      Settings
                    </MenuItem>
                  </MenuList>
                </Menu>
              </>
            )}
          </HStack>
          {/* MOBILE */}
          <HStack spacing={1} justifyContent="flex-end" d={{ md: 'none' }}>
            <Tooltip label="Search">
              <IconButton
                isRound
                variant="ghost"
                colorScheme="gray"
                icon={<FaSearch />}
                aria-label="Search"
                onClick={onSearchModalOpen}
              />
            </Tooltip>
            <Menu placement="bottom-end">
              <Tooltip label="User">
                {isAuthenticated ? (
                  <MenuButton
                    as={AvatarButton}
                    size="sm"
                    name={`${user.first_name}`}
                  />
                ) : (
                  <MenuButton
                    as={IconButton}
                    isRound
                    variant="ghost"
                    cursor="pointer"
                    colorScheme="gray"
                    icon={<FaUser />}
                    aria-label="User"
                  />
                )}
              </Tooltip>
              <MenuList>
                {isAuthenticated && (
                  <>
                    <MenuItem
                      as={RouterLink}
                      to={`/users/${user._id}`}
                      icon={<FaUser />}
                    >
                      Your profile
                    </MenuItem>
                  </>
                )}
                <MenuItem as={RouterLink} to="/settings" icon={<FaCog />}>
                  Settings
                </MenuItem>
                <MenuDivider />
                {isAuthenticated ? (
                  <MenuItem icon={<FaSignOutAlt />} onClick={logout.mutate}>
                    Log Out
                  </MenuItem>
                ) : (
                  <>
                    <MenuItem
                      icon={<FaSignInAlt />}
                      as={RouterLink}
                      to={
                        ['/auth/login', '/auth/register'].includes(pathname)
                          ? '/auth/login'
                          : `/auth/login?redirect=${encodeURIComponent(
                              pathname + search
                            )}`
                      }
                    >
                      Log In
                    </MenuItem>
                    <MenuItem
                      icon={<FaUserPlus />}
                      as={RouterLink}
                      to={
                        ['/auth/login', '/auth/register'].includes(pathname)
                          ? '/auth/register'
                          : `/auth/register?redirect=${encodeURIComponent(
                              pathname + search
                            )}`
                      }
                    >
                      Sign Up
                    </MenuItem>
                  </>
                )}
              </MenuList>
            </Menu>
            {/* <Tooltip label="Menu">
                <IconButton
                  isRound
                  variant="ghost"
                  colorScheme="gray"
                  icon={<FaBars />}
                  aria-label="Menu"
                  onClick={isDrawerOpen ? onDrawerClose : onDrawerOpen}
                />
              </Tooltip> */}
          </HStack>
        </Flex>
        {/* </Container> */}
      </Box>
      <NavDrawer
        isOpen={isDrawerOpen}
        size="sm"
        placement="left"
        onClose={onDrawerClose}
      />
      <SearchModal isOpen={isSearchModalOpen} onClose={onSearchModalClose} />
    </>
  );
};

export default Navigation;
