import React from "react";
import CardTitle from './CardTitle';
import {
  Text,
  Divider,
  Input,
  Textarea,
  Button
} from '@chakra-ui/react';
import EmptyState from './EmptyState.js';
import { useAuth } from "../lib/auth";
import { FaPen } from "react-icons/fa";

const ProfileSettings = () => {
  const { isAuthenticated } = useAuth();

  return (
    <>
      {isAuthenticated
        ? <>
            <CardTitle>Profile</CardTitle>
            <Divider mb={3} />
            <Text mb={1}>First name</Text>
            <Input
              type="text"
              name="first_name"
              placeholder="First name"
              value={''}
              //onChange={handleInputChange}
              mb={3}
            />
            <Text mb={1}>Last name</Text>
            <Input
              type="text"
              name="last_name"
              placeholder="Last name"
              value={''}
              //onChange={handleInputChange}
              mb={3}
            />
            <Text mb={1}>Bio</Text>
            <Textarea
              placeholder="Enter a bit about yourself"
              mb={3}
            />
            <Button
              leftIcon={<FaPen />}
              // onClick={handleChangePassword}
              // isLoading={changePassword.isLoading}
              // loadingText="Changing Password..."
              // isDisabled={changePassword.isLoading || !validate()}
            >
              Update Profile
            </Button>
          </>
        : <EmptyState />
      }
    </>
  );
};

export default ProfileSettings;