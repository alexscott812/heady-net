const getDisplayName = (username, isCurrentUser) => {
  return isCurrentUser ? 'You' : username;
};

export default getDisplayName;
