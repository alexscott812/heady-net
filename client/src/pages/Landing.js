import React from 'react';
import { Link } from "react-router-dom";
import {
  Heading,
  Button,
  LinkBox,
  LinkOverlay,
  Box,
  useBreakpointValue,
  useColorModeValue,
  Text,
  chakra,
  HStack,
  Divider,
  SimpleGrid,
  Container
} from "@chakra-ui/react";
import {
  FaTicketAlt,
  FaMapMarkerAlt,
  FaMusic
} from 'react-icons/fa';
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
import Card from '../components/Card';
import CardBody from '../components/CardBody';
import CardTitle from '../components/CardTitle';
import CardIcon from '../components/CardIcon';

const Landing = () => {
  useDocumentTitle('Home | HeadyNet');
  const { month, day } = useDate();

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
  
  return (
    <>
      {/* <Card mb={4}>
        <CardBody textAlign="center" p={[10,10,20,28]}> */}
        <Box bg={useColorModeValue('white','gray.800')} textAlign="center" p={[12,12,28,28]} mb={4}>
          <Container p={4}>
            <Heading fontSize={50} mb={3} letterSpacing="tight" lineHeight="shorter" >
              {'Welcome to '}
              <chakra.span color={useColorModeValue('brand.500', 'brand.200')}>
                shakedown
              </chakra.span>
            </Heading>
            <Text color={useColorModeValue('gray.500', 'gray.400')} mb={5}>
              shakedown is a place where you can discover and review your favorite Grateful Dead shows.
            </Text>
            <HStack spacing={2} justifyContent="center">
              <Button size="lg">Start Exploring</Button>
              <Button size="lg" colorScheme="gray">Sign Up</Button>
            </HStack>
          </Container>
        </Box>
        {/* </CardBody>
      </Card> */}
      {/* <Divider /> */}
      <Box textAlign="center" py={[12,12,28,28]} mb={4}>
        <Container p={4}>
          <Heading mb={5}>Explore</Heading>
          <Text mb={5}>
            Explore all Grateful Dead shows, venues, and songs ever played.
            <i>"You just gotta poke around!"</i>
          </Text>
          <SimpleGrid columns={[1,1,3,3]} spacing={4} mb={4}>
            <LinkBox as={Card}>
              <CardBody p={10} d="flex" flexDirection="column" alignItems="center">
                <CardIcon icon={FaTicketAlt} mb={4} />
                <LinkOverlay
                  as={Link}
                  to="/shows"
                  _hover={{ textDecoration: 'underline' }}
                >
                  <CardTitle>Shows</CardTitle>
                </LinkOverlay>
              </CardBody>
            </LinkBox>
            <LinkBox as={Card}>
              <CardBody p={10} d="flex" flexDirection="column" alignItems="center">
                <CardIcon icon={FaMapMarkerAlt} mb={4} />
                <LinkOverlay
                  as={Link}
                  to="/venues"
                  _hover={{ textDecoration: 'underline' }}
                >
                  <CardTitle>Venues</CardTitle>
                </LinkOverlay>
              </CardBody>
            </LinkBox>
            <LinkBox as={Card}>
              <CardBody p={10} d="flex" flexDirection="column" alignItems="center">
                <CardIcon icon={FaMusic} mb={4} />
                <LinkOverlay
                  as={Link}
                  to="/songs"
                  _hover={{ textDecoration: 'underline' }}
                >
                  <CardTitle>Songs</CardTitle>
                </LinkOverlay>
              </CardBody>
            </LinkBox>
          </SimpleGrid>
        </Container>
      </Box>
      <Divider />
      <Box textAlign="center" py={[12,12,28,28]} mb={4}> 
        <Container p={4}>
          <Heading mb={5}>Today in History</Heading>
          <Text mb={5}>The Grateful Dead played 6 shows on October 18th.</Text>
          <Button>See 6 Shows</Button>
        </Container>
      </Box>
    </>
  );
};

export default Landing;
