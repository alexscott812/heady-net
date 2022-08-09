import React from 'react';
import { FormControl, FormLabel, Select } from "@chakra-ui/react";

const FilterSelect = ({
  label = '',
  value = '',
  name = '',
  handleChange = null,
  options = [],
  ...restProps
}) => {
  return (
    <FormControl id={label} {...restProps}>
      <FormLabel>{label}</FormLabel>
      <Select
        variant="filled"
        value={value}
        name={name}
        onChange={handleChange}
      >
        <option value=""></option>
        {options.map(option => (
          <option key={option.name} value={option._id || option.name}>
            {option.name}
          </option>
        ))}
      </Select>
    </FormControl>
  );
}

export default FilterSelect;