import React, { useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Box,
  Icon,
  Text,
  Stack,
  LinkBox,
  LinkOverlay,
  Button,
  Badge
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import SearchBar from './SearchBar.js';
import useDebounce from '../hooks/useDebounce.js';
import useVenues from '../hooks/queries/useVenues.js';
import useSongs from '../hooks/queries/useSongs.js';
import EmptyState from './EmptyState.js';
import { FaMusic } from 'react-icons/fa';

const SearchResult = ({ text, to, onClick, ...restProps }) => {
  return (
    <LinkBox w="100%" bg="gray.100" px={3} py={2} borderRadius="md" {...restProps}>
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

  const {
    data: venuesData,
    meta: venuesMeta,
    isLoading: venuesIsLoading,
    hasMore: hasMoreVenues,
    loadMore: loadMoreVenues,
    isLoadingMore: isLoadingMoreVenues,
    hasNoData: hasNoVenuesData
  } = useVenues({
    q: debouncedSearch,
    limit: searchLimit
  }, {
    enabled: !!debouncedSearch
  });

  const {
    data: songsData,
    meta: songsMeta,
    isLoading: songsIsLoading,
    hasMore: hasMoreSongs,
    loadMore: loadMoreSongs,
    isLoadingMore: isLoadingMoreSongs,
    hasNoData: hasNoSongsData
  } = useSongs({
    q: debouncedSearch,
    limit: searchLimit
  }, {
    enabled: !!debouncedSearch
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
                  <>
                    {/* <SearchResult
                      text={`See all ${venuesMeta.total_results} venues...`}
                      to={`/search?q=${debouncedSearch}`}
                      onClick={handleClose}
                    /> */}
                    <Button
                      variant="ghost"
                      onClick={loadMoreVenues}
                      isLoading={isLoadingMoreVenues}
                      loadingText="Loading More..."
                    >
                      Load More
                    </Button>
                  </>
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
                  <>
                    {/* <SearchResult
                      text={`See all ${songsMeta.total_results} songs...`}
                      to={`/search?q=${debouncedSearch}`}
                      onClick={handleClose}
                    /> */}
                    <Button
                      variant="ghost"
                      onClick={loadMoreSongs}
                      isLoading={isLoadingMoreSongs}
                      loadingText="Loading More..."
                    >
                      Load More
                    </Button>
                  </>
                )}
              </Stack>
            </Box>
          }
          {(!!debouncedSearch && hasNoVenuesData && hasNoSongsData) && (
            <EmptyState mb={4} />
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default SearchModal;
