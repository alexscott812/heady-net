import React from "react";
import { Skeleton } from "@chakra-ui/react";

const ShowImageHeaderSkeleton = ({ h = 48 }) => {
  return (
    <Skeleton
      h={h}
      w="100%"
      position="absolute"
      zIndex="hide"
      borderRadius="none"
    />
  );
};

export default ShowImageHeaderSkeleton;
