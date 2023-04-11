import React from "react";
import Card from "./Card.js";
import CardBody from "./CardBody.js";
import CardTitle from "./CardTitle.js";
import CardIcon from "./CardIcon.js";
import { Skeleton, Stack, Box } from "@chakra-ui/react";
import { FaCalendarDay } from "react-icons/fa";

const TodaysShowsCardSkeleton = ({ ...props }) => {
  return (
    <Card {...props}>
      <CardBody>
        <Stack
          direction={{ base: "row", lg: "column" }}
          spacing={4}
          align="flex-start"
        >
          <CardIcon icon={FaCalendarDay} transform="rotate(10deg)" />
          <Box flex={1} w="100%">
            <CardTitle>Today in History</CardTitle>
            <Stack>
              <Skeleton h={5} w="100%" />
              <Skeleton h={5} w="100%" />
              <Skeleton h={5} w="60%" />
            </Stack>
          </Box>
        </Stack>
      </CardBody>
    </Card>
  );
};

export default TodaysShowsCardSkeleton;
