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
import AvatarButton from './AvatarButton.js';
import { Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../lib/auth';
import useUser from '../hooks/queries/useUser.js';
import getRelativeTime from '../utils/get-relative-time.js';

const UserDetailPopover = ({
  userId = null,
  onOpen,
  onClose,
  children,
  ...restProps
}) => {
  const { user } = useAuth();
  const {
    data,
    isLoading
  } = useUser(userId, {
    enabled: !!userId
  });

  return (
    <Popover
      trigger="hover"
      placement="bottom-start"
      isLazy
      onOpen={onOpen}
      onClose={onClose}
      {...restProps}
    >
      <PopoverTrigger>{children}</PopoverTrigger>
      <PopoverContent>
        <PopoverBody>
          {isLoading && (
            <HStack align="start">
              <SkeletonCircle size={12} />
              <VStack align="start" spacing={1} flex={1}>
                <Skeleton h={4} w="40%" />
                <Skeleton h={4} w="60%" />
                <Skeleton h={4} w="50%" />
              </VStack>
            </HStack>
          )}
          {data && (
            <HStack align="start">
              <AvatarButton
                as={RouterLink}
                to={`/users/${data._id}`}
                size="md"
                name={`${data.first_name} ${data.last_name}`}
              />
              <VStack align="start" spacing={0}>
                <Link
                  // fontSize="lg"
                  fontWeight="semibold"
                  as={RouterLink}
                  to={`/users/${data._id}`}
                >
                  {(data._id === user?._id)
                    ? `${data.first_name} ${data.last_name} (you)`
                    : `${data.first_name} ${data.last_name.charAt(0)}.`
                  }
                </Link>
                <Text fontSize="sm" variant="secondary">
                  {`Joined ${getRelativeTime(data.created_at)}`}
                </Text>
                <Text fontSize="sm" variant="secondary">
                  {`${data.review_count} show reviews`}
                </Text>
              </VStack>
            </HStack>
          )}
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default UserDetailPopover;