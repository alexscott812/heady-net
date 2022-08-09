import React from 'react';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  HStack,
  VStack,
  Skeleton,
  SkeletonCircle,
  Link,
  Text
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import useSong from '../hooks/queries/useSong.js';

const SongDetailPopover = ({
  songId = null,
  onOpen,
  onClose,
  children,
  ...restProps
}) => {
  const {
    data,
    isLoading
  } = useSong(songId, {
    enabled: !!songId
  });

  return (
    <Popover
      trigger="hover"
      placement="bottom-start"
      //isLazy
      onOpen={onOpen}
      onClose={onClose}
      {...restProps}
    >
      <PopoverTrigger>{children}</PopoverTrigger>
      <PopoverContent>
        <PopoverBody>
          {isLoading && (
            <HStack align="start">
              <VStack align="start" spacing={1} flex={1}>
                <Skeleton h={4} w="40%" />
                <Skeleton h={4} w="60%" />
                <Skeleton h={4} w="50%" />
              </VStack>
            </HStack>
          )}
          {data && (
            <HStack align="start">
              <VStack align="start" spacing={0}>
                <Link
                  fontWeight="semibold"
                  as={RouterLink}
                  to={`/songs/${data._id}`}
                >
                  {data.name}
                </Link>
                <Text fontSize="sm" variant="secondary">
                  {`Performed ${data.show_count} times`}
                </Text>
                {/* <Text fontSize="sm" variant="secondary">
                  {`${data.review_count} show reviews`}
                </Text> */}
              </VStack>
            </HStack>
          )}
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default SongDetailPopover;