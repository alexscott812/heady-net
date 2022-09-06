import React from 'react';
import {
  Button,
  Flex,
  GridItem,
  Alert,
  AlertTitle,
  AlertIcon,
  Box,
  Text
} from "@chakra-ui/react";
import Grid from '../components/Grid';
import RecentActivity from '../components/RecentActivity.js';
import RecentActivitySkeleton from '../components/RecentActivitySkeleton.js';
import EmptyState from '../components/EmptyState.js';
import NavSidebar from '../components/NavSidebar.js';
import HeroCard3 from '../components/HeroCard3.js';
import PageContainer from '../components/PageContainer.js';
import Spinner from '../components/Spinner.js';
import TodaysShowsCard3 from '../components/TodaysShowsCard3.js';
import TodaysShowsCardSkeleton from '../components/TodaysShowsCardSkeleton.js';
import { useAuth } from '../lib/auth';
import useDate from '../hooks/useDate.js';
import useDocumentTitle from '../hooks/useDocumentTitle.js';
import useReviews from '../hooks/queries/useReviews.js';
import useShowsCount from '../hooks/queries/useShowsCount.js';
import DiscoverCard from '../components/DiscoverCard';

const Home = () => {
  useDocumentTitle('Home | HeadyNet');
  const { month, day } = useDate();
  const { isAuthenticated } = useAuth();

  const {
    data: todaysShowsData,
    isLoading: todaysShowsIsLoading
  } = useShowsCount({ month, day });

  const {
    data: recentActivityData,
    isLoading: recentActivityIsLoading,
    isRefetching: recentActivityIsRefetching,
    hasMore: hasMoreRecentActivity,
    loadMore: loadMoreRecentActivity,
    isLoadingMore: isLoadingMoreRecentActivity,
    hasNoData: hasNoRecentActivityData
  } = useReviews({ sort: '-created_at' });
  
  return (
    <PageContainer>
      <Grid>
        <GridItem
          colSpan={[12,12,4,3]}
          d={isAuthenticated ? ['none', 'none', 'block', 'block'] : 'block'}
        >
          {/* {!isAuthenticated && <HeroCard3 mb={[0,0,4,4]} />} */}
          <NavSidebar d={['none', 'none', 'block', 'block']} />
        </GridItem>
        <GridItem colSpan={[12,12,8,9]}>
          <Grid>
            <GridItem order={[1,1,1,0]} colSpan={[12,12,12,8]}>
              {/* <Text variant="subtle-bold" mb={3}>Recent Activity</Text> */}
              {!isAuthenticated && <HeroCard3 mb={[0,0,4,4]} />}
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
                    <Alert
                      status="info"
                      variant="subtle"
                      flexDirection="column"
                      alignItems="center"
                      justifyContent="center"
                      textAlign="center"
                      height="200px"
                      borderRadius="xl"
                    >
                      <AlertIcon boxSize={10} mr={0} />
                      <AlertTitle mt={4} mb={1} fontSize='lg'>
                        That's all there is to see here!
                      </AlertTitle>
                    </Alert>
                  )}
                </>
              )}
              {hasNoRecentActivityData && <EmptyState />}
            </GridItem>
            <GridItem order={[0,0,0,1]} colSpan={[12,12,12,4]}>
              {todaysShowsIsLoading && <TodaysShowsCardSkeleton mb={[0,0,0,4]} />}
              {todaysShowsData !== undefined && (
                <TodaysShowsCard3
                  showCount={todaysShowsData}
                  month={month}
                  day={day}
                  mb={[0,0,0,4]}
                />
              )}
              <Box d={['none', 'none', 'none', 'block']}>
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
