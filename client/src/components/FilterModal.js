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
import FilterSelect from './FilterSelect.js'
import monthOptions from '../selectOptions/months.js';
import dayOptions from '../selectOptions/days.js';
import yearOptions from '../selectOptions/years.js';
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

  useEffect(() => {
    setTempFilters(query);
  }, [query]);

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
                    {(countKeys(tempFilters, ['month', 'day', 'year']) > 0) && (
                      <Badge ml={2} variant="subtle" colorScheme="brand">
                        {countKeys(tempFilters, ['month', 'day', 'year'])}
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
                    options={monthOptions}
                    handleChange={handleFilterChange}
                  />
                  <FilterSelect
                    label="Day"
                    name="day"
                    value={tempFilters.day || ''}
                    options={dayOptions}
                    handleChange={handleFilterChange}
                  />
                  <FilterSelect
                    label="Year"
                    name="year"
                    value={tempFilters.year || ''}
                    options={yearOptions}
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
                    {(countKeys(tempFilters, ['venue', 'city', 'state', 'country']) > 0) && (
                      <Badge ml={2} variant="subtle" colorScheme="brand">
                        {countKeys(tempFilters, ['venue', 'city', 'state', 'country'])}
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
                    options={yearOptions}
                    handleChange={handleFilterChange}
                  />
                  <FilterSelect
                    label="State"
                    name="state"
                    value={tempFilters.year || ''}
                    options={yearOptions}
                    handleChange={handleFilterChange}
                  />
                  <FilterSelect
                    label="Country"
                    name="country"
                    value={tempFilters.year || ''}
                    options={yearOptions}
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
                    {(countKeys(tempFilters, ['song']) > 0) && (
                      <Badge ml={2} variant="subtle" colorScheme="brand">
                        {countKeys(tempFilters, ['song'])}
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
