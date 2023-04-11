import React from 'react';
import Card from './Card.js';
import CardBody from './CardBody.js';
import CardTitle from './CardTitle.js';
import { Button, Icon } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { useAuth } from '../lib/auth';
import { FaBolt } from 'react-icons/fa';

const WelcomeCard = ({ ...props }) => {
	const { user } = useAuth();

	return (
		<Card {...props}>
			<CardBody>
				<CardTitle>
					<Icon as={FaBolt} mr={2} />
					{`Welcome, ${user.first_name}.`}
				</CardTitle>
				<Button
					variant="solid"
					colorScheme="gray"
					isFullWidth
					as={Link}
					to={`/users/${user._id}`}
				>
					View Profile
				</Button>
			</CardBody>
		</Card>
	);
};

export default WelcomeCard;
