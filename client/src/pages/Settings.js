import React from 'react';
import PageContainer from '../components/PageContainer.js';
import useDocumentTitle from '../hooks/useDocumentTitle.js';
import { Outlet } from "react-router-dom";
import Card from "../components/Card.js";
import CardBody from "../components/CardBody.js";
import CardTitle from "../components/CardTitle.js";
import Grid from "../components/Grid.js";
import GridItem from "../components/GridItem.js";
import SettingsNavSidebar from '../components/SettingsNavSidebar.js';

const Settings = () => {
  useDocumentTitle('Settings | shakedown');

  return (
    <>
      <PageContainer>
        <Card>
          <CardBody>
            <CardTitle>Settings</CardTitle>
            <Grid>
              <GridItem colSpan={[12,12,4,3]}>
                <SettingsNavSidebar />
              </GridItem>
              <GridItem colSpan={[12,12,8,9]}>
                <Outlet />
              </GridItem>
            </Grid>
          </CardBody>
        </Card>
      </PageContainer>
    </>
  );
};

export default Settings;
