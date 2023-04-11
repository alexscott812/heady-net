import React from "react";
import { Box } from "@chakra-ui/react";

const CardBody = ({ children, ...restProps }) => {
  return (
    <Box p={4} {...restProps}>
      {children}
    </Box>
  );
};

export default CardBody;
