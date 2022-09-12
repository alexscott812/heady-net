// import { useState, useEffect } from 'react';
//
// const useStateWithLocalStorage = ( key ) => {
//
//   const [value, setValue] = useState(
//     localStorage.getItem(key) || ''
//   );
//
//   useEffect(() => {
//     // if (!value) {
//     //   localStorage.removeItem(key);
//     // } else {
//     //   localStorage.setItem(key, value);
//     // }
//     console.log(`[key, value] effect running.`);
//     localStorage.setItem(key, value);
//   }, [key, value]);
//
//   useEffect(() => {
//     const localStorageChangeHandler = (e) => {
//       if (
//         (e.storageArea === localStorage) &&
//         (e.key === key) &&
//         (e.oldValue !== e.newValue)
//       ) {
//         console.log(`listener effect running.`);
//         setValue(e.newValue);
//       }
//     };
//
//     window.addEventListener('storage', localStorageChangeHandler);
//     return () => window.removeEventListener('storage', localStorageChangeHandler);
//
//   }, [key]);
//
//   return [value, setValue];
// };
//
// export default useStateWithLocalStorage;









import { useState, useEffect, useCallback } from 'react';

const useStateWithLocalStorage = ( key, initialValue ) => {

  const [value, setValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return JSON.parse(item) || initialValue;
    } catch (error) {
      console.warn(error);
      return initialValue;
    }
  });

  useEffect(() => {
    const onLocalStorageChange = ( e ) => {
      // console.log(`listener effect running for ${key}. Triggered by ${e.key}: ${e.newValue.substr(-4)}`);
      if (
        (e.storageArea === localStorage) &&
        (e.key === key) &&
        (e.oldValue !== e.newValue)
      ) {
        // console.log(`setting new value.`);
        setValue(JSON.parse(e.newValue));
      }
    };
    window.addEventListener('storage', onLocalStorageChange);

    return () => {
      window.removeEventListener('storage', onLocalStorageChange);
    };
  }, [key]);

  const setPersistedValue = useCallback((newState) => {
    //console.log(`setPersistedValue callback running. ${key}`);
    //const newStateValue = newState;
    try {
      localStorage.setItem(key, JSON.stringify(newState));
    } catch (error) {
      console.warn(error);
    }
    setValue(newState);
  }, [key, initialValue]);

  return [value, setPersistedValue];
};

export default useStateWithLocalStorage;
