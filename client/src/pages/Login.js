import React, { useState } from 'react';
import { Alert, AlertIcon, Box, Button, Input, Link, Divider, Text, GridItem } from "@chakra-ui/react";
import Grid from '../components/Grid';
import Card from '../components/Card.js';
import CardTitle from '../components/CardTitle.js';
import CardBody from '../components/CardBody.js';
import PageContainer from '../components/PageContainer.js';
import { Link as RouterLink, Navigate } from 'react-router-dom';
import useQueryParams from '../hooks/useQueryParams.js';
import { useAuth } from '../lib/auth';
import useDocumentTitle from '../hooks/useDocumentTitle.js';
// import useCustomBodyStyles from '../hooks/useCustomBodyStyles.js';
import useLogin from '../hooks/mutations/useLogin.js';

const Login = () => {
  useDocumentTitle('Login | HeadyNet');
  const { isAuthenticated, login } = useAuth();
  const [query] = useQueryParams(['redirect']);
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });

  // const login = useLogin();

  const validateForm = () => {
    return credentials.email.length > 0 &&
      credentials.password.length > 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials({
      ...credentials,
      [name]: value
    });
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (!validateForm) return;
    login.mutate({
      email: credentials.email,
      password: credentials.password,
      opts: {
        redirectTo: query.redirect || '/'
      }
    });
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
                    <CardTitle>Log In</CardTitle>
                    <Input
                      mb={3}
                      type="email"
                      name="email"
                      value={credentials.email}
                      placeholder="Email Address"
                      onChange={handleInputChange}
                    />
                    <Input
                      mb={2}
                      type="password"
                      name="password"
                      value={credentials.password}
                      placeholder="Password"
                      onChange={handleInputChange}
                    />
                    <Box mb={2}>
                      <Link as={RouterLink} to="/auth/forgot-password">
                        Forgot Password?
                      </Link>
                    </Box>
                    {login.isError && (
                      <Alert status="error" mb={3}>
                        <AlertIcon />
                        {login.error}
                      </Alert>
                    )}
                    <Button
                      variant="solid"
                      colorScheme="brand"
                      isLoading={login.isLoading}
                      loadingText="Logging in..."
                      isDisabled={!validateForm() || login.isLoading}
                      isFullWidth
                      onClick={handleLoginSubmit}
                    >
                      Log In
                    </Button>
                    <Divider my={3} />
                    <Box>
                      <Text>
                        {`Don't have an account? `}
                        <Link
                          as={RouterLink}
                          to={query.redirect
                            ? `/auth/register?redirect=${encodeURIComponent(query.redirect)}`
                            : '/auth/register'
                          }
                        >
                          Sign Up
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

export default Login;
