import React, { useState } from "react";
import {
  Alert,
  AlertIcon,
  Button,
  Input,
  Text,
  GridItem,
} from "@chakra-ui/react";
import Grid from "../components/Grid";
import Card from "../components/Card.js";
import CardTitle from "../components/CardTitle.js";
import CardBody from "../components/CardBody.js";
import PageContainer from "../components/PageContainer.js";
import { Navigate } from "react-router-dom";
import useQueryParams from "../hooks/useQueryParams.js";
import { useAuth } from "../lib/auth";
import useDocumentTitle from "../hooks/useDocumentTitle.js";
import { useMutation } from "react-query";

const ResetPassword = () => {
  useDocumentTitle("Reset Password | shakedown");

  const [query] = useQueryParams();
  const [passwords, setPasswords] = useState({
    new_password: "",
    confirm_new_password: "",
  });

  const { isAuthenticated, resetPassword } = useAuth();

  const mutation = useMutation((data) => resetPassword(data));

  const validateForm = () => {
    return (
      passwords.new_password.length > 0 &&
      passwords.confirm_new_password.length > 0
    );
  };

  const handleInputChange = (e) => {
    setPasswords({
      ...passwords,
      [e.target.name]: e.target.value,
    });
  };

  const handleResetPasswordSubmit = (e) => {
    if (!validateForm) return;
    mutation.mutate({
      passwords,
      token: query.token,
    });
  };

  return (
    <>
      {isAuthenticated ? (
        <Navigate to="/" />
      ) : (
        <PageContainer>
          <Grid>
            <GridItem colStart={[1, 1, 4, 5]} colSpan={[12, 12, 6, 4]}>
              <Card>
                <CardBody>
                  <CardTitle>Reset Password</CardTitle>
                  {!mutation.isSuccess ? (
                    <>
                      <Text mb={1}>New Password</Text>
                      <Input
                        mb={3}
                        type="password"
                        name="new_password"
                        value={passwords.new_password}
                        placeholder="New Password"
                        onChange={handleInputChange}
                      />
                      <Text mb={1}>Confirm New Password</Text>
                      <Input
                        mb={3}
                        type="password"
                        name="confirm_new_password"
                        value={passwords.confirm_new_password}
                        placeholder="Confirm New Password"
                        onChange={handleInputChange}
                      />
                      {mutation.isError && (
                        <Alert status="error" variant="left-accent" mb={3}>
                          <AlertIcon />
                          {mutation.error}
                        </Alert>
                      )}
                      <Button
                        variant="solid"
                        colorScheme="brand"
                        isLoading={mutation.isLoading}
                        loadingText="Reseting Password..."
                        isDisabled={!validateForm() || mutation.isLoading}
                        isFullWidth
                        onClick={handleResetPasswordSubmit}
                      >
                        Reset Password
                      </Button>
                    </>
                  ) : (
                    <Alert status="success" variant="left-accent" mb={3}>
                      <AlertIcon />
                      Password changed successfully!
                    </Alert>
                  )}
                </CardBody>
              </Card>
            </GridItem>
          </Grid>
        </PageContainer>
      )}
    </>
  );
};

export default ResetPassword;
