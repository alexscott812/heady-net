import React from "react";
import { Box, Container, useStyleConfig } from "@chakra-ui/react";

const PageHead = ({ children }) => {
  return (
    <Box __css={useStyleConfig("PageHead")}>
      <Container>{children}</Container>
    </Box>
  );
};

export default PageHead;
