import React, { useState } from 'react';
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
  Box
} from '@chakra-ui/react';
import useChangePassword from '../hooks/mutations/useChangePassword.js';
import { FaTrashAlt, FaKey, FaPen } from 'react-icons/fa';

const SettingsCard = ({ onShowDeleteAccountModal, ...restProps }) => {
  const { toggleColorMode } = useColorMode();
  const changePassword = useChangePassword();
  const [passwords, setPasswords] = useState({
    old_password: '',
    new_password: '',
    confirm_new_password: ''
  });

  const validate = () => {
    return passwords?.old_password.length > 0 &&
      passwords?.new_password.length > 0 &&
      passwords?.confirm_new_password.length > 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPasswords({
      ...passwords,
      [name]: value
    });
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    if (!validate()) return;
    changePassword.mutate({ passwords });
  };

  return (
    <Card {...restProps}>
      <CardBody>
        <CardTitle>Settings</CardTitle>
        <Grid>
          {/* <GridItem colSpan={[12,12,4,3]}>

          </GridItem> */}
          <GridItem colSpan={[12,12,8,9]}>
            <Tabs orientation="vertical">
              <TabList mb={3}>
                <Tab>Profile</Tab>
                <Tab>Account</Tab>
                <Tab>Appearance</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <Box mb={10}>
                    <CardTitle>Profile</CardTitle>
                    <Divider mb={3} />
                    <Text mb={1}>First name</Text>
                    <Input
                      type="text"
                      name="first_name"
                      placeholder="First name"
                      value={passwords?.old_password}
                      onChange={handleInputChange}
                      mb={3}
                    />
                    <Text mb={1}>Last name</Text>
                    <Input
                      type="text"
                      name="last_name"
                      placeholder="Last name"
                      value={passwords?.old_password}
                      onChange={handleInputChange}
                      mb={3}
                    />
                    <Text mb={1}>Bio</Text>
                    <Textarea
                      placeholder="Enter a bit about yourself"
                      mb={3}
                    />
                    <Button
                      variant="solid"
                      leftIcon={<FaPen />}
                      onClick={handleChangePassword}
                      isLoading={changePassword.isLoading}
                      loadingText="Changing Password..."
                      isDisabled={changePassword.isLoading || !validate()}
                    >
                      Update Profile
                    </Button>
                  </Box>
                </TabPanel>
                <TabPanel>
                  <Box mb={10}>
                    <CardTitle>Change Password</CardTitle>
                    <Divider mb={3} />
                    <Text mb={1}>Old password</Text>
                    <Input
                      type="password"
                      name="old_password"
                      placeholder="Old password"
                      value={passwords?.old_password}
                      onChange={handleInputChange}
                      mb={3}
                    />
                    <Text mb={1}>New password</Text>
                    <Input
                      type="password"
                      name="new_password"
                      placeholder="New password"
                      value={passwords?.new_password}
                      onChange={handleInputChange}
                      mb={3}
                    />
                    <Text mb={1}>Confirm new password</Text>
                    <Input
                      type="password"
                      name="confirm_new_password"
                      placeholder="Confirm new password"
                      value={passwords?.confirm_new_password}
                      onChange={handleInputChange}
                      mb={3}
                    />
                    <Button
                      variant="solid"
                      colorScheme="gray"
                      //onClick={onShowChangePasswordButtonClick}
                      leftIcon={<FaKey />}
                      onClick={handleChangePassword}
                      isLoading={changePassword.isLoading}
                      loadingText="Changing Password..."
                      isDisabled={changePassword.isLoading || !validate()}
                    >
                      Change Password
                    </Button>
                  </Box>
                  <Box mb={10}>
                    <CardTitle>Deactivate Account</CardTitle>
                    <Divider mb={3} />
                    <Text mb={3}>Are you sure you want to deactivate your account?</Text>
                    <Button
                      variant="solid"
                      colorScheme="red"
                      onClick={onShowDeleteAccountModal}
                      leftIcon={<FaTrashAlt />}
                    >
                      Deactivate Account
                    </Button>
                  </Box>
                </TabPanel>
                <TabPanel>
                  <CardTitle>Theme</CardTitle>
                  <Divider mb={3} />
                  <FormControl display="flex" alignItems="center">
                    <FormLabel htmlFor="color-mode-switch" mb="0">
                      Dark Mode
                    </FormLabel>
                    <Switch
                      id="color-mode-switch"
                      isChecked={useColorModeValue(false, true)}
                      onChange={toggleColorMode}
                      colorScheme="brand"
                    />
                  </FormControl>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </GridItem>
        </Grid>
      </CardBody>
    </Card>
  );
};

export default SettingsCard;