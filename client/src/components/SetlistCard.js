import React from "react";
import Card from "./Card.js";
import CardBody from "./CardBody.js";
import CardTitle from "./CardTitle.js";
import { Link as RouterLink } from "react-router-dom";
import { Box, Text, Link, chakra } from "@chakra-ui/react";
import romanize from "../utils/romanize.js";

const SetlistCard = ({ sets = [], ...restProps }) => {
  return (
    <Card {...restProps}>
      <CardBody>
        <CardTitle>Setlist</CardTitle>
        {sets.length > 0 ? (
          <>
            {sets.map((set, i, setArr) => (
              <Box key={set._id} mb={setArr[i + 1] ? 3 : 0}>
                <Text as="b">{`${romanize(i + 1)}. `}</Text>
                {set.song_instances.map((songInstance, j, songInstanceArr) => (
                  <chakra.span key={songInstance._id}>
                    <Link
                      as={RouterLink}
                      to={`/songs/${songInstance.song._id}`}
                    >
                      {songInstance.song.name}
                    </Link>
                    {songInstanceArr[j + 1] && (
                      <Text d="inline">
                        {songInstance.segued ? " > " : ", "}
                      </Text>
                    )}
                  </chakra.span>
                ))}
              </Box>
            ))}
          </>
        ) : (
          <Text>There is no setlist data.</Text>
        )}
      </CardBody>
    </Card>
  );
};

export default SetlistCard;
