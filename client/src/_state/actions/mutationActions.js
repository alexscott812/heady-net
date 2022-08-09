const ACTIONS = {
  MUTATE_INIT: 'MUTATE_INIT',
  MUTATE_SUCCESS: 'MUTATE_SUCCESS',
  MUTATE_ERROR: 'MUTATE_ERROR',
  RESET_MUTATION: 'RESET_MUTATION'
};

const mutateInit = () => {
  return {
    type: ACTIONS.MUTATE_INIT
  }
};

const mutateSuccess = ( data ) => {
  return {
    type: ACTIONS.MUTATE_SUCCESS,
    payload: {
      data
    }
  }
};

const mutateError = ( error ) => {
  return {
    type: ACTIONS.MUTATE_ERROR,
    payload: {
      error
    }
  }
};

const resetMutation = () => {
  return {
    type: ACTIONS.RESET_MUTATION
  }
};

export { ACTIONS, mutateInit, mutateSuccess, mutateError, resetMutation };
