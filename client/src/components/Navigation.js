import React from 'react';
import {
  Link as RouterLink,
  NavLink,
  useLocation
} from 'react-router-dom';
import { useAuth } from '../lib/auth';
import {
  Box,
  Button,
  Container,
  Flex,
  HStack,
  Heading,
  Stack,
  Link,
  Icon,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Text,
  Tooltip,
  Divider,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  useColorModeValue,
  useStyleConfig
} from '@chakra-ui/react';
import AvatarButton from './AvatarButton.js';
import {
  FaBars,
  FaUser,
  FaUserCircle,
  FaSignOutAlt,
  FaSignInAlt,
  FaUserPlus,
  FaHome,
  FaTicketAlt,
  FaMapMarkerAlt,
  FaMusic,
  FaInfoCircle,
  FaBolt,
  FaCog
} from 'react-icons/fa';
import isRouteMatch from '../utils/is-route-match.js';

const NavItem = ({ to, isActive, onClick, children }) => {
  const color = useColorModeValue('gray.500', 'whiteAlpha.600');
  const activeColor = useColorModeValue('gray.800', 'whiteAlpha.900');
  const hoverBgColor = useColorModeValue('gray.50', 'whiteAlpha.50');
  return (
    <Link
      as={NavLink}
      py={2}
      px={3}
      rounded="md"
      to={to}
      onClick={onClick}
      d="flex"
      alignItems="center"
      fontWeight="semibold"
      color={isActive ? activeColor : color}
      _hover={{ bg: hoverBgColor }}
    >
      {children}
    </Link>
  );
};

const Navigation = () => {
  const {
    isOpen: isDrawerOpen,
    onOpen: onDrawerOpen, 
    onClose: onDrawerClose
  } = useDisclosure();
  const { pathname, search } = useLocation();
  const { user, isAuthenticated, logout } = useAuth();

  const authNavLinks = [
    {
      name: 'Your Profile',
      route: `/users/${user?._id}`,
      exact: true,
      icon: FaUserCircle,
      hasSubNav: false,
      isMainNavItem: false
    },
    {
      name: 'Settings',
      route: '/settings',
      exact: true,
      icon: FaCog,
      hasSubNav: false,
      isMainNavItem: false
    }
  ];
  const navLinks = [
    {
      name: 'Home',
      route: '/',
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

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
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
        <Container>
          <Flex h={14} align="center" justifyContent="space-between">
            <Flex flex={1} align="center">
              <Heading
                color={useColorModeValue('brand.500', 'brand.200')}
                as={NavLink}
                to="/"
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
              </Heading>
              <HStack
                as="nav"
                spacing={1}
                display={{ base: 'none', md: 'flex' }}
                ml={3}
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
              </HStack>
            </Flex>
            <HStack spacing={2} justifyContent="flex-end" d={{ base: 'none', md: 'flex' }}>
              {/* <Tooltip label={`${useColorModeValue('Dark', 'Light')} Mode`}>
                <IconButton
                  variant="ghost"
                  color={useColorModeValue('gray.500', 'whiteAlpha.600')}
                  _hover={{ bg: useColorModeValue('gray.50', 'whiteAlpha.50') }}
                  colorScheme="gray"
                  aria-label="Color Mode"
                  icon={useColorModeValue(<FaMoon />, <FaSun />)}
                  onClick={toggleColorMode}
                />
              </Tooltip> */}
              {isAuthenticated
                ? <Menu placement="bottom-end">
                    <MenuButton 
                      as={AvatarButton}
                      size="sm"
                      name={`${user.first_name}`}
                    />
                    <MenuList>
                      {/* <MenuItem
                        as={RouterLink}
                        to={`/users/${user._id}`}
                        icon={<Avatar size="sm" name={`${user.first_name} ${user.last_name}`} />}
                      >
                        <Text fontWeight="medium">
                          {`${user.first_name} ${user.last_name}`}
                        </Text>
                        <Text variant="tertiary">View your profile</Text>
                      </MenuItem>
                      <MenuDivider /> */}
                      <MenuItem
                        as={RouterLink}
                        to={`/users/${user._id}`}
                        icon={<FaUser />}
                      >
                        Your profile
                      </MenuItem>
                      <MenuItem
                        as={RouterLink}
                        to="/settings"
                        icon={<FaCog />}
                      >
                        Settings
                      </MenuItem>
                      <MenuDivider />
                      <MenuItem
                        icon={<FaSignOutAlt />}
                        onClick={logout.mutate}
                      >
                        Log Out
                      </MenuItem>
                    </MenuList>
                  </Menu>
                : <>
                    <Button
                      as={RouterLink}
                      colorScheme="gray"
                      to={['/auth/login', '/auth/register'].includes(pathname)
                        ? '/auth/login'
                        : `/auth/login?redirect=${encodeURIComponent(pathname + search)}`
                      }
                    >
                      Log In
                    </Button>
                    <Button
                      as={RouterLink}
                      to={['/auth/login', '/auth/register'].includes(pathname)
                        ? '/auth/register'
                        : `/auth/register?redirect=${encodeURIComponent(pathname + search)}`
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
                        icon={<Text fontSize="lg" fontWeight="bold" transform="rotate(90deg)">···</Text>}
                        aria-label="Options"
                      />
                      <MenuList>
                        <MenuItem as={RouterLink} to="/settings" icon={<FaCog />}>
                          Settings
                        </MenuItem>
                      </MenuList>
                    </Menu>
                    {/* <Tooltip label="Settings">
                      <IconButton
                        isRound
                        variant="ghost"
                        colorScheme="gray"
                        aria-label="Color Mode"
                        // icon={<FaEllipsisV />}
                        icon={<Text fontSize="lg" fontWeight="bold" transform="rotate(90deg)">···</Text>}
                        as={RouterLink}
                        to="/settings"
                      />
                    </Tooltip> */}
                  </>
              }
            </HStack>
            {/* MOBILE */}
            <HStack spacing={1} justifyContent="flex-end" d={{ md: 'none' }}>  
              <Menu placement="bottom-end">
                <Tooltip label="User">
                  {isAuthenticated 
                    ? <MenuButton 
                        as={AvatarButton}
                        size="sm"
                        name={`${user.first_name}`}
                      />
                    : <MenuButton
                        as={IconButton}
                        isRound
                        variant="solid"
                        cursor="pointer"
                        colorScheme="gray"
                        icon={<FaUser />}
                        aria-label="User"
                      />
                  }
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
                      {/* <MenuItem
                        as={RouterLink}
                        to={`/users/${user._id}`}
                        icon={<Avatar size="sm" name={`${user.first_name} ${user.last_name}`} />}
                      >
                        <Text fontWeight="medium">
                          {`${user.first_name} ${user.last_name}`}
                        </Text>
                        <Text variant="tertiary">View your profile</Text>
                      </MenuItem>
                      <MenuDivider /> */}
                    </>
                  )}
                  <MenuItem as={RouterLink} to="/settings" icon={<FaCog />}>
                    Settings
                  </MenuItem>
                  {/* <MenuItem
                    icon={useColorModeValue(<FaMoon />, <FaSun />)}
                    onClick={toggleColorMode}
                  >
                    {`${useColorModeValue('Dark', 'Light')} Mode`}
                  </MenuItem> */}
                  <MenuDivider />
                  {isAuthenticated
                    ? <MenuItem icon={<FaSignOutAlt />} onClick={logout.mutate}>
                        Log Out
                      </MenuItem>
                    : <>
                        <MenuItem
                          icon={<FaSignInAlt />}
                          as={RouterLink}
                          to={['/auth/login', '/auth/register'].includes(pathname)
                            ? '/auth/login'
                            : `/auth/login?redirect=${encodeURIComponent(pathname + search)}`
                          }
                        >
                          Log In
                        </MenuItem>
                        <MenuItem
                          icon={<FaUserPlus />}
                          as={RouterLink}
                          to={['/auth/login', '/auth/register'].includes(pathname)
                            ? '/auth/register'
                            : `/auth/register?redirect=${encodeURIComponent(pathname + search)}`
                          }
                        >
                          Sign Up
                        </MenuItem>
                      </>
                  }
                </MenuList>
              </Menu>
              <Tooltip label="Menu">
                <IconButton
                  variant="solid"
                  isRound
                  colorScheme="gray"
                  icon={<FaBars />}
                  aria-label="Menu"
                  onClick={isDrawerOpen ? onDrawerClose : onDrawerOpen}
                />
              </Tooltip>
            </HStack>
          </Flex>
        </Container>
      </Box>
      <Drawer isOpen={isDrawerOpen} placement="left" onClose={onDrawerClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth={1}>
            <Heading
              color={useColorModeValue('brand.500', 'brand.200')}
              as={NavLink}
              to="/"
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
              HeadyNet
            </Heading>
          </DrawerHeader>
          <DrawerBody>
            <Stack as="nav" spacing={1}>
              {navLinks.map(link => (
                <NavItem
                  key={link.name}
                  to={link.route}
                  isActive={isRouteMatch(pathname, link.route, link.exact)}
                  onClick={onDrawerClose}
                >
                  <Icon as={link.icon} boxSize={5} mr={4} />
                  {link.name}
                </NavItem>
              ))}
            </Stack>
            <Divider my={3} />
            {isAuthenticated
              ? <>
                  <Stack spacing={1}>
                    {authNavLinks.map(link => (
                      <NavItem
                        key={link.name}
                        to={link.route}
                        isActive={isRouteMatch(pathname, link.route, link.exact)}
                        onClick={onDrawerClose}
                      >
                        <Icon as={link.icon} boxSize={5} mr={4} />
                        {link.name}
                      </NavItem>
                    ))}
                  </Stack>
                  {/* <Button
                    isFullWidth
                    colorScheme="gray"
                    as={RouterLink}
                    to={`/users/${user._id}`}
                    onClick={onDrawerClose}
                    leftIcon={<Avatar size="xs" name={`${user.first_name} ${user.last_name}`} />}
                  >
                    View Profile
                  </Button> */}
                </>
              : <>
                  <Button
                    isFullWidth
                    mb={2}
                    as={RouterLink}
                    to={['/auth/login', '/auth/register'].includes(pathname)
                      ? '/auth/register'
                      : `/auth/register?redirect=${encodeURIComponent(pathname + search)}`
                    }
                    onClick={onDrawerClose}
                  >
                    Sign Up
                  </Button>
                  <Button
                    isFullWidth
                    as={RouterLink}
                    colorScheme="gray"
                    to={['/auth/login', '/auth/register'].includes(pathname)
                      ? '/auth/login'
                      : `/auth/login?redirect=${encodeURIComponent(pathname + search)}`
                    }
                    onClick={onDrawerClose}
                  >
                    Log In
                  </Button>
                </>
            }
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Navigation;
