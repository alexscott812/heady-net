import React from 'react';
import { Button, Flex, Box, Heading, Spacer, Divider, SimpleGrid } from "@chakra-ui/react";
import FilterSelect from './FilterSelect.js';
import monthOptions from '../selectOptions/months.js';
import dayOptions from '../selectOptions/days.js';
import yearOptions from '../selectOptions/years.js';
// import venueOptions from '../selectOptions/venues.js';
// import cityOptions from '../selectOptions/cities.js';
// import stateOptions from '../selectOptions/states.js';
// import countryOptions from '../selectOptions/countries.js';
// import songOptions from '../selectOptions/songs.js';

const FilterCard = ( props ) => {

  return (
    <>
      <Divider />
      <Box pb={6}>
        <Flex h={14} alignItems={ 'center' } justifyContent={ 'space-between' }>
          <Box>
            <Heading as="h5" fontWeight='medium' size="md">{ 'Filters' }</Heading>
          </Box>
          <Spacer />
          <Box>
            <Button
              variant='ghost'
              borderRadius='lg'
              colorScheme='gray'
              onClick={ props.handleClearFilters }
            >
              { 'Clear All' }
            </Button>
          </Box>
        </Flex>
        <SimpleGrid columns={[1,3,3,3]} spacingX={4} spacingY={2} mb={2}>
          <FilterSelect
            label='Month'
            name='month'
            value={ props.query.month || '' }
            options={ monthOptions }
            handleChange={ props.handleFilterChange }
          />
          <FilterSelect
            label='Day'
            name='day'
            value={ props.query.day || '' }
            options={ dayOptions }
            handleChange={ props.handleFilterChange }
          />
          <FilterSelect
            label='Year'
            name='year'
            value={ props.query.year || '' }
            options={ yearOptions }
            handleChange={ props.handleFilterChange }
          />
        </SimpleGrid>
      </Box>
    </>
  );
}

// {/*<Card className='shadow-sm'>
//   <Card.Body>
//     <Card.Title>*/}
//       <div className='d-flex'>
//         <div className='me-auto align-self-center'>
//           <h5 className='d-inline m-0'>{ 'Filters' }</h5>
//         </div>
//         <div>
//           <Button
//             variant='ghost'
//             onClick={ props.handleClearFilters }
//           >
//             { 'Clear All' }
//           </Button>
//         </div>
//       </div>
//     {/*</Card.Title>*/}
//     <hr className='mt-0'/>
//     {/*<h6 className='mb-3 text-muted fw-bold'>{ 'DATE' }</h6>*/}
//     <Row>
//       <Col>
//         <FilterSelect
//           label='Month'
//           name='month'
//           value={ props.query.month || '' }
//           options={ monthOptions }
//           handleChange={ props.handleFilterChange }
//         />
//       </Col>
//       <Col>
//         <FilterSelect
//           label='Day'
//           name='day'
//           value={ props.query.day || '' }
//           options={ dayOptions }
//           handleChange={ props.handleFilterChange }
//         />
//       </Col>
//       <Col>
//         <FilterSelect
//           label='Year'
//           name='year'
//           value={ props.query.year || '' }
//           options={ yearOptions }
//           handleChange={ props.handleFilterChange }
//         />
//       </Col>
//     </Row>
//   {/*</Card.Body>
// </Card>*/}

export default FilterCard;
