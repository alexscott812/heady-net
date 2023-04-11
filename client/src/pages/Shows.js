import React from 'react';
import {
	Box,
	Button,
	Badge,
	Heading,
	Flex,
	Spacer,
	useDisclosure
} from '@chakra-ui/react';
import { FaSlidersH } from 'react-icons/fa';
import EmptyState from '../components/EmptyState.js';
import ShowResults from '../components/ShowResults.js';
import FilterModal from '../components/FilterModal.js';
import PageContainer from '../components/PageContainer.js';
import PageHead from '../components/PageHead.js';
import ResultsCount from '../components/ResultsCount.js';
import SortSelect from '../components/SortSelect.js';
import ShowResultsSkeleton from '../components/ShowResultsSkeleton.js';
import useQueryParams from '../hooks/useQueryParams.js';
import useDocumentTitle from '../hooks/useDocumentTitle.js';
import { SHOW_SORT_OPTIONS } from '../constants.js';
import useShows from '../hooks/queries/useShows.js';
import useSongs from '../hooks/queries/useSongs.js';
import useVenues from '../hooks/queries/useVenues.js';
import countKeys from '../utils/count-keys.js';

const Shows = () => {
	useDocumentTitle('Shows | shakedown');
	const [query, setQuery] = useQueryParams();

	const {
		isOpen: isFilterModalOpen,
		onOpen: onFilterModalOpen,
		onClose: onFilterModalClose
	} = useDisclosure();

	const {
		data: showsData,
		meta: showsMeta,
		isLoading: showsIsLoading,
		hasMore: hasMoreShows,
		loadMore: loadMoreShows,
		isLoadingMore: isLoadingMoreShows,
		hasNoData: hasNoShowsData
	} = useShows(query);

	const { data: songsData } = useSongs(
		{ limit: 1000 },
		{ staleTime: Infinity }
	);
	const { data: venuesData } = useVenues(
		{ limit: 1000 },
		{ staleTime: Infinity }
	);

	const handleFilterApply = (filters) => {
		setQuery(filters);
	};

	const handleSortChange = (newSort) => {
		let newQuery = { ...query, sort: newSort };
		setQuery(newQuery);
	};

	const filterCount = countKeys(query, [
		'month',
		'day',
		'year',
		'venue',
		'city',
		'state',
		'country',
		'song'
	]);

	return (
		<>
			<PageHead>
				<Flex h={14} alignItems="center" justifyContent="space-between">
					<Box>
						<Heading as="h4" fontWeight="semibold" size="md">
							Shows
						</Heading>
					</Box>
					<Spacer />
					<Button
						colorScheme="gray"
						onClick={onFilterModalOpen}
						leftIcon={
							filterCount > 0 ? (
								<Badge variant="solid">{filterCount}</Badge>
							) : (
								<FaSlidersH />
							)
						}
					>
						Filters
					</Button>
				</Flex>
			</PageHead>
			<PageContainer pt={18}>
				<Flex alignItems="center" justifyContent="space-between" mb={4}>
					<Box>
						<ResultsCount count={showsMeta?.total_results} />
					</Box>
					<Spacer />
					<Box>
						<SortSelect
							value={query.sort}
							options={SHOW_SORT_OPTIONS}
							onChange={handleSortChange}
						/>
					</Box>
				</Flex>
				{showsIsLoading && <ShowResultsSkeleton />}
				{showsData && (
					<>
						<ShowResults shows={showsData} />
						{hasMoreShows && (
							<Flex justify="center">
								<Button
									colorScheme="brand"
									isLoading={isLoadingMoreShows}
									loadingText="Loading More..."
									isDisabled={isLoadingMoreShows}
									onClick={loadMoreShows}
								>
									Load More
								</Button>
							</Flex>
						)}
					</>
				)}
				{hasNoShowsData && <EmptyState />}
			</PageContainer>
			<FilterModal
				isOpen={isFilterModalOpen}
				onClose={onFilterModalClose}
				query={query}
				onFilterApply={handleFilterApply}
				songOptions={songsData}
				venueOptions={venuesData}
			/>
		</>
	);
};

export default Shows;
