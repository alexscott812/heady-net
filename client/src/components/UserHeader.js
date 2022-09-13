import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Button, Text, Stack, Avatar, VStack } from '@chakra-ui/react';
import Card from './Card.js';
import CardBody from './CardBody.js';
import CardTitle from './CardTitle.js';
import { FaPen, FaCog } from 'react-icons/fa';
import { useAuth } from '../lib/auth';
import getRelativeTime from '../utils/get-relative-time.js';

const UserHeader = ({
  user = null,
  onShowEditUserButtonClick = null
}) => {
  const { user: currentUser } = useAuth();

  return (
    <Card>
      <CardBody>
        <VStack align="start" spacing={0}>
          <Avatar size="lg" name={`${user.first_name}`} mb={3} />
          <CardTitle mb={0}>
            {(user._id === currentUser?._id)
              ? `${user.first_name} ${user.last_name} (you)`
              : `${user.first_name} ${user.last_name.charAt(0)}.`
            }
          </CardTitle>
          <Text variant="secondary">{`Joined ${getRelativeTime(user.created_at)}`}</Text>
          <Text variant="secondary">{`${user.review_count} show reviews`}</Text>
        </VStack>
        {(user._id === currentUser?._id) && (
          <Stack direction="column" mt={3}>
            <Button
              variant="solid"
              colorScheme="gray"
              onClick={onShowEditUserButtonClick}
              leftIcon={<FaPen />}
            >
              Edit Profile
            </Button>
            <Button
              as={RouterLink}
              to="/settings"
              colorScheme="gray"
              leftIcon={<FaCog />}
              mt={3}
            >
              Settings
            </Button>
          </Stack>
        )}
      </CardBody>
    </Card>
  );
};

export default UserHeader;