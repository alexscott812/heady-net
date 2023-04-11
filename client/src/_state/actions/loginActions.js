const ACTIONS = {
	SUBMIT_INIT: 'SUBMIT_INIT',
	SUBMIT_SUCCESS: 'SUBMIT_SUCCESS',
	SUBMIT_ERROR: 'SUBMIT_ERROR'
};

const submitInit = () => {
	return {
		type: ACTIONS.SUBMIT_INIT
	};
};

const submitSuccess = () => {
	return {
		type: ACTIONS.SUBMIT_SUCCESS
	};
};

const submitError = (error) => {
	return {
		type: ACTIONS.SUBMIT_ERROR,
		payload: {
			error
		}
	};
};

export { ACTIONS, submitInit, submitSuccess, submitError };
