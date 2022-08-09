const ACTIONS = {
  FETCH_TODAYS_SHOWS_INIT: 'FETCH_TODAYS_SHOWS_INIT',
  FETCH_TODAYS_SHOWS_SUCCESS: 'FETCH_TODAYS_SHOWS_SUCCESS',
  FETCH_TODAYS_SHOWS_ERROR: 'FETCH_TODAYS_SHOWS_ERROR',
  FETCH_RECENT_ACTIVITY_INIT: 'FETCH_RECENT_ACTIVITY_INIT',
  FETCH_RECENT_ACTIVITY_SUCCESS: 'FETCH_RECENT_ACTIVITY_SUCCESS',
  FETCH_RECENT_ACTIVITY_ERROR: 'FETCH_RECENT_ACTIVITY_ERROR',
  INCREMENT_RECENT_ACTIVITY_PAGE: 'INCREMENT_RECENT_ACTIVITY_PAGE'
};

const fetchTodaysShowsInit = () => {
  return {
    type: ACTIONS.FETCH_TODAYS_SHOWS_INIT
  }
};

const fetchTodaysShowsSuccess = ( todaysShowsCount ) => {
  return {
    type: ACTIONS.FETCH_TODAYS_SHOWS_SUCCESS,
    payload: {
      todaysShowsCount
    }
  }
};

const fetchTodaysShowsError = ( todaysShowsError ) => {
  return {
    type: ACTIONS.FETCH_TODAYS_SHOWS_ERROR,
    payload: {
      todaysShowsError
    }
  }
};

const fetchRecentActivityInit = () => {
  return {
    type: ACTIONS.FETCH_RECENT_ACTIVITY_INIT
  }
};

const fetchRecentActivitySuccess = ( recentActivity, recentActivityHasMore ) => {
  return {
    type: ACTIONS.FETCH_RECENT_ACTIVITY_SUCCESS,
    payload: {
      recentActivity,
      recentActivityHasMore
    }
  }
};

const fetchRecentActivityError = ( recentActivityError ) => {
  return {
    type: ACTIONS.FETCH_RECENT_ACTIVITY_ERROR,
    payload: {
      recentActivityError
    }
  }
};

const incrementRecentActivityPage = ( todaysShowsError ) => {
  return {
    type: ACTIONS.INCREMENT_RECENT_ACTIVITY_PAGE
  }
};

export {
  ACTIONS,
  fetchTodaysShowsInit,
  fetchTodaysShowsSuccess,
  fetchTodaysShowsError,
  fetchRecentActivityInit,
  fetchRecentActivitySuccess,
  fetchRecentActivityError,
  incrementRecentActivityPage
};
