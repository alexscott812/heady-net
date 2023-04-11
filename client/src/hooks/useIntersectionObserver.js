// import React, { useEffect } from 'react';
//
// const useIntersectionObserver = ({
//   root,
//   target,
//   onIntersect,
//   threshold = 1.0,
//   rootMargin = '0px',
//   enabled = true,
// }) => {
//
//   useEffect(() => {
//     console.log(target.current);
//     if (!enabled) {
//       return;
//     };
//
//     const observer = new IntersectionObserver(( [newEntry] ) => {
//       console.log('running!');
//       console.log(newEntry.isIntersecting);
//       if (newEntry.isIntersecting) {
//         console.log('intersecting!');
//         onIntersect();
//       }
//     });
//
//     const element = target && target.current;
//
//     if (!element) {
//       return;
//     };
//
//     observer.observe(element);
//
//     return () => {
//       observer.unobserve(element);
//     };
//
//   }, [target.current, enabled]);
// }
//
// export default useIntersectionObserver;

import { useEffect, useRef } from "react";

const useIntersectionObserver = ({ onIntersect, enabled = true }) => {
  const target = useRef(null);

  useEffect(() => {
    console.log(target.current);
    if (!enabled) return;

    const observer = new IntersectionObserver(([newEntry]) => {
      console.log("running!");
      console.log(newEntry.isIntersecting);
      if (newEntry.isIntersecting) {
        console.log("intersecting!");
        onIntersect();
      }
    });

    const element = target && target.current;

    if (!element) return;

    observer.observe(element);

    return () => observer.unobserve(element);
  }, [target.current, enabled]);

  return target;
};

export default useIntersectionObserver;
