import React from 'react';
import Card from './Card.js';
import CardBody from './CardBody.js';
import CardTitle from './CardTitle.js';
import { Skeleton, Stack } from '@chakra-ui/react';

const SetlistCardSkeleton = ({ ...props }) => {
	return (
		<Card {...props}>
			<CardBody>
				<CardTitle>Setlist</CardTitle>
				<Stack>
					<Skeleton h={5} w="100%" />
					<Skeleton h={5} w="100%" />
					<Skeleton h={5} w="100%" />
					<Skeleton h={5} w="60%" />
				</Stack>
			</CardBody>
		</Card>
	);
};

export default SetlistCardSkeleton;
