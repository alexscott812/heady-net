import { ACTIONS } from '../actions/infiniteQueryActions.js';

const initialState = {
	data: [],
	hasMore: false,
	isLoading: true,
	isError: false,
	error: null,
	retryCount: 0,
	page: 1
};

const reducer = (state, action) => {
	switch (action.type) {
		case ACTIONS.FETCH_INIT: {
			return {
				...state,
				isLoading: true,
				isError: false,
				error: null
			};
		}
		case ACTIONS.FETCH_SUCCESS: {
			return {
				...state,
				data: [...state.data, action.payload.data],
				hasMore: action.payload.hasMore,
				isLoading: false,
				isError: false,
				error: null
			};
		}
		case ACTIONS.FETCH_ERROR: {
			return {
				...state,
				isLoading: false,
				isError: true,
				error: action.payload.error
			};
		}
		case ACTIONS.RETRY_FETCH: {
			return {
				...state,
				retryCount: state.retryCount + 1
			};
		}
		case ACTIONS.INCREMENT_PAGE: {
			return {
				...state,
				page: state.page + 1
			};
		}
		default: {
			return {
				state
			};
		}
	}
};

export { initialState, reducer };
