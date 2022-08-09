import React from 'react';
import StarRating from './StarRating.js';
import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faVolumeUp, faStar, faShare } from '@fortawesome/free-solid-svg-icons'
import { useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth.js';

const ShowHeaderNew = ( props ) => {

  const { isAuthenticated } = useAuth();
  const location = useLocation();

  return (
    <Card
      style={{color:'inherit',textDecoration:'none'}}
      className='text-left mb-4 shadow-sm'
    >
      <Card.Body>
        <h1>{ props.show.title }</h1>
        <div>
          <h5 className='d-inline-block'>
            <Link
              to={ `/venues/${props.show.venue._id}` }
              className='text-dark'
            >
              <span>{ props.show.venue.name }</span>
            </Link>
          </h5>
        </div>
        <div className='pb-1'>
          <h5 className='d-inline-block me-1'>
            <Link
              to={ `/shows?city=${props.show.city._id}` }
              className='text-dark'
            >
              <span>{ props.show.city.name }</span>
            </Link>
            {', '}
          </h5>
          {
            props.show.state &&
              <h5 className='d-inline-block me-1'>
                <Link
                  to={ `/shows?state=${props.show.state._id}` }
                  className='text-dark'
                >
                  <span>{ props.show.state.name }</span>
                </Link>
                {', '}
              </h5>
          }
          <h5 className='d-inline-block'>
            <Link
              to={ `/shows?country=${props.show.country._id}` }
              className='text-dark'
            >
              <span>{ props.show.country.name }</span>
            </Link>
          </h5>
        </div>
        <div className='mb-1 h5'>
          <span className='me-2'>
            { props.show.avg_rating.toFixed(1) }
          </span>
          <span className='d-inline-block'>
            <StarRating
              rating={ props.show.avg_rating }
              starRatedColor='var(--bs-warning)'
              starDefaultColor='lightgrey'
              numberOfStars={ 5 }
              editable={ false }
            />
          </span>
          <span>
            {
              `(${props.show.review_count} ${
              props.show.review_count === 1
                ? 'Review'
                : 'Reviews'
              })`
            }
          </span>
        </div>
        <div className='mt-3 d-grid gap-2'>
          {
            isAuthenticated
              ? <Button
                  variant='primary'
                  onClick={ props.onWriteReviewButtonClick }
                >
                  <FontAwesomeIcon className='me-2' icon={ faStar } />
                  <span>{ 'Write a Review' }</span>
                </Button>
              : <Button
                  variant='primary'
                  as={ Link }
                  to={ `/auth/login?redirect=${encodeURIComponent(location.pathname + location.search)}` }
                >
                  <FontAwesomeIcon className='me-2' icon={ faStar } />
                  <span>{ 'Write a Review' }</span>
                </Button>
          }
          <Button variant='secondary' onClick={ props.onListenButtonClick }>
            <FontAwesomeIcon className='me-2' icon={ faVolumeUp } />
            <span>{ 'Listen' }</span>
          </Button>
          <Button variant='secondary' onClick={ props.onShareButtonClick }>
            <FontAwesomeIcon className='me-2' icon={ faShare } />
            <span>{ 'Share' }</span>
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}

export default ShowHeaderNew;
