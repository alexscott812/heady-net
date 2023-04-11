import React from "react";
import { Grid as ChakraGrid } from "@chakra-ui/react";

const Grid = ({ children, ...restProps }) => {
  return (
    <ChakraGrid templateColumns="repeat(12, 1fr)" gap={4} {...restProps}>
      {children}
    </ChakraGrid>
  );
};

export default Grid;
