import React from 'react';
import Card from './Card.js';
import { Text, FormControl, FormLabel, Switch, useColorMode } from '@chakra-ui/react';

const FooterCard = ({ ...props }) => {

  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Card { ...props }>
      <Text mb={1}>{ '© HeadyNet 2021' }</Text>
      <FormControl display="flex" alignItems="center">
        <FormLabel htmlFor="dark-mode-switch" mb="0">
          { 'Dark Mode' }
        </FormLabel>
        <Switch
          id="dark-mode-switch"
          colorScheme='brand'
          isChecked={ colorMode === "dark" }
          onChange={ toggleColorMode }
        />
      </FormControl>
    </Card>
  );
}

export default FooterCard;
