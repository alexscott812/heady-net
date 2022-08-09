import React from 'react';
import { Card } from 'react-bootstrap';
import Alert from './Alert.js';

const TodaysShowsErrorCard = ( props ) => {

  return (
    <Card className='shadow-sm mb-4'>
      <Card.Body>
        <Card.Title>{ `Today in History` }</Card.Title>
        <Card.Text>
          <Alert className='mb-0' variant='danger'>
            { props.error }
          </Alert>
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default TodaysShowsErrorCard;
