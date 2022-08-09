const ACTIONS = {
  FETCH_SHOWS_INIT: 'FETCH_SHOWS_INIT',
  FETCH_SHOWS_SUCCESS: 'FETCH_SHOWS_SUCCESS',
  FETCH_SHOWS_ERROR: 'FETCH_SHOWS_ERROR',
  RESET_SHOWS: 'RESET_SHOWS',
  INCREMENT_PAGE: 'INCREMENT_PAGE',
  RETRY_FETCH: 'RETRY_FETCH'
};

const fetchShowsInit = () => {
  return {
    type: ACTIONS.FETCH_SHOWS_INIT
  }
};

const fetchShowsSuccess = ( shows, totalResults, hasMore ) => {
  return {
    type: ACTIONS.FETCH_SHOWS_SUCCESS,
    payload: {
      shows,
      totalResults,
      hasMore
    }
  }
};

const fetchShowsError = ( error ) => {
  return {
    type: ACTIONS.FETCH_SHOWS_ERROR,
    payload: {
      error
    }
  }
};

const resetShows = () => {
  return {
    type: ACTIONS.RESET_SHOWS
  }
};

const incrementPage = () => {
  return {
    type: ACTIONS.INCREMENT_PAGE
  }
};

const retryFetch = () => {
  return {
    type: ACTIONS.RETRY_FETCH
  }
};


export {
  ACTIONS,
  fetchShowsInit,
  fetchShowsSuccess,
  fetchShowsError,
  resetShows,
  incrementPage,
  retryFetch
};
