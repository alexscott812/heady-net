import React from "react";
import { Image, Skeleton } from "@chakra-ui/react";

const ShowImageHeader = ({ imageUrl = null, h = 48 }) => {
  return (
    <Image
      src={imageUrl}
      objectFit="cover"
      h={h}
      w="100%"
      position="absolute"
      zIndex="hide"
      fallback={
        <Skeleton
          h={h}
          w="100%"
          position="absolute"
          zIndex="hide"
          borderRadius="none"
        />
      }
    />
  );
};

export default ShowImageHeader;
