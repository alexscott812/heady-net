import React from 'react';
import { Form, Accordion, Card, Button } from 'react-bootstrap';
import FilterSelect from './FilterSelect.js'
import monthOptions from '../selectOptions/months.js';
import dayOptions from '../selectOptions/days.js';
import yearOptions from '../selectOptions/years.js';
import venueOptions from '../selectOptions/venues.js';
import cityOptions from '../selectOptions/cities.js';
import stateOptions from '../selectOptions/states.js';
import countryOptions from '../selectOptions/countries.js';

const ShowsFilters = (props) => {

  return (
    <Accordion>
      <Card>
        <Accordion.Toggle className="text-left" as={Card.Header} eventKey="1">
          Filters
        </Accordion.Toggle>
        <Accordion.Collapse eventKey="1">
          <Card.Body>
            <Form className="text-left">
              <Form.Group controlId="exampleForm.ControlSelect1">
                <FilterSelect
                  selectLabel='Month'
                  selectName='month'
                  selectValue={props.query.month || ''}
                  selectOptions={monthOptions}
                  handleInputChange={props.handleInputChange}
                />
              </Form.Group>
              <Form.Group controlId="exampleForm.ControlSelect1">
                <FilterSelect
                  selectLabel='Day'
                  selectName='day'
                  selectValue={props.query.day || ''}
                  selectOptions={dayOptions}
                  handleInputChange={props.handleInputChange}
                />
              </Form.Group>
              <Form.Group controlId="exampleForm.ControlSelect1">
                <FilterSelect
                  selectLabel='Year'
                  selectName='year'
                  selectValue={props.query.year || ''}
                  selectOptions={yearOptions}
                  handleInputChange={props.handleInputChange}
                />
              </Form.Group>
              <Form.Group controlId="exampleForm.ControlSelect1">
                <FilterSelect
                  selectLabel='Venue'
                  selectName='venue'
                  selectValue={props.query.venue || ''}
                  selectOptions={venueOptions}
                  handleInputChange={props.handleInputChange}
                />
              </Form.Group>
              <Form.Group controlId="exampleForm.ControlSelect1">
                <FilterSelect
                  selectLabel='City'
                  selectName='city'
                  selectValue={props.query.city || ''}
                  selectOptions={cityOptions}
                  handleInputChange={props.handleInputChange}
                />
              </Form.Group>
              <Form.Group controlId="exampleForm.ControlSelect1">
                <FilterSelect
                  selectLabel='State'
                  selectName='state'
                  selectValue={props.query.state || ''}
                  selectOptions={stateOptions}
                  handleInputChange={props.handleInputChange}
                />
              </Form.Group>
              <Form.Group controlId="exampleForm.ControlSelect1">
                <FilterSelect
                  selectLabel='Country'
                  selectName='country'
                  selectValue={props.query.country || ''}
                  selectOptions={countryOptions}
                  handleInputChange={props.handleInputChange}
                />
              </Form.Group>
            </Form>
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    </Accordion>

    // <Form className="text-left">
    //   <Form.Group controlId="exampleForm.ControlSelect1">
    //     <Form.Row className="mb-3">
    //       <Col lg={4} md={5} sm={6} xs={4}>
    //         <Form.Label>Month</Form.Label>
    //       </Col>
    //       <Col>
    //         <Form.Control value={props.query.month} name="month" onChange={e => props.handleInputChange(e)} size="xs" as="select">
    //           <option value=''></option>
    //           {monthOptions.map(month => (
    //               <option key={month.name}>{month.name}</option>
    //           ))}
    //         </Form.Control>
    //       </Col>
    //     </Form.Row>
    //     <Form.Row className="mb-3">
    //       <Col lg={4} md={5} sm={6} xs={4}>
    //         <Form.Label>Day</Form.Label>
    //       </Col>
    //       <Col>
    //         <Form.Control value={props.query.day} name="day" onChange={e => props.handleInputChange(e)} size="xs" as="select">
    //           <option value=''></option>
    //           {dayOptions.map(day => (
    //               <option key={day.name}>{day.name}</option>
    //           ))}
    //         </Form.Control>
    //       </Col>
    //     </Form.Row>
    //     <Form.Row className="mb-3">
    //       <Col lg={4} md={5} sm={6} xs={4}>
    //         <Form.Label>Year</Form.Label>
    //       </Col>
    //       <Col>
    //         <Form.Control value={props.query.year} name="year" onChange={e => props.handleInputChange(e)} size="xs" as="select">
    //           <option value=''></option>
    //           {yearOptions.map(year => (
    //               <option key={year.name}>{year.name}</option>
    //           ))}
    //         </Form.Control>
    //       </Col>
    //     </Form.Row>
    //     <Form.Row className="mb-3">
    //       <Col lg={4} md={5} sm={6} xs={4}>
    //         <Form.Label>Venue</Form.Label>
    //       </Col>                  <Col>
    //         <Form.Control value={props.query.venue} name="venue" onChange={e => props.handleInputChange(e)} size="xs" as="select">
    //           <option value=''></option>
    //           {venueOptions.map(venue => (
    //               <option key={venue.name}>{venue.name}</option>
    //           ))}
    //         </Form.Control>
    //       </Col>
    //     </Form.Row>
    //     <Form.Row className="mb-3">
    //       <Col lg={4} md={5} sm={6} xs={4}>
    //         <Form.Label>City</Form.Label>
    //       </Col>
    //       <Col>
    //         <Form.Control value={props.query.city} name="city" onChange={e => props.handleInputChange(e)} size="xs" as="select">
    //           <option value=''></option>
    //           {cityOptions.map(city => (
    //               <option key={city.name}>{city.name}</option>
    //           ))}
    //         </Form.Control>
    //       </Col>
    //     </Form.Row>
    //     <Form.Row className="mb-3">
    //       <Col lg={4} md={5} sm={6} xs={4}>
    //         <Form.Label>State</Form.Label>
    //       </Col>
    //       <Col>
    //         <Form.Control value={props.query.state} name="state" onChange={e => props.handleInputChange(e)} size="xs" as="select">
    //           <option value=''></option>
    //           {stateOptions.map(state => (
    //               <option key={state.name}>{state.name}</option>
    //           ))}
    //         </Form.Control>
    //       </Col>
    //     </Form.Row>
    //     <Form.Row className="mb-3">
    //       <Col lg={4} md={5} sm={6} xs={4}>
    //         <Form.Label>Country</Form.Label>
    //       </Col>
    //       <Col>
    //         <Form.Control value={props.query.country} name="country" onChange={e => props.handleInputChange(e)} size="xs" as="select">
    //           <option value=''></option>
    //           {countryOptions.map(country => (
    //               <option key={country.name}>{country.name}</option>
    //           ))}
    //         </Form.Control>
    //       </Col>
    //     </Form.Row>
    //   </Form.Group>
    // </Form>
  );
}

export default ShowsFilters;
