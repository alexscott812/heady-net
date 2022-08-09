import React, { useState } from 'react';
import { Alert, AlertIcon, Box, Button, Input, Link, Divider, Text, GridItem } from "@chakra-ui/react";
import Grid from '../components/Grid';
import Card from '../components/Card.js';
import CardTitle from '../components/CardTitle.js';
import CardBody from '../components/CardBody.js';
import PageContainer from '../components/PageContainer.js';
import { Link as RouterLink, Navigate } from 'react-router-dom';
import { useAuth } from '../lib/auth';
import useQueryParams from '../hooks/useQueryParams.js';
import useDocumentTitle from '../hooks/useDocumentTitle.js';
import { useMutation } from 'react-query';

const Register = () => {
  useDocumentTitle('Register | HeadyNet');

  const { register, isAuthenticated } = useAuth();
  const [query] = useQueryParams(['redirect']);
  const [userInfo, setUserInfo] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    confirm_password: ''
  });

  const mutation = useMutation((data) => register(data));

  const validateForm = () => {
    return userInfo.first_name.length > 0 &&
      userInfo.last_name.length > 0 &&
      userInfo.email.length > 0 &&
      userInfo.password.length > 0 &&
      userInfo.confirm_password.length > 0;
  };

  const handleInputChange = ( e ) => {
    e.preventDefault();
    setUserInfo({
      ...userInfo,
      [e.target.name]: e.target.value
    });
  };

  const handleRegisterSubmit = ( e ) => {
    e.preventDefault();
    if (!validateForm()) return;
    postRegisterInfo();
  };

  const postRegisterInfo = async () => {
    mutation.mutate({ userInfo });
  };

  return (
    <>
      {isAuthenticated
        ? <Navigate to="/" />
        : <PageContainer>
            <Grid>
              <GridItem colStart={[1,1,4,5]} colSpan={[12,12,6,4]}>
                <Card>
                  <CardBody>
                    <CardTitle>Register</CardTitle>
                    <Input
                      mb={3}
                      type="first_name"
                      name="first_name"
                      value={userInfo.first_name}
                      placeholder="First Name"
                      onChange={handleInputChange}
                    />
                    <Input
                      mb={3}
                      type="last_name"
                      name="last_name"
                      value={userInfo.last_name}
                      placeholder="Last Name"
                      onChange={handleInputChange}
                    />
                    <Input
                      mb={3}
                      type="email"
                      name="email"
                      value={userInfo.email}
                      placeholder="Email Address"
                      onChange={handleInputChange}
                    />
                    <Input
                      mb={3}
                      type="password"
                      name="password"
                      value={userInfo.password}
                      placeholder="Password"
                      onChange={handleInputChange}
                    />
                    <Input
                      mb={3}
                      type="password"
                      name="confirm_password"
                      value={userInfo.confirm_password}
                      placeholder="Confirm Password"
                      onChange={handleInputChange}
                    />
                    {mutation.isError && (
                      <Alert status="error" mb={3}>
                        <AlertIcon />
                        {mutation.error}
                      </Alert>
                    )}
                    <Button
                      variant="solid"
                      colorScheme="brand"
                      isLoading={mutation.isLoading}
                      loadingText="Registering..."
                      isDisabled={!validateForm() || mutation.isLoading}
                      isFullWidth
                      onClick={handleRegisterSubmit}
                    >
                      Register
                    </Button>
                    <Divider my={3} />
                    <Box>
                      <Text>
                        {'Already have an account? '}
                        <Link
                          as={RouterLink}
                          to={query.redirect
                            ? `/auth/login?redirect=${encodeURIComponent(query.redirect)}`
                            : '/auth/login'
                          }
                        >
                          Log In
                        </Link>
                      </Text>
                    </Box>
                  </CardBody>
                </Card>
              </GridItem>
            </Grid>
          </PageContainer>
      }
    </>
  );
};

export default Register;
