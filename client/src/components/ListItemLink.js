import React from "react";
import { ListItem, LinkBox, LinkOverlay } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const ListItemLink = ({ name, to, ...restProps }) => {
  return (
    <LinkBox
      as={ListItem}
      d="block"
      py={2}
      _hover={{ textDecoration: "underline" }}
      {...restProps}
    >
      <LinkOverlay as={Link} to={to}>
        {name}
      </LinkOverlay>
    </LinkBox>
  );
};

export default ListItemLink;
