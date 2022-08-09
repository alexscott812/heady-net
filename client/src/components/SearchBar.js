import React from 'react';
import {
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Input,
  CloseButton
} from '@chakra-ui/react';
import { FaSearch } from 'react-icons/fa';

const SearchBar = ({
  search = '',
  onChange = null,
  onClear = null
}) => {
  return (
    <InputGroup>
      <InputLeftElement pointerEvents="none" children={<FaSearch />} />
      <Input
        placeholder="Search..."
        onChange={onChange}
        value={search}
      />
      {search && (
        <InputRightElement>
          <CloseButton size="sm" borderRadius="full" onClick={onClear} />
        </InputRightElement>
      )}
    </InputGroup>
  );
}

export default SearchBar;
