import React, { useState } from 'react';
import { Alert, AlertIcon, Button, Input, Text, GridItem } from "@chakra-ui/react";
import Grid from '../components/Grid';
import Card from '../components/Card.js';
import PageContainer from '../components/PageContainer.js';
import CardBody from '../components/CardBody.js';
import CardTitle from '../components/CardTitle.js';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../lib/auth';
import useDocumentTitle from '../hooks/useDocumentTitle.js';
import { useMutation } from 'react-query';

const ForgotPassword = () => {
  useDocumentTitle('Forgot Password | HeadyNet');

  const [email, setEmail] = useState('');
  const { isAuthenticated, forgotPassword } = useAuth();
  const mutation = useMutation(( data ) => forgotPassword(data));

  const validateForm = () => {
    return email.length > 0;
  };

  const handleInputChange = ( e ) => {
    e.preventDefault();
    setEmail(e.target.value);
  };

  const handleResetPasswordSubmit = ( e ) => {
    e.preventDefault();
    if (!validateForm) return;
    postResetPasswordRequest();
  };

  const postResetPasswordRequest = async () => {
    mutation.mutate({ email });
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
                    <CardTitle>Forgot Password</CardTitle>
                    {!mutation.isSuccess
                      ? <>
                          <Text mb={2}>
                            We will send you an email so you can reset your password.
                          </Text>
                          <Input
                            mb={3}
                            type="email"
                            name="email"
                            value={email}
                            placeholder="Email Address"
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
                            loadingText="Sending Email..."
                            isDisabled={!validateForm() || mutation.isLoading}
                            isFullWidth
                            onClick={handleResetPasswordSubmit}
                          >
                            Send Email
                          </Button>
                        </>
                      : <>
                          <Alert status="success" mb={3}>
                            <AlertIcon />
                            Email Sent!
                          </Alert>
                          <Text>Please check your email for a link to reset your password.</Text>
                        </>
                    }
                  </CardBody>
                </Card>
              </GridItem>
            </Grid>
          </PageContainer>
      }
    </>
  );
};

export default ForgotPassword;
