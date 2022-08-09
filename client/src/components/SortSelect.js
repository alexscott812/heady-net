import React from 'react';
import {
  Menu,
  Button,
  MenuButton,
  MenuList,
  MenuOptionGroup,
  MenuItemOption
} from "@chakra-ui/react";
import { FaChevronDown } from 'react-icons/fa'

const SortSelect = ({
  value = '',
  options = [],
  onChange = null
}) => {
  const selectedName = options.filter(x => x.value === value)[0]?.name || options[0]?.name;
  const selectedValue = value || options[0]?.value;

  return (
    <Menu placement="bottom-end" computePositionOnMount closeOnSelect>
      <MenuButton
        as={Button}
        size="sm"
        variant="ghost"
        colorScheme="gray"
        rightIcon={<FaChevronDown />}
      >
        {selectedName}
      </MenuButton>
      <MenuList>
        <MenuOptionGroup value={selectedValue} type="radio" onChange={onChange}>
          {options.map(option => (
            <MenuItemOption key={option.value} value={option.value}>
              {option.name}
            </MenuItemOption>
          ))}
        </MenuOptionGroup>
      </MenuList>
    </Menu>
  );
}

export default SortSelect;
