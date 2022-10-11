import React, { useState, useEffect } from 'react';
import {
  Badge,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  HStack,
  VStack,
  Text,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  Box
} from '@chakra-ui/react';
import FilterSelect from './FilterSelect.js';
import { MONTH_OPTIONS, DAY_OPTIONS, YEAR_OPTIONS } from '../constants.js';
import countKeys from '../utils/count-keys.js';

const FilterModal = ({
  isOpen = false,
  query = {},
  onClose = null,
  onFilterApply = null,
  songOptions = [],
  venueOptions = []
}) => {
  const [tempFilters, setTempFilters] = useState(query);

  // useEffect(() => {
  //   setTempFilters(query);
  // }, [query]);

  const handleClose = () => {
    setTempFilters(query);
    onClose();
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    const { [name]: _, ...oldTempFilters } = tempFilters;
    let newTempFilters = {
      ...oldTempFilters,
      ...(value && { [name]: value })
    };
    setTempFilters(newTempFilters);
  };

  const handleFilterApply = () => {
    onClose();
    onFilterApply(tempFilters);
  };

  const handleClearAllFilters = () => {
    setTempFilters({});
  };

  const dateFilterCount = countKeys(tempFilters, ['month', 'day', 'year']);
  const locationFilterCount = countKeys(tempFilters, ['venue', 'city', 'state', 'country']);
  const setlistFilterCount = countKeys(tempFilters, ['song']) ;

  return (
    <Modal isOpen={isOpen} onClose={handleClose} scrollBehavior="inside" size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Filters</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Accordion defaultIndex={[0]} allowMultiple>
            <AccordionItem>
              <AccordionButton>
                <Box align="left" flex={1}>
                  <Text variant="subtle-bold">
                    Date
                    {(dateFilterCount > 0) && (
                      <Badge ml={2} variant="subtle" colorScheme="brand">
                        {dateFilterCount}
                      </Badge>
                    )}
                  </Text>
                </Box>
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel pb={4}>
                <HStack w="full">
                  <FilterSelect
                    label="Month"
                    name="month"
                    value={tempFilters.month || ''}
                    options={MONTH_OPTIONS}
                    handleChange={handleFilterChange}
                  />
                  <FilterSelect
                    label="Day"
                    name="day"
                    value={tempFilters.day || ''}
                    options={DAY_OPTIONS}
                    handleChange={handleFilterChange}
                  />
                  <FilterSelect
                    label="Year"
                    name="year"
                    value={tempFilters.year || ''}
                    options={YEAR_OPTIONS}
                    handleChange={handleFilterChange}
                  />
                </HStack>
              </AccordionPanel>
            </AccordionItem>
            <AccordionItem>
              <AccordionButton>
                <Box align="left" flex={1}>
                  <Text variant="subtle-bold">
                    Location
                    {(locationFilterCount > 0) && (
                      <Badge ml={2} variant="subtle" colorScheme="brand">
                        {locationFilterCount}
                      </Badge>
                    )}
                  </Text>
                </Box>
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel pb={4}>
                <VStack w="full">
                  <FilterSelect
                    label="Venue"
                    name="venue"
                    value={tempFilters.venue || ''}
                    options={venueOptions}
                    handleChange={handleFilterChange}
                  />
                  <FilterSelect
                    label="City"
                    name="city"
                    value={tempFilters.year || ''}
                    options={venueOptions}
                    handleChange={handleFilterChange}
                  />
                  <FilterSelect
                    label="State"
                    name="state"
                    value={tempFilters.year || ''}
                    options={venueOptions}
                    handleChange={handleFilterChange}
                  />
                  <FilterSelect
                    label="Country"
                    name="country"
                    value={tempFilters.year || ''}
                    options={venueOptions}
                    handleChange={handleFilterChange}
                  />
                </VStack>
              </AccordionPanel>
            </AccordionItem>
            <AccordionItem>
              <AccordionButton>
                <Box align="left" flex={1}>
                  <Text variant="subtle-bold">
                    Setlist
                    {(setlistFilterCount > 0) && (
                      <Badge ml={2} variant="subtle" colorScheme="brand">
                        {setlistFilterCount}
                      </Badge>
                    )}
                  </Text>
                </Box>
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel pb={4}>
                <FilterSelect
                  label="Song"
                  name="song"
                  value={tempFilters.song || ''}
                  options={songOptions}
                  handleChange={handleFilterChange}
                />
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="gray" mr={2} onClick={handleClose}>
            Close
          </Button>
          <Button colorScheme="gray" mr={2} onClick={handleClearAllFilters}>
            Clear All
          </Button>
          <Button colorScheme="brand" onClick={handleFilterApply}>
            Apply
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default FilterModal;
