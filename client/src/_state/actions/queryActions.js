const ACTIONS = {
	FETCH_INIT: 'FETCH_INIT',
	FETCH_SUCCESS: 'FETCH_SUCCESS',
	FETCH_ERROR: 'FETCH_ERROR',
	RETRY_FETCH: 'RETRY_FETCH'
};

const fetchInit = () => {
	return {
		type: ACTIONS.FETCH_INIT
	};
};

const fetchSuccess = (data) => {
	return {
		type: ACTIONS.FETCH_SUCCESS,
		payload: {
			data
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

export { ACTIONS, fetchInit, fetchSuccess, fetchError, retryFetch };
