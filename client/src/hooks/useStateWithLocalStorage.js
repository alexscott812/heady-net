import { useState, useEffect, useCallback } from 'react';

const useStateWithLocalStorage = (key, initialValue) => {
  const [value, setValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item || initialValue;
    } catch (error) {
      console.warn(error);
      return initialValue;
    }
  });

  useEffect(() => {
    const onLocalStorageChange = (e) => {
      if (
        (e.storageArea === localStorage) &&
        (e.key === key) &&
        (e.oldValue !== e.newValue)
      ) {
        setValue(e.newValue);
      }
    };
    window.addEventListener('storage', onLocalStorageChange);
    return () => {
      window.removeEventListener('storage', onLocalStorageChange);
    };
  }, [key]);

  const setPersistedValue = useCallback((newState) => {
    try {
      localStorage.setItem(key, newState);
    } catch (error) {
      console.warn(error);
    }
    setValue(newState);
  }, [key]);

  return [value, setPersistedValue];
};

export default useStateWithLocalStorage;
