const ACTIONS = {
  FETCH_USER_INIT: "FETCH_USER_INIT",
  FETCH_USER_SUCCESS: "FETCH_USER_SUCCESS",
  FETCH_USER_ERROR: "FETCH_USER_ERROR",
  FETCH_RECENT_ACTIVITY_INIT: "FETCH_RECENT_ACTIVITY_INIT",
  FETCH_RECENT_ACTIVITY_SUCCESS: "FETCH_RECENT_ACTIVITY_SUCCESS",
  FETCH_RECENT_ACTIVITY_ERROR: "FETCH_RECENT_ACTIVITY_ERROR",
  RESET_RECENT_ACTIVITY: "RESET_RECENT_ACTIVITY",
  INCREMENT_RECENT_ACTIVITY_PAGE: "INCREMENT_RECENT_ACTIVITY_PAGE",
};

const fetchUserInit = () => {
  return {
    type: ACTIONS.FETCH_USER_INIT,
  };
};

const fetchUserSuccess = (user) => {
  return {
    type: ACTIONS.FETCH_USER_SUCCESS,
    payload: {
      user,
    },
  };
};

const fetchUserError = (error) => {
  return {
    type: ACTIONS.FETCH_USER_ERROR,
    payload: {
      error,
    },
  };
};

const fetchRecentActivityInit = () => {
  return {
    type: ACTIONS.FETCH_RECENT_ACTIVITY_INIT,
  };
};

const fetchRecentActivitySuccess = (recentActivity, recentActivityHasMore) => {
  return {
    type: ACTIONS.FETCH_RECENT_ACTIVITY_SUCCESS,
    payload: {
      recentActivity,
      recentActivityHasMore,
    },
  };
};

const fetchRecentActivityError = (recentActivityError) => {
  return {
    type: ACTIONS.FETCH_RECENT_ACTIVITY_ERROR,
    payload: {
      recentActivityError,
    },
  };
};

const incrementRecentActivityPage = (todaysShowsError) => {
  return {
    type: ACTIONS.INCREMENT_RECENT_ACTIVITY_PAGE,
  };
};

const resetRecentActivity = () => {
  return {
    type: ACTIONS.RESET_RECENT_ACTIVITY,
  };
};

export {
  ACTIONS,
  fetchUserInit,
  fetchUserSuccess,
  fetchUserError,
  fetchRecentActivityInit,
  fetchRecentActivitySuccess,
  fetchRecentActivityError,
  resetRecentActivity,
  incrementRecentActivityPage,
};
