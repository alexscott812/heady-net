import React from 'react';
import ListItemLink from './ListItemLink.js';
import ListCard from './ListCard.js';

const VenueResults = ({ venues = [], ...restProps }) => {
  return (
    <>
      {venues.length > 0 && (
        <ListCard {...restProps}>
          {venues.map(venue => (
            <ListItemLink
              key={venue._id}
              name={venue.name}
              to={`/venues/${venue._id}`}
            />
          ))}
        </ListCard>
      )}
    </>
  );
}

export default VenueResults;
