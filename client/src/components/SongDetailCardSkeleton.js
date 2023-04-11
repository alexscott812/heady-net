import React from "react";
import Card from "./Card.js";
import CardBody from "./CardBody.js";
import { Skeleton } from "@chakra-ui/react";

const SongDetailCardSkeleton = ({ ...props }) => {
  return (
    <Card {...props}>
      <CardBody>
        <Skeleton h={4} w="50%" />
      </CardBody>
    </Card>
  );
};

export default SongDetailCardSkeleton;
