const formatShowLocation = (city, state, country) => {
  return [city, state, country].filter(Boolean).join(", ");
};

export default formatShowLocation;
