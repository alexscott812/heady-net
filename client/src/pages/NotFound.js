import React from 'react';
import { Link } from 'react-router-dom';
import useDocumentTitle from '../hooks/useDocumentTitle.js';
import { Button, Text, Heading, GridItem } from "@chakra-ui/react";
import Grid from '../components/Grid';
import PageContainer from '../components/PageContainer.js';
import Card from '../components/Card.js';
import CardBody from '../components/CardBody.js';

const NotFound = () => {
  useDocumentTitle('Page Not Found | HeadyNet');

  return (
    <PageContainer>
      <Grid>
        <GridItem colStart={[1,1,4,5]} colSpan={[12,12,6,4]}>
          <Card>
            <CardBody>
              <Heading
                as="h1"
                size="2xl"
                mb={3}
                fontWeight="extrabold"
                letterSpacing="tight"
                textAlign="center"
              >
                Oops!
              </Heading>
              <Text align="center" mb={3}>
                The page you are looking for doesn't exist.
              </Text>
              <Button
                isFullWidth
                variant="solid"
                colorScheme="brand"
                as={Link}
                to="/"
              >
                Go Home
              </Button>
            </CardBody>
          </Card>
        </GridItem>
      </Grid>
    </PageContainer>
  );
};

export default NotFound;
