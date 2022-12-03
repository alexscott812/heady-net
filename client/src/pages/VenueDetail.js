import React from 'react';
import Grid from '../components/Grid.js';
import GridItem from '../components/GridItem.js';
import PageContainer from '../components/PageContainer.js';
import EmptyState from '../components/EmptyState.js';
import { useParams } from 'react-router-dom';
import useDocumentTitle from '../hooks/useDocumentTitle.js';
import useVenue from '../hooks/queries/useVenue.js';
import VenueDetailCard from '../components/VenueDetailCard.js';
import VenueDetailCardSkeleton from '../components/VenueDetailCardSkeleton.js';

const VenueDetail = () => {
  const { id } = useParams();

  const {
    data: venueData,
    isLoading: venueIsLoading
  } = useVenue(id);

  useDocumentTitle(`${venueData ? venueData.name : 'Venue Detail'} | shakedown`);

  return (
    <PageContainer>
      <Grid>
        {venueIsLoading && (
          <GridItem>
            <VenueDetailCardSkeleton />
          </GridItem>
        )}
        {venueData && (
          <GridItem>
            <VenueDetailCard venue={venueData} />
          </GridItem>
        )}
        {(!venueData && !venueIsLoading) && (
          <GridItem>
            <EmptyState />
          </GridItem>
        )}
      </Grid>
    </PageContainer>
  );
};

export default VenueDetail;
