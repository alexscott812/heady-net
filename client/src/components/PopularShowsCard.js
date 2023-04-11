import React from 'react';
import Card from './Card.js';
import CardBody from './CardBody.js';
import CardTitle from './CardTitle.js';
import {
	Text,
	Box,
	Stack,
	LinkBox,
	LinkOverlay,
	VStack
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { FaFire } from 'react-icons/fa';
import formatShowLocation from '../utils/format-show-location.js';
import CardIcon from './CardIcon.js';

const PopularShowsCard = ({ shows, ...restProps }) => {
	return (
		<Card {...restProps}>
			<CardBody>
				<Stack
					direction={{ base: 'row', lg: 'column' }}
					spacing={4}
					align="flex-start"
				>
					<CardIcon icon={FaFire} />
					<Box flex={1}>
						<CardTitle>Popular Shows</CardTitle>
						<VStack spacing={1} align="start">
							{shows.map((show) => (
								<LinkBox key={show._id} mb={1} w="100%">
									<LinkOverlay
										as={RouterLink}
										to={`/shows/${show._id}`}
										_hover={{ textDecoration: 'underline' }}
									>
										<Text noOfLines={1} fontWeight="semibold">
											{show.title}
										</Text>
									</LinkOverlay>
									<Text noOfLines={1} variant="tertiary">
										{`${show.venue.name} \u00B7 ${formatShowLocation(
											show.city.name,
											show.state?.name || '',
											show.country.name
										)}`}
									</Text>
								</LinkBox>
							))}
						</VStack>
					</Box>
				</Stack>
			</CardBody>
		</Card>
	);
};

export default PopularShowsCard;
