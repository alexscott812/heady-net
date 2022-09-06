import React from "react";
import { useColorMode, useColorModeValue } from '@chakra-ui/react';
import CardTitle from "./CardTitle.js";
import {
  Divider,
  Switch,
  FormControl,
  FormLabel
} from '@chakra-ui/react';

const AppearanceSettings = () => {
  const { toggleColorMode } = useColorMode();

  return (
    <>
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
    </>
  );
};

export default AppearanceSettings;