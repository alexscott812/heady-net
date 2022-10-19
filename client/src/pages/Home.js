import React from 'react';
import { Navigate } from "react-router-dom";
import {
  Button,
  Flex,
  GridItem,
  Box,
  useBreakpointValue
} from "@chakra-ui/react";
import Grid from '../components/Grid';
import RecentActivity from '../components/RecentActivity.js';
import RecentActivitySkeleton from '../components/RecentActivitySkeleton.js';
import EmptyState from '../components/EmptyState.js';
import NavSidebar from '../components/NavSidebar.js';
import PageContainer from '../components/PageContainer.js';
import Spinner from '../components/Spinner.js';
import TodaysShowsCard from '../components/TodaysShowsCard.js';
import TodaysShowsCardSkeleton from '../components/TodaysShowsCardSkeleton.js';
import { useAuth } from '../lib/auth';
import useDate from '../hooks/useDate.js';
import useDocumentTitle from '../hooks/useDocumentTitle.js';
import useReviews from '../hooks/queries/useReviews.js';
import useShowsCount from '../hooks/queries/useShowsCount.js';
import DiscoverCard from '../components/DiscoverCard.js';
import PopularShowsCard from '../components/PopularShowsCard.js';
import PopularShowsCardSkeleton from '../components/PopularShowsCardSkeleton.js';
import usePopularShows from '../hooks/queries/usePopularShows.js';
import FinishedState from '../components/FinishedState';

const Home = () => {
  useDocumentTitle('Home | HeadyNet');
  const { month, day } = useDate();
  const { isAuthenticated } = useAuth();

  const {
    data: todaysShowsData,
    isLoading: todaysShowsIsLoading
  } = useShowsCount({ month, day }, { staleTime: Infinity });

  const {
    data: popularShowsData,
    isLoading: popularShowsIsLoading
  } = usePopularShows({
    staleTime: Infinity,
    enabled: useBreakpointValue({ base: false, lg: true })
  });

  const {
    data: recentActivityData,
    isLoading: recentActivityIsLoading,
    isRefetching: recentActivityIsRefetching,
    hasMore: hasMoreRecentActivity,
    loadMore: loadMoreRecentActivity,
    isLoadingMore: isLoadingMoreRecentActivity,
    hasNoData: hasNoRecentActivityData
  } = useReviews({ sort: '-created_at' });

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  
  return (
    <PageContainer>
      <Grid>
        <GridItem colSpan={[12,12,4,3]} d={{ base: 'none', md: 'block' }}>
          <NavSidebar />
        </GridItem>
        <GridItem colSpan={[12,12,8,9]}>
          <Grid>
            <GridItem order={[1,1,1,0]} colSpan={[12,12,12,8]}>
              {/* <Text variant="subtle-bold" mb={3}>Recent Activity</Text> */}
              <Spinner isShowing={recentActivityIsRefetching} />
              {recentActivityIsLoading && <RecentActivitySkeleton />}
              {recentActivityData && (
                <>
                  <RecentActivity recentActivity={recentActivityData} />
                  {hasMoreRecentActivity && (
                    <Flex justify="center" align="center">
                      <Button
                        isLoading={isLoadingMoreRecentActivity}
                        loadingText="Loading More..."
                        isDisabled={isLoadingMoreRecentActivity}
                        onClick={loadMoreRecentActivity}
                      >
                        Load More
                      </Button>
                    </Flex>
                  )}
                  {(!hasMoreRecentActivity && !hasNoRecentActivityData) && (
                    <FinishedState />
                  )}
                </>
              )}
              {hasNoRecentActivityData && <EmptyState />}
            </GridItem>
            <GridItem order={[0,0,0,1]} colSpan={[12,12,12,4]}>
              {todaysShowsIsLoading && <TodaysShowsCardSkeleton mb={[0,0,0,4]} />}
              {todaysShowsData !== undefined && (
                <TodaysShowsCard
                  showCount={todaysShowsData}
                  month={month}
                  day={day}
                  mb={[0,0,0,4]}
                />
              )}
              <Box d={{ base: 'none', lg: 'block' }}>
                {popularShowsIsLoading && <PopularShowsCardSkeleton mb={[0,0,0,4]} />}
                {popularShowsData && (
                  <PopularShowsCard shows={popularShowsData} mb={[0,0,0,4]} />
                )}
                <DiscoverCard />
              </Box>
            </GridItem>
          </Grid>
        </GridItem>
      </Grid>
    </PageContainer>
  );
};

export default Home;
