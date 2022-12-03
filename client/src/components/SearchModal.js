import React, { useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  Box,
  Text,
  Stack,
  LinkBox,
  LinkOverlay,
  Button,
  Badge,
  useColorModeValue
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import SearchBar from './SearchBar.js';
import useDebounce from '../hooks/useDebounce.js';
import useShows from '../hooks/queries/useShows.js';
import useVenues from '../hooks/queries/useVenues.js';
import useSongs from '../hooks/queries/useSongs.js';
import useUsers from '../hooks/queries/useUsers.js';
import EmptyState from './EmptyState.js';

const SearchResult = ({ text, to, onClick, ...restProps }) => {
  return (
    <LinkBox
      w="100%"
      bg={useColorModeValue('gray.100', 'whiteAlpha.50')}
      px={3}
      py={2}
      borderRadius="md"
      {...restProps}
    >
      <LinkOverlay
        as={RouterLink}
        to={to}
        onClick={onClick}
        _hover={{ textDecoration: 'underline' }}
      >
        <Text d="inline">{text}</Text>
      </LinkOverlay>
    </LinkBox>
  );
};

const SearchModal = ({
  isOpen = false,
  onClose = null,
}) => {
  const searchLimit = 3;
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 300);
  const shouldSearch = !!debouncedSearch && debouncedSearch.length > 2;

  const {
    data: showsData,
    meta: showsMeta,
    // isLoading: showsIsLoading,
    hasMore: hasMoreShows,
    loadMore: loadMoreShows,
    isLoadingMore: isLoadingMoreShows,
    hasNoData: hasNoShowsData
  } = useShows({
    q: debouncedSearch,
    limit: searchLimit
  }, {
    enabled: shouldSearch
  });

  const {
    data: venuesData,
    meta: venuesMeta,
    // isLoading: venuesIsLoading,
    hasMore: hasMoreVenues,
    loadMore: loadMoreVenues,
    isLoadingMore: isLoadingMoreVenues,
    hasNoData: hasNoVenuesData
  } = useVenues({
    q: debouncedSearch,
    limit: searchLimit
  }, {
    enabled: shouldSearch
  });

  const {
    data: songsData,
    meta: songsMeta,
    // isLoading: songsIsLoading,
    hasMore: hasMoreSongs,
    loadMore: loadMoreSongs,
    isLoadingMore: isLoadingMoreSongs,
    hasNoData: hasNoSongsData
  } = useSongs({
    q: debouncedSearch,
    limit: searchLimit
  }, {
    enabled: shouldSearch
  });

  const {
    data: usersData,
    meta: usersMeta,
    // isLoading: usersIsLoading,
    hasMore: hasMoreUsers,
    loadMore: loadMoreUsers,
    isLoadingMore: isLoadingMoreUsers,
    hasNoData: hasNoUsersData
  } = useUsers({
    q: debouncedSearch,
    limit: searchLimit
  }, {
    enabled: shouldSearch
  });

  const handleSearchChange = (e) => {
    const newSearch = e.target.value;
    setSearch(newSearch);
  };

  const handleSearchClear = () => {
    setSearch('');
  };

  const handleClose = () => {
    setSearch('');
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} scrollBehavior="inside" size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <SearchBar
            search={search}
            onChange={handleSearchChange}
            onClear={handleSearchClear}
            placeholder="Search... (ex. 5/8/1977, Red Rocks, Sugaree)"
            size="lg"
            // my={4}
          />
        </ModalHeader>
        <ModalBody py={0}>
          {(showsData && !hasNoShowsData) &&
            <Box mb={4}>
              <Text variant="subtle-bold" mb={2}>
                Shows
                <Badge ml={1} colorScheme="brand">{showsMeta.total_results}</Badge>
              </Text>
              <Stack spacing={2}>
                {showsData.map(show => (
                  <SearchResult
                    key={show._id}
                    text={show.title}
                    to={`/shows/${show._id}`}
                    onClick={handleClose}
                  />
                ))}
                {hasMoreShows && (
                  <Button
                    variant="ghost"
                    onClick={loadMoreShows}
                    isLoading={isLoadingMoreShows}
                    loadingText="Loading More..."
                  >
                    Load More
                  </Button>
                )}
              </Stack>
            </Box>
          }
          {(venuesData && !hasNoVenuesData) &&
            <Box mb={4}>
              <Text variant="subtle-bold" mb={2}>
                Venues
                <Badge ml={1} colorScheme="brand">{venuesMeta.total_results}</Badge>
              </Text>
              <Stack spacing={2}>
                {venuesData.map(venue => (
                  <SearchResult
                    key={venue._id}
                    text={venue.name}
                    to={`/venues/${venue._id}`}
                    onClick={handleClose}
                  />
                ))}
                {hasMoreVenues && (
                  <Button
                    variant="ghost"
                    onClick={loadMoreVenues}
                    isLoading={isLoadingMoreVenues}
                    loadingText="Loading More..."
                  >
                    Load More
                  </Button>
                )}
              </Stack>
            </Box>
          }
          {(songsData && !hasNoSongsData) &&
            <Box mb={4}>
              <Text variant="subtle-bold" mb={2}>
                Songs
                <Badge ml={1} colorScheme="brand">{songsMeta.total_results}</Badge>
              </Text>
              <Stack spacing={2}>
                {songsData.map(song => (
                  <SearchResult
                    key={song._id}
                    text={song.name}
                    to={`/songs/${song._id}`}
                    onClick={handleClose}
                  />
                ))}
                {hasMoreSongs && (
                  <Button
                    variant="ghost"
                    onClick={loadMoreSongs}
                    isLoading={isLoadingMoreSongs}
                    loadingText="Loading More..."
                  >
                    Load More
                  </Button>
                )}
              </Stack>
            </Box>
          }
          {(usersData && !hasNoUsersData) &&
            <Box mb={4}>
              <Text variant="subtle-bold" mb={2}>
                Users
                <Badge ml={1} colorScheme="brand">{usersMeta.total_results}</Badge>
              </Text>
              <Stack spacing={2}>
                {usersData.map(user => (
                  <SearchResult
                    key={user._id}
                    text={`${user.first_name} ${user.last_name}`}
                    to={`/users/${user._id}`}
                    onClick={handleClose}
                  />
                ))}
                {hasMoreUsers && (
                  <Button
                    variant="ghost"
                    onClick={loadMoreUsers}
                    isLoading={isLoadingMoreUsers}
                    loadingText="Loading More..."
                  >
                    Load More
                  </Button>
                )}
              </Stack>
            </Box>
          }
          {(shouldSearch
              && hasNoShowsData 
              && hasNoVenuesData 
              && hasNoSongsData
              && hasNoUsersData
            ) && (
            <EmptyState mb={4} />
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default SearchModal;
