import React from 'react';
import { Box, Button, Heading, Flex, Spacer } from '@chakra-ui/react';
import EmptyState from '../components/EmptyState.js';
import Card from '../components/Card.js';
import CardBody from '../components/CardBody.js';
import SongResults from '../components/SongResults.js';
import SongResultsSkeleton from '../components/SongResultsSkeleton.js';
import SortSelect from '../components/SortSelect.js';
import ResultsCount from '../components/ResultsCount.js';
import PageContainer from '../components/PageContainer.js';
// import PageHead from '../components/PageHead.js';
import { SONG_SORT_OPTIONS } from '../constants.js';
import useDocumentTitle from '../hooks/useDocumentTitle.js';
import useQueryParams from '../hooks/useQueryParams.js';
import useSongs from '../hooks/queries/useSongs.js';
import useDebounce from '../hooks/useDebounce.js';

const Songs = () => {
  useDocumentTitle('Songs | shakedown');
  const [query, setQuery] = useQueryParams(['search', 'sort']);
  const debouncedSearch = useDebounce(query.q, 300);

  const {
    data: songsData,
    meta: songsMeta,
    isLoading: songsIsLoading,
    hasMore: hasMoreSongs,
    loadMore: loadMoreSongs,
    isLoadingMore: isLoadingMoreSongs,
    hasNoData: hasNoSongsData
  } = useSongs({
    ...query,
    q: debouncedSearch || undefined
  });

  // const handleSearchChange = (e) => {
  //   const newSearch = e.target.value;
  //   let { q, ...restQuery } = query;
  //   let newQuery = { ...restQuery, ...(!!newSearch && { q: newSearch }) };
  //   setQuery(newQuery);
  // };

  // const handleSearchClear = () => {
  //   let { q, ...newQuery } = query;
  //   setQuery(newQuery);
  // };

  const handleSortChange = (newSort) => {
    let newQuery = { ...query, sort: newSort };
    setQuery(newQuery);
  };

  return (
    <>
      {/* <PageHead>
        <Flex h={14} alignItems="center" justifyContent="space-between">
          <Box>
            <Heading as="h4" fontWeight="semibold" size="md">
              Songs
            </Heading>
          </Box>
          <Box w={["50%", "50%", "25%", "25%"]}>
            <SearchBar
              search={query.q}
              onChange={handleSearchChange}
              onClear={handleSearchClear}
            />
          </Box>
        </Flex>
      </PageHead>
      <PageContainer pt={18}> */}
      <PageContainer>
        <Card mb={4}>
          <CardBody px={4} py={1}>
            <Flex h={14} alignItems="center" justifyContent="space-between">
              <Box>
                <Heading as="h4" fontWeight="semibold" size="md">
                  Songs
                </Heading>
              </Box>
            </Flex>
          </CardBody>
        </Card>
        <Flex alignItems="center" justifyContent="space-between" mb={4}>
          <Box>
            <ResultsCount count={songsMeta?.total_results} />
          </Box>
          <Spacer />
          <Box>
            <SortSelect
              value={query.sort}
              options={SONG_SORT_OPTIONS}
              onChange={handleSortChange}
            />
          </Box>
        </Flex>
        {songsIsLoading && <SongResultsSkeleton />}
        {songsData && (
          <>
            <SongResults songs={songsData} mb={4} />
            {hasMoreSongs && (
              <Flex justify="center">
                <Button
                  colorScheme="brand"
                  isLoading={isLoadingMoreSongs}
                  loadingText="Loading More..."
                  isDisabled={isLoadingMoreSongs}
                  onClick={loadMoreSongs}
                >
                  Load More
                </Button>
              </Flex>
            )}
          </>
        )}
        {hasNoSongsData && <EmptyState />}
      </PageContainer>
    </>
  );
};

export default Songs;
