const ACTIONS = {
	FETCH_INIT: 'FETCH_INIT',
	FETCH_SUCCESS: 'FETCH_SUCCESS',
	FETCH_ERROR: 'FETCH_ERROR',
	RETRY_FETCH: 'RETRY_FETCH',
	INCREMENT_PAGE: 'INCREMENT_PAGE'
};

const fetchInit = () => {
	return {
		type: ACTIONS.FETCH_INIT
	};
};

const fetchSuccess = (data, hasMore) => {
	return {
		type: ACTIONS.FETCH_SUCCESS,
		payload: {
			data,
			hasMore
		}
	};
};

const fetchError = (error) => {
	return {
		type: ACTIONS.FETCH_ERROR,
		payload: {
			error
		}
	};
};

const retryFetch = () => {
	return {
		type: ACTIONS.RETRY_FETCH
	};
};

const incrementPage = () => {
	return {
		type: ACTIONS.INCREMENT_PAGE
	};
};

export {
	ACTIONS,
	fetchInit,
	fetchSuccess,
	fetchError,
	retryFetch,
	incrementPage
};
