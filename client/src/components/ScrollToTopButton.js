import React, { useState, useEffect } from 'react';
import { IconButton, Fade } from '@chakra-ui/react';
import { FaChevronUp } from 'react-icons/fa';

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const scrollHandler = () => {
      setIsVisible(window.scrollY > 400 ? true : false);
    };

    window.addEventListener('scroll', scrollHandler);
    return () => {
      window.removeEventListener('scroll', scrollHandler)
    };
  }, []);

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    // <Fade in={isVisible}>
    <>
      {isVisible && (
        <IconButton
          borderRadius="full"
          aria-label="Scroll to top"
          icon={<FaChevronUp />}
          colorScheme="brand"
          boxShadow="xl"
          onClick={handleScrollToTop}
          position="fixed"
          bottom={4}
          right={4}
          zIndex={3}
        />
      )}
    </>

      
    // </Fade>
  );
}

export default ScrollToTopButton;
