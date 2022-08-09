import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faStarHalf } from '@fortawesome/free-solid-svg-icons'

const StarRatingDisplay = (props) => {

  const roundNearestHalf = ( num ) => {
    return Math.round(num * 2) / 2;
  };

  return (
    <div className='mx-2'>
      {
        [...Array(props.numberOfStars)].map((star, i) => (
          <span key={ i }>
            {
              ((i+0 < roundNearestHalf(props.rating)) &&
               (roundNearestHalf(props.rating) < i+1))
                ? <span
                    className='fa-layers fa-fw'
                    style={{marginRight:'.125rem',marginLeft:'.125rem'}}
                  >
                    <FontAwesomeIcon
                      icon={ faStarHalf }
                      color={ props.starRatedColor }
                    />
                    <FontAwesomeIcon
                      className='fa-flip-horizontal'
                      icon={ faStarHalf }
                      color={ props.starDefaultColor }
                    />
                  </span>
                : <span style={{marginRight:'.125rem',marginLeft:'.125rem'}}>
                    <FontAwesomeIcon
                      icon={ faStar }
                      color={
                        (i+1 <= roundNearestHalf(props.rating))
                          ? props.starRatedColor
                          : props.starDefaultColor
                      }
                    />
                  </span>
            }
          </span>
        ))
      }
    </div>
  );
}

//export default StarRatingDisplay;
