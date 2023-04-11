import React from 'react';
import { Text } from '@chakra-ui/react';
import pluralize from '../utils/pluralize.js';

const ResultsCount = ({ count = 0 }) => {
	return (
		<Text variant="subtle-bold">
			{`${count} ${pluralize(count, 'Result', 'Results')}`}
		</Text>
	);
};

export default ResultsCount;
