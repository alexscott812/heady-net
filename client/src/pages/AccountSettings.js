import React, { useState } from "react";
import CardTitle from "../components/CardTitle.js";
import EmptyState from "../components/EmptyState.js";
import { Link as RouterLink } from 'react-router-dom';
import {
  Text,
  Divider,
  Input,
  Box,
  Button,
  Link
} from '@chakra-ui/react';
import { useAuth } from "../lib/auth";
import useToast from "../hooks/useToast";
import { FaKey, FaTrashAlt } from "react-icons/fa";

const AccountSettings = ({ onShowDeleteAccountModal = null }) => {
  const createToast = useToast();
  const { isAuthenticated, getToken, changePassword } = useAuth();
  const [passwords, setPasswords] = useState({
    old_password: '',
    new_password: '',
    confirm_new_password: ''
  });

  const validate = () => {
    return passwords?.old_password.length > 0 &&
      passwords?.new_password.length > 0 &&
      passwords?.confirm_new_password.length > 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPasswords({
      ...passwords,
      [name]: value
    });
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    if (!validate()) return;
    changePassword.mutate({
      passwords, 
      tokenFn: getToken
    }, {
      onSuccess: () => createToast({
        id: 'change-password-success',
        status: 'success',
        message: 'Password changed!'
    }),
      onError: (data) => createToast({
        id: 'change-password-error',
        status: 'error',
        message: data
      })
    });
  };

  return (
    <>
      {isAuthenticated
        ? <>
            <Box mb={10}>
              <CardTitle>Change Password</CardTitle>
              <Divider mb={3} />
              <Text mb={1}>Old password</Text>
              <Input
                type="password"
                name="old_password"
                placeholder="Old password"
                value={passwords?.old_password}
                onChange={handleInputChange}
                mb={3}
              />
              <Text mb={1}>New password</Text>
              <Input
                type="password"
                name="new_password"
                placeholder="New password"
                value={passwords?.new_password}
                onChange={handleInputChange}
                mb={3}
              />
              <Text mb={1}>Confirm new password</Text>
              <Input
                type="password"
                name="confirm_new_password"
                placeholder="Confirm new password"
                value={passwords?.confirm_new_password}
                onChange={handleInputChange}
                mb={3}
              />
              <Box mb={3}>
                <Link as={RouterLink} to="/auth/forgot-password" variant="brand">
                  Forgot Password?
                </Link>
              </Box>
              <Button
                colorScheme="gray"
                leftIcon={<FaKey />}
                onClick={handleChangePassword}
                isLoading={changePassword.isLoading}
                loadingText="Changing Password..."
                isDisabled={changePassword.isLoading || !validate()}
              >
                Change Password
              </Button>
            </Box>
            <Box>
              <CardTitle>Deactivate Account</CardTitle>
              <Divider mb={3} />
              <Text mb={3}>Are you sure you want to deactivate your account?</Text>
              <Button
                variant="solid"
                colorScheme="red"
                onClick={onShowDeleteAccountModal}
                leftIcon={<FaTrashAlt />}
              >
                Deactivate Account
              </Button>
            </Box>
          </>
        : <EmptyState />
      }
    </>
  );
};

export default AccountSettings;