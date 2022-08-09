// import { useCallback, useMemo } from 'react';
// import * as qs from 'query-string';
// import { useLocation, useHistory } from 'react-router-dom';
// import shallowEqual from '../utils/shallow-equal.js';
// import pick from '../utils/pick.js';

// const useSearchParams = ( acceptedSearchParams = [] ) => {

//   const { search } = useLocation();
//   const history = useHistory();

//   const query = useMemo(() => {
//     return pick(qs.parse(search), acceptedSearchParams);
//   }, [search, acceptedSearchParams]);

//   const updateQuery = useCallback((newQuery) => {
//     if (!shallowEqual(query, newQuery)) {
//       history.push({
//         search: qs.stringify(newQuery),
//       });
//     } else {
//       history.replace({
//         search: qs.stringify(newQuery),
//       });
//     }
//   }, [query, history]);

//   return [query, updateQuery];
// };

import { useSearchParams } from 'react-router-dom';

const useQueryParams = (acceptedSearchParams = []) => {
  const [search, setSearch] = useSearchParams();
  const searchAsObject = Object.fromEntries(search);
  // const searchAsObject = Object.fromEntries(
  //   new URLSearchParams(search)
  // );
  return [searchAsObject, setSearch];
};

export default useQueryParams;
