import { useRef, useEffect, useCallback } from 'react';

const useInfiniteScroll = ( isLoading, enabled, onLoadMore ) => {

  const observerRef = useRef(null);
  const nodeRef = useRef(null);

  const observe = useCallback(() => {
    if (!enabled) {
      return;
    }
    const node = nodeRef.current;
    if (node) {
      const observer = new IntersectionObserver(([newEntry]) => {
        if (newEntry.isIntersecting && enabled) {
          console.log('triggered!');
          onLoadMore();
        }
      });
      observer.observe(node);
      observerRef.current = observer;
    }
  }, [enabled, onLoadMore]);

  const unobserve = useCallback(() => {
    if (observerRef.current) {
      observerRef.current.disconnect();
      observerRef.current = null;
    }
  }, []);

  const initializeObserver = useCallback(() => {
    unobserve();
    observe();
  }, [observe, unobserve]);

  const refCallback = useCallback((node) => {
    nodeRef.current = node;
    initializeObserver();
  }, [initializeObserver]);

  useEffect(() => {
    return () => unobserve();
  }, [unobserve]);

  return refCallback;
};

export default useInfiniteScroll;
