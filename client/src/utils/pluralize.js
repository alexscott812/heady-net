const pluralize = (number, singularWord, pluralWord) => {
  return number === 1 ? singularWord : pluralWord;
};

export default pluralize;
