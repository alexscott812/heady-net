import React from 'react';
import StarRatingDisplay from './StarRatingDisplay.js';
import { Container, Button, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImages } from '@fortawesome/free-solid-svg-icons'

const ShowHeader = (props) => {

  const formatShowLocation = (city, state, country) => {
    return [city, state, country].filter(Boolean).join(', ');
  };

  const randomItem = (items) => {
    return items[Math.floor(Math.random()*items.length)];
  };

  return (
    <>
      <div style={{position: 'relative'}} >
        <div style={{
          backgroundImage:
            (props.show.images && props.show.images.length > 0) ?
            `linear-gradient(to bottom, transparent 0%, black 100%),
            url(${randomItem(props.show.images).url})`
            :
            `linear-gradient(to bottom, transparent 0%, black 100%),
            url(https://res.cloudinary.com/dxiw0w4ar/image/upload/v1609695897/images/default_nvx5wz.jpg)`
            ,
          backgroundColor: 'black',
          height: '60vh',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover'
        }}>

        </div>
        <div style={{position: 'absolute',bottom: '1rem', left: '0', right: '0', color: 'white'}}>
          <Container >
            <Row>
              <Col xs={12} sm={12} md={8} lg={8} xl={9}>
                <div className="mb-3 text-left">
                  <h1 style={{fontSize: '4rem'}}>{props.show.title}</h1>
                  <h4>{props.show.venue} &#183; {formatShowLocation(props.show.city, props.show.state, props.show.country)}</h4>
                  <div className="mt-2" className="h5">
                    <span>{props.show.avg_rating.toFixed(1)}</span>

                    <span className="d-inline-block">
                      <StarRatingDisplay
                        rating={props.show.avg_rating}
                        starRatedColor='#ffc107'
                        starDefaultColor='lightgrey'
                        numberOfStars={5}
                        editable={false}
                      />
                    </span>
                    <span>({props.show.review_count} {props.show.review_count === 1 ? 'Review' : 'Reviews'})</span>
                  </div>
                </div>
              </Col>
              {
                (props.show.images && props.show.images.length > 0) &&
                  <Col xs={12} sm={12} md={4} lg={4} xl={3} className="align-self-end">
                    <div className="text-right">
                      <Button block className="mb-3"
                        variant="outline-light"
                        style={{borderRadius: '1.5rem'}}>
                        <FontAwesomeIcon className="mr-2" icon={faImages} />
                        View {props.show.images.length} {props.show.images.length === 1 ?  'photo' : 'photos'}
                      </Button>
                    </div>
                  </Col>
              }
            </Row>
          </Container>
        </div>
      </div>
    </>

  );
}

export default ShowHeader;
