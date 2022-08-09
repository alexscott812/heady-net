import React from 'react';
import { Card, Row, Col, Image } from 'react-bootstrap';

const ImageGallery1 = ({
  images = [],
  onImageClick = null
}) => {

  const handleImageClick = ( e ) => {
    const newIndex = images.findIndex(image => image.thumbnail_md_url === e.target.src);
    onImageClick(newIndex);
  };

  return (
    <Card className='text-left mb-4 shadow-sm'>
      <Card.Body>
        <Card.Title>{ 'Images' }</Card.Title>
        {
          (images.length > 0)
            ? <Row xs={3} sm={4} md={4} lg={4} xl={5} className='m-0'>
                {
                  images.map(image => (
                    <Col className='p-1 m-0' key={ image._id }>
                      <Image
                        fluid
                        src={ image.thumbnail_md_url }
                        onClick={ handleImageClick }
                        role='button'
                        tabIndex='0'
                      />
                    </Col>
                  ))
                }
              </Row>
            : <div>{ 'There are no images.' }</div>
        }
      </Card.Body>
    </Card>
  );
};

export default ImageGallery1;
