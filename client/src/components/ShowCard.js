import React from 'react';
import Card from './Card.js';
import CardBody from './CardBody.js';
import CardFooter from './CardFooter.js';
import { Flex, LinkBox, LinkOverlay, Text, Image } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import StarRating from './StarRating.js';
import EmptyImage from './EmptyImage.js';

const ShowCard = ({
  id,
  image,
  title,
  venue,
  location,
  avgRating,
  reviewCount
}) => {
  return (
    <LinkBox as={Card}>
      {image
        ? <Image
            src={image}
            objectFit="cover"
            height="150px"
            width="100%"
            //fallback={<Skeleton h="150px" borderRadius="none" />}
            fallback={<EmptyImage h="150px" w="100%" />}
          />
        : <EmptyImage h="150px" w="100%" />
      }
      <CardBody>
        <LinkOverlay
          as={Link}
          to={`/shows/${id}`}
          _hover={{ textDecoration: 'underline' }}
        >
          <Text fontWeight="semibold" fontSize="lg">{title}</Text>
        </LinkOverlay>
        <Text>{venue}</Text>
        <Text variant="secondary">{location}</Text>
        {/*<Flex mt={2}>
          <StarRating
            rating={ 1 }
            numberOfStars={ 1 }
            editable={ false }
          />
          <Text pl={2}>{ avgRating }</Text>
          <Text pl={1} color={ 'gray.500' }>
            { `(${reviewCount})` }
          </Text>
        </Flex>*/}
      </CardBody>
      <CardFooter>
        <Flex>
          <StarRating
            rating={avgRating}
            numberOfStars={1}
            editable={false}
            mr={2}
          />
          <Text fontWeight="semibold" mr={1}>{avgRating}</Text>
          <Text variant="secondary">{`(${reviewCount})`}</Text>
        </Flex>
      </CardFooter>
    </LinkBox>
  );
};

export default ShowCard;
