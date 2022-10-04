import React, { useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Box,
  Link,
  Text
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import SearchBar from './SearchBar.js';
import useDebounce from '../hooks/useDebounce.js';
import useVenues from '../hooks/queries/useVenues.js';
import useSongs from '../hooks/queries/useSongs.js';
import EmptyState from './EmptyState.js';

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
    hasNoData: hasNoVenuesData
  } = useVenues({
    search: debouncedSearch,
    limit: searchLimit
  }, {
    enabled: !!debouncedSearch
  });

  const {
    data: songsData,
    meta: songsMeta,
    isLoading: songsIsLoading,
    hasMore: hasMoreSongs,
    hasNoData: hasNoSongsData
  } = useSongs({
    search: debouncedSearch,
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
        {/* <ModalHeader>Search</ModalHeader>
        <ModalCloseButton /> */}
        <ModalBody>
          <SearchBar
            search={search}
            onChange={handleSearchChange}
            onClear={handleSearchClear}
            placeholder="Search... (ex. 5/8/1977, Red Rocks, Sugaree)"
            size="lg"
            my={4}
          />
          <Box mb={4}>
            {(venuesData && !hasNoVenuesData) &&
              <Box mb={4}>
                <Text variant="subtle-bold">Venues</Text>
                {venuesData.map(venue => (
                  <Box key={venue._id}>
                    <Link as={RouterLink} to={`/venues/${venue._id}`} onClick={handleClose}>
                      {venue.name}
                    </Link>
                  </Box>
                ))}
                {hasMoreVenues && (
                  <Link
                    as={RouterLink}
                    to={`/venues?search=${debouncedSearch}`}
                    onClick={handleClose}
                  >
                    {`See all ${venuesMeta.total_results} venues...`}
                  </Link>
                )}
              </Box>
            }
            {(songsData && !hasNoSongsData) &&
              <Box mb={4}>
                <Text variant="subtle-bold">Songs</Text>
                {songsData.map(song => (
                  <Box key={song._id}>
                    <Link as={RouterLink} to={`/songs/${song._id}`} onClick={handleClose}>
                      {song.name}
                    </Link>
                  </Box>
                ))}
                {hasMoreSongs && (
                  <Link
                    as={RouterLink}
                    to={`/songs?search=${debouncedSearch}`}
                    onClick={handleClose}
                  >
                    {`See all ${songsMeta.total_results} songs...`}
                  </Link>
                )}
              </Box>
            }
            {(!!debouncedSearch && hasNoVenuesData && hasNoSongsData) && (
              <EmptyState />
            )}
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default SearchModal;
