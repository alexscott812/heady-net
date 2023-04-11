const ACTIONS = {
	FETCH_SHOW_INIT: 'FETCH_SHOW_INIT',
	FETCH_SHOW_SUCCESS: 'FETCH_SHOW_SUCCESS',
	FETCH_SHOW_ERROR: 'FETCH_SHOW_ERROR',
	ADD_REVIEW: 'ADD_REVIEW'
};

const fetchShowInit = () => {
	return {
		type: ACTIONS.FETCH_SHOW_INIT
	};
};

const fetchShowSuccess = (show) => {
	return {
		type: ACTIONS.FETCH_SHOW_SUCCESS,
		payload: {
			show
		}
	};
};

const fetchShowError = (error) => {
	return {
		type: ACTIONS.FETCH_SHOW_ERROR,
		payload: {
			error
		}
	};
};

export { ACTIONS, fetchShowInit, fetchShowSuccess, fetchShowError };
