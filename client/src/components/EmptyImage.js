import React from "react";
import { Box, Icon, useColorModeValue } from "@chakra-ui/react";
import { FaBolt } from "react-icons/fa";

const EmptyImage = ({ h = "100px", w = "100%", ...restProps }) => {
  return (
    <Box
      d="flex"
      justifyContent="center"
      alignItems="center"
      overflow="hidden"
      bg={useColorModeValue("gray.100", "whiteAlpha.200")}
      h={h}
      w={w}
      {...restProps}
    >
      <Icon
        as={FaBolt}
        boxSize={12}
        color={useColorModeValue("gray.300", "whiteAlpha.400")}
      />
    </Box>
  );
};

export default EmptyImage;
