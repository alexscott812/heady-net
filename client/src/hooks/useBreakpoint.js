import { useState, useEffect, useMemo } from 'react';
import debounce from '../utils/debounce.js';

const useBreakpoint = () => {

  // const getBreakpoint = ( width ) => {
  //   if (width === undefined) {
  //     return undefined;
  //   } else if ( width < 576 ) {
  //     return 'xs';
  //   } else if ( width >= 576 && width < 768 ) {
  //     return 'sm';
  //   } else if ( width >= 768 && width < 992 ) {
  //     return 'md';
  //   } else if ( width >= 992 && width < 1200 ) {
  //     return 'lg';
  //   } else if ( width >= 1200 && width < 1400 ) {
  //     return 'xl';
  //   } else if ( width >= 1400 ) {
  //     return 'xxl';
  //   }
  // };

  const getBreakpoint = ( width ) => {
  	if (typeof width !== 'number') return undefined;
    if ( width < 576 ) return 'xs';
    if ( width >= 576 && width < 768 ) return 'sm';
    if ( width >= 768 && width < 992 ) return 'md';
    if ( width >= 992 && width < 1200 ) return 'lg';
    if ( width >= 1200 && width < 1400 ) return 'xl';
    if ( width >= 1400 ) return 'xxl';
  };

  const isWindowClient = typeof window === 'object';
  const [breakpoint, setBreakpoint] = useState(() => {
    return getBreakpoint(isWindowClient ? window.innerWidth : undefined)
  });

  useEffect(() => {
    const handleWindowResize = debounce(() => {
      setBreakpoint(getBreakpoint(window.innerWidth));
    }, 100);

    if (isWindowClient) {
      window.addEventListener('resize', handleWindowResize);
      return () => window.removeEventListener('resize', handleWindowResize);
    };
  }, [isWindowClient]);

  return useMemo(() => {
    return {
      breakpoint,
      isXsScreen: breakpoint === 'xs',
      isSmScreen: breakpoint === 'sm',
      isMdScreen: breakpoint === 'md',
      isLgScreen: breakpoint === 'lg',
      isXlScreen: breakpoint === 'xl',
      isXxlScreen: breakpoint === 'xxl'
    };
  }, [breakpoint]);

}

export default useBreakpoint;
