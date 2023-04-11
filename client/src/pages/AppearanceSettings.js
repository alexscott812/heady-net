import React from 'react';
import { useColorMode } from '@chakra-ui/react';
import CardTitle from '../components/CardTitle.js';
import { Divider, Text, RadioGroup, Stack, Radio } from '@chakra-ui/react';

const AppearanceSettings = () => {
	const { colorMode, toggleColorMode } = useColorMode();

	return (
		<>
			<CardTitle>Theme Preference</CardTitle>
			<Divider mb={3} />
			<Text mb={3}>Choose how shakedown looks to you.</Text>
			<RadioGroup onChange={toggleColorMode} value={colorMode}>
				<Stack spacing={4} direction="row">
					<Radio value="light" colorScheme="brand">
						Light mode
					</Radio>
					<Radio value="dark" colorScheme="brand">
						Dark mode
					</Radio>
				</Stack>
			</RadioGroup>
		</>
	);
};

export default AppearanceSettings;
