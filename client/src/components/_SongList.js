import React from 'react';
import { Col, Row, ListGroup, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const SongList = (props) => {

  return (
    <Card className='mb-4 shadow-sm'>
      <ListGroup variant='flush'>
        {
          props.songs.map(song => (
            <ListGroup.Item
              as={ Link }
              to={ `/songs/${song._id}` }
              key={ song._id }
              className='text-left text-decoration-none'
            >
              <span className='text-dark'>{ song.name }</span>
            </ListGroup.Item>
          ))
        }
      </ListGroup>
    </Card>
  );
}

export default SongList;
