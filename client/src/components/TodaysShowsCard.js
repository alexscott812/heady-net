import React from 'react';
import Card from './Card.js';
import CardBody from './CardBody.js';
import CardTitle from './CardTitle.js';
import CardIcon from './CardIcon.js';
import { Button, Text, Box, Stack } from '@chakra-ui/react';
import qs from 'query-string';
import { Link } from 'react-router-dom';
import pluralize from '../utils/pluralize.js';
import { FaCalendarDay } from 'react-icons/fa';
import getMonthName from '../utils/get-month-name.js';
import getDateOrdinal from '../utils/get-date-ordinal.js';

const TodaysShowsCard = ({ month, day, showCount, ...restProps }) => {
	return (
		<Card {...restProps}>
			<CardBody>
				<Stack
					direction={{ base: 'row', lg: 'column' }}
					spacing={4}
					align="flex-start"
				>
					<CardIcon icon={FaCalendarDay} transform="rotate(10deg)" />
					<Box flex={1}>
						<CardTitle>Today in History</CardTitle>
						<Text>
							{`${
								showCount === 0 ? 'Unfortunately, the' : 'The'
							} Grateful Dead performed ${showCount} ${pluralize(
								showCount,
								'show',
								'shows'
							)} on ${getMonthName(month)} ${day}${getDateOrdinal(day)}.`}
						</Text>
						{showCount > 0 && (
							<Button
								mt={2}
								variant="solid"
								colorScheme="brand"
								isFullWidth
								as={Link}
								to={`/shows?${qs.stringify({ month, day })}`}
							>
								{`See ${showCount} ${pluralize(showCount, 'Show', 'Shows')}`}
							</Button>
						)}
					</Box>
				</Stack>
			</CardBody>
		</Card>
	);
};

export default TodaysShowsCard;
