import React from 'react';
import { SimpleGrid } from '@chakra-ui/react';
import ShowCard from './ShowCard.js';
import formatShowLocation from '../utils/format-show-location.js';

const ShowResults = ({ shows = [] }) => {
  return (
    <>
      {shows.length > 0 && (
        <SimpleGrid columns={[1, 2, 3, 3, 4]} spacing={4} mb={4}>
          {shows.map((show) => (
            <ShowCard
              key={show._id}
              id={show._id}
              image={show.image?.thumbnail_md_url}
              title={show.title}
              venue={show.venue.name}
              location={formatShowLocation(
                show.city.name,
                show.state?.name || '',
                show.country.name
              )}
              avgRating={show.avg_rating.toFixed(1)}
              reviewCount={show.review_count}
            />
          ))}
        </SimpleGrid>
      )}
    </>
  );
};

export default ShowResults;
