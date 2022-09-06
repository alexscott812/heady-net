import React, { useState } from 'react';
import { Link as RouterLink, Outlet, useLocation } from "react-router-dom";
import Card from "./Card.js";
import CardBody from "./CardBody.js";
import CardTitle from "./CardTitle.js";
import Grid from "./Grid.js";
import GridItem from "./GridItem.js";
import {
  Tabs,
  Tab,
  TabList,
  TabPanels,
  TabPanel,
  FormControl,
  FormLabel,
  Switch,
  Text,
  Button,
  Divider,
  Input,
  Textarea,
  useColorMode,
  useColorModeValue,
  Box,
  Link,
  Icon,
  useBreakpointValue
} from '@chakra-ui/react';
import useToast from '../hooks/useToast.js';
import { FaTrashAlt, FaKey, FaPen, FaUserCircle, FaPalette, FaCog } from 'react-icons/fa';
import useAuth from '../lib/auth/useAuth.js';
import EmptyState from './EmptyState.js';
import SettingsNavSidebar from './SettingsNavSidebar.js';

const SettingsCard = ({ onShowDeleteAccountModal, ...restProps }) => {
  const [navState, setNavState] = useState('Profile');
  const { toggleColorMode } = useColorMode();
  
  return (
    <Card {...restProps}>
      <CardBody>
        <CardTitle>Settings</CardTitle>
        <Grid>
          <GridItem colSpan={[12,12,4,3]}>
            <SettingsNavSidebar />
          </GridItem>
          <GridItem colSpan={[12,12,8,9]}>
            <Outlet />
          </GridItem>
        </Grid>
      </CardBody>
    </Card>
  );
};

export default SettingsCard;