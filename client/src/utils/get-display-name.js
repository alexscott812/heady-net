const getDisplayName = (firstName, lastName, isCurrentUser, isAuthenticated) => {
  return isCurrentUser
    ? 'You'
    : isAuthenticated 
      ? `${firstName} ${lastName}`
      : `${firstName} ${lastName.charAt(0)}.`;
};

export default getDisplayName;