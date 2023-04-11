import React from 'react';
import {
	InputGroup,
	InputLeftElement,
	InputRightElement,
	Input,
	CloseButton,
	Icon,
	useColorModeValue
} from '@chakra-ui/react';
import { FaSearch } from 'react-icons/fa';

const SearchBar = ({
	search = '',
	placeholder = 'Search...',
	onChange = null,
	onClear = null,
	...restProps
}) => {
	return (
		<InputGroup {...restProps}>
			<InputLeftElement
				pointerEvents="none"
				children={
					<Icon
						as={FaSearch}
						color={useColorModeValue('gray.400', 'whiteAlpha.400')}
					/>
				}
			/>
			<Input placeholder={placeholder} onChange={onChange} value={search} />
			{search && (
				<InputRightElement>
					<CloseButton size="sm" onClick={onClear} />
				</InputRightElement>
			)}
		</InputGroup>
	);
};

export default SearchBar;
