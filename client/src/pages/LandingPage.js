import React from 'react';
import { Link, Navigate } from "react-router-dom";
import qs from 'query-string';
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
  Container,
  Stack,
  Icon
} from "@chakra-ui/react";
import {
  FaTicketAlt,
  FaMapMarkerAlt,
  FaMusic,
  FaCalendarDay
} from 'react-icons/fa';
import { useAuth } from '../lib/auth';
import useDate from '../hooks/useDate.js';
import useDocumentTitle from '../hooks/useDocumentTitle.js';
import useReviews from '../hooks/queries/useReviews.js';
import useShowsCount from '../hooks/queries/useShowsCount.js';
import usePopularShows from '../hooks/queries/usePopularShows.js';
import Card from '../components/Card';
import CardBody from '../components/CardBody';
import CardTitle from '../components/CardTitle';
import CardIcon from '../components/CardIcon';
import ShowCard from '../components/ShowCard';
import pluralize from '../utils/pluralize.js';
import getMonthName from '../utils/get-month-name.js';
import getDateOrdinal from '../utils/get-date-ordinal.js';
import formatShowLocation from '../utils/format-show-location.js';

const HeroSection = (props) => {
  return (
    <Box bg={useColorModeValue('white','gray.800')} textAlign="center" py={[12,12,28,28]} {...props}>
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
        <Stack direction={{ base: "column", md: "row" }} spacing={2} justifyContent="center">
          <Button size="lg" as={Link} to="/shows">
            Start Exploring
          </Button>
          <Button
            size="lg"
            colorScheme="gray"
            as={Link}
            to={`/auth/register?redirect=${encodeURIComponent('/')}`}
          >
            Sign Up
          </Button>
        </Stack>
      </Container>
    </Box>
  );
}

const ExploreSection = (props) => {
  return (
    <Box textAlign="center" py={[12,12,28,28]} {...props}>
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
  );
};

const TodaysShowsSection = ({ month, day, showCount, ...restProps }) => {
  return (
    <Box bg={useColorModeValue('white','gray.800')} py={[12,12,28,28]} {...restProps}> 
      <Container p={4} maxWidth="2xl">
        <Stack direction={{ base: 'row', lg: 'row' }} spacing={6} align="flex-start">
          <Box flex={1}>
            <Heading mb={5}>Today in History</Heading>
            <Text mb={5}>
              {`${showCount === 0 ? 'Unfortunately, the' : 'The'} Grateful Dead performed ${showCount} ${pluralize(showCount, 'show', 'shows')} on ${getMonthName(month)} ${day}${getDateOrdinal(day)}.`}
            </Text>
            {(showCount > 0) && (
              <Button size="lg" as={Link} to={`/shows?${qs.stringify({ month, day })}`}>
                {`See ${showCount} ${pluralize(showCount, 'Show', 'Shows')}`}
              </Button>
            )}
          </Box>
          <Box
            boxSize={{ base: 28, sm: 60 }}
            borderRadius="full" 
            p={3}
            bg={useColorModeValue('brand.50', 'whiteAlpha.100')}
            d="flex"
            alignItems="center"
            justifyContent="center"
            transform="rotate(10deg)"
          >
            <Icon
              as={FaCalendarDay}
              boxSize={{ base: 14, sm: 36 }}
              color={useColorModeValue('brand.600', 'brand.200')}
            />
          </Box>
        </Stack>
      </Container>
    </Box>
  );
};

const PopularShowsSection = ({ shows = [], ...restProps}) => {
  return (
    <Box textAlign="center" py={[12,12,28,28]} {...restProps}>
      <Container p={4}>
        <Heading mb={5}>Popular Shows</Heading>
        <Text mb={5}>Check out some famous Grateful Dead shows.</Text>
        <SimpleGrid columns={[1,1,4,4]} spacing={4} mb={4}>
          {shows.map(show => (
            <ShowCard
              key={show._id}
              id={show._id}
              image={show.image?.thumbnail_md_url}
              title={show.title}
              venue={show.venue.name}
              location={formatShowLocation(show.city.name, show.state?.name || '', show.country.name)}
              includeRating={false}
              textAlign="start"
            />
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
}

const LandingPage = () => {
  useDocumentTitle('shakedown');
  const { month, day } = useDate();
  const { isAuthenticated } = useAuth();

  const {
    data: todaysShowsData,
    isLoading: todaysShowsIsLoading
  } = useShowsCount({ month, day }, { staleTime: Infinity });

  const {
    data: popularShowsData,
    isLoading: popularShowsIsLoading
  } = usePopularShows({ staleTime: Infinity });

  // const {
  //   data: recentActivityData,
  //   isLoading: recentActivityIsLoading,
  //   isRefetching: recentActivityIsRefetching,
  //   hasMore: hasMoreRecentActivity,
  //   loadMore: loadMoreRecentActivity,
  //   isLoadingMore: isLoadingMoreRecentActivity,
  //   hasNoData: hasNoRecentActivityData
  // } = useReviews({ sort: '-created_at' });

  if (isAuthenticated) {
    return <Navigate to="/home" />;
  }; 
  
  return (
    <>
      <HeroSection mb={4} />
      <ExploreSection mb={4} />
      <TodaysShowsSection
        month={month}
        day={day}
        showCount={todaysShowsData || 0}
        mb={4}
      />
      <PopularShowsSection shows={popularShowsData || []} mb={4} />
    </>
  );
};

export default LandingPage;
