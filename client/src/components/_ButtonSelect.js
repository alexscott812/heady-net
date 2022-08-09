import React from 'react';
import { Button, Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'

const ButtonSelect = ({
  label = '',
  value = '',
  onChange = null,
  options = []
}) => {

  const currentOption = options.find(x => x.value === value);

  return (
    <Menu>
      <MenuButton
        as={ Button }
        borderRadius='lg'
        rightIcon={ <FontAwesomeIcon icon={ faChevronDown } />}
      >
        { `Sort by: ${ currentOption?.name || options[0].name}` }
      </MenuButton>
      <MenuList>
        {
          options.map(option => (
            <MenuItem
              key={ option.value }
              onClick={ () => onChange(option.value) }
            >{ option.name }</MenuItem>
          ))
        }
      </MenuList>
    </Menu>

  );
}

export default ButtonSelect;

// <DropdownButton
//   className='d-inline-block'
//   align='end'
//   variant='secondary'
//   id="dropdown-basic-button"
//   title={ `Sort by: ${ currentOption?.name || options[0].name}` }
// >
//   {
//     options.map(option => (
//       <Dropdown.Item
//         key={ option.value }
//         onClick={ () => onChange(option.value) }
//       >{ option.name }</Dropdown.Item>
//     ))
//   }
// </DropdownButton>
