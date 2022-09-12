import React from 'react';
import { Box, Button, Heading, Flex, Spacer } from "@chakra-ui/react";
import EmptyState from '../components/EmptyState.js';
import SearchBar from '../components/SearchBar.js';
import SongResults from '../components/SongResults.js';
import SongResultsSkeleton from '../components/SongResultsSkeleton.js';
import SortSelect from '../components/SortSelect.js';
import ResultsCount from '../components/ResultsCount.js';
import PageContainer from '../components/PageContainer.js';
import PageHead from '../components/PageHead.js';
import sortOptions from '../sortOptions/songs.js';
import useDocumentTitle from '../hooks/useDocumentTitle.js';
import useQueryParams from '../hooks/useQueryParams.js';
import useSongs from '../hooks/queries/useSongs.js';
import useDebounce from '../hooks/useDebounce.js';

const Songs = () => {
  useDocumentTitle('Songs | HeadyNet');
  const [query, setQuery] = useQueryParams(['search', 'sort']);
  const debouncedSearch = useDebounce(query.search, 300);

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
    search: debouncedSearch || undefined
  });

  const handleSearchChange = (e) => {
    const { value } = e.target;
    let { search, ...restQuery } = query;
    let newQuery = { ...restQuery, ...(!!value && { search: value }) };
    setQuery(newQuery);
  };

  const handleSearchClear = () => {
    let { search, ...newQuery } = query;
    setQuery(newQuery);
  };

  const handleSortChange = (newSort) => {
    let newQuery = { ...query, sort: newSort };
    setQuery(newQuery);
  };

  return (
    <>
      <PageHead>
        <Flex h={14} alignItems="center" justifyContent="space-between">
          <Box>
            <Heading as="h4" fontWeight="semibold" size="md">Songs</Heading>
          </Box>
          <Box w={['50%','50%','25%','25%']}>
            <SearchBar
              search={query.search}
              onChange={handleSearchChange}
              onClear={handleSearchClear}
            />
          </Box>
        </Flex>
      </PageHead>
      <PageContainer pt={18}>
        <Flex alignItems="center" justifyContent="space-between" mb={4}>
          <Box>
            <ResultsCount count={songsMeta?.total_results} />
          </Box>
          <Spacer />
          <Box>
            <SortSelect
              value={query.sort}
              options={sortOptions}
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
}

export default Songs;
