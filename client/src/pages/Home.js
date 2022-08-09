import React from 'react';
import {
  Button,
  Flex,
  GridItem,
  Text
} from "@chakra-ui/react";
import Grid from '../components/Grid';
import RecentActivity from '../components/RecentActivity.js';
import RecentActivitySkeleton from '../components/RecentActivitySkeleton.js';
import EmptyState from '../components/EmptyState.js';
import NavSidebar from '../components/NavSidebar.js';
// import HeroCard from '../components/_HeroCard.js';
import HeroCard2 from '../components/HeroCard2.js';
import PageContainer from '../components/PageContainer.js';
// import WelcomeCard from '../components/WelcomeCard.js';
import Spinner from '../components/Spinner.js';
import TodaysShowsCard2 from '../components/TodaysShowsCard2.js';
import TodaysShowsCardSkeleton from '../components/TodaysShowsCardSkeleton.js';
//import TodaysShowsCardSkeleton from '../components/TodaysShowsCardSkeleton.js';
import useToast from '../hooks/useToast.js';
// import useAuth from '../hooks/useAuth.js';
import { useAuth } from '../lib/auth';
import useDate from '../hooks/useDate.js';
import useDocumentTitle from '../hooks/useDocumentTitle.js';
import useReviews from '../hooks/queries/useReviews.js';
import useShowsCount from '../hooks/queries/useShowsCount.js';
import DiscoverCard from '../components/DiscoverCard';

const Home = () => {
  useDocumentTitle('Home | HeadyNet');
  const createToast = useToast();
  const { month, day } = useDate();
  const { isAuthenticated } = useAuth();

  const {
    data: todaysShowsData,
    isLoading: todaysShowsIsLoading
  } = useShowsCount({ month, day },
    {
      onError: (err) => {
        createToast({
          id: 'get-shows-count-error',
          status: 'error',
          message: err
        });
      }
    }
  );

  const {
    data: recentActivityData,
    isLoading: recentActivityIsLoading,
    isRefetching: recentActivityIsRefetching,
    hasMore: hasMoreRecentActivity,
    loadMore: loadMoreRecentActivity,
    isLoadingMore: isLoadingMoreRecentActivity,
    hasNoData: hasNoRecentActivityData
  } = useReviews({ sort: '-created_at' },
    {
      onError: (err) => {
        createToast({
          id: 'get-reviews-error',
          status: 'error',
          message: err
        });
      }
    }
  );

  // {isAuthenticated ? <WelcomeCard mb={[0,0,0,4]} /> : <HeroCard2 mb={[0,0,0,4]} />}
  
  return (
    <PageContainer>
      <Grid>
        <GridItem colSpan={[12,12,12,3]} order={1} mb={0}>
          {!isAuthenticated && <HeroCard2 mb={[0,0,0,4]} />}
          <NavSidebar d={['none', 'none', 'none', 'flex']} />
        </GridItem>
        <GridItem colSpan={[12,12,8,6]} order={[3,3,2,2]}>
          {/* <Text variant="subtle-bold" mb={3}>Recent Activity</Text> */}
          <Spinner isShowing={recentActivityIsRefetching} />
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
            </>
          )}
          {hasNoRecentActivityData && <EmptyState />}
          {recentActivityIsLoading && <RecentActivitySkeleton />}
        </GridItem>
        <GridItem colSpan={[12,12,4,3]} order={[2,2,2,3]}>
          {todaysShowsIsLoading && <TodaysShowsCardSkeleton mb={[0,0,4,4]} />}
          {todaysShowsData !== undefined && (
            <TodaysShowsCard2
              showCount={todaysShowsData}
              month={month}
              day={day}
              mb={[0,0,4,4]}
            />
          )}
          <DiscoverCard d={['none', 'none', 'block', 'block']} />
        </GridItem>
      </Grid>
    </PageContainer>
  );
};

export default Home;
