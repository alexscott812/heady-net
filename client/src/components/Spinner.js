import React from "react";
import { Collapse, Center, Spinner as ChakraSpinner } from "@chakra-ui/react";

const Spinner = ({ isShowing = false }) => {
  return (
    <Collapse in={isShowing} animateOpacity>
      <Center mb={6}>
        <ChakraSpinner />
      </Center>
    </Collapse>
  );
};

export default Spinner;
