import React, { useState, useEffect } from 'react';
import { Button, Flex, Text, useDisclosure } from '@chakra-ui/react';
import Grid from '../components/Grid.js';
import GridItem from '../components/GridItem.js';
import { useParams } from 'react-router-dom';
import EmptyState from '../components/EmptyState.js';
import PageContainer from '../components/PageContainer.js';
import RecentActivity from '../components/RecentActivity.js';
import RecentActivitySkeleton from '../components/RecentActivitySkeleton.js';
import Spinner from '../components/Spinner.js';
import UserHeader from '../components/UserHeader.js';
import UserHeaderSkeleton from '../components/UserHeaderSkeleton.js';
import EditUserModal from '../components/EditUserModal.js';
import { useAuth } from '../lib/auth';
import useDocumentTitle from '../hooks/useDocumentTitle.js';
import useReviews from '../hooks/queries/useReviews.js';
import useUser from '../hooks/queries/useUser.js';

const UserDetail = () => {
  const { id } = useParams();
  const { user } = useAuth();

  const {
    isOpen: isEditUserModalOpen,
    onOpen: onEditUserModalOpen,
    onClose: onEditUserModalClose
  } = useDisclosure();

  const { data: userData, isLoading: userIsLoading } = useUser(id);

  const {
    data: recentActivityData,
    isLoading: recentActivityIsLoading,
    isRefetching: recentActivityIsRefetching,
    hasMore: hasMoreRecentActivity,
    loadMore: loadMoreRecentActivity,
    isLoadingMore: isLoadingMoreRecentActivity
  } = useReviews({ user_id: id, sort: '-created_at' }, { enabled: !!userData });

  const [userToBeEdited, setUserToBeEdited] = useState(userData);
  useEffect(() => setUserToBeEdited(userData), [userData]);

  useDocumentTitle(
    `${
      userData
        ? userData._id === user?._id
          ? `${userData.first_name} ${userData.last_name}`
          : `${userData.first_name} ${userData.last_name.charAt(0)}.`
        : 'User Detail'
    } | shakedown`
  );

  return (
    <>
      <PageContainer>
        <Grid>
          <GridItem colSpan={[12, 12, 12, 8]}>
            {userIsLoading && <UserHeaderSkeleton mb={4} />}
            {userData && (
              <UserHeader
                user={userData}
                onShowEditUserButtonClick={onEditUserModalOpen}
                mb={4}
              />
            )}
            {(userIsLoading || userData) && (
              <Text variant="subtle-bold" mb={4}>
                Recent Activity
              </Text>
            )}
            <Spinner isShowing={recentActivityIsRefetching} />
            {(userIsLoading || (userData && recentActivityIsLoading)) && (
              <RecentActivitySkeleton />
            )}
            {userData && recentActivityData && (
              <>
                <RecentActivity recentActivity={recentActivityData} />
                {hasMoreRecentActivity && (
                  <Flex justify="center">
                    <Button
                      colorScheme="brand"
                      isLoading={isLoadingMoreRecentActivity}
                      loadingText="Loading More..."
                      isDisabled={isLoadingMoreRecentActivity}
                      onClick={loadMoreRecentActivity}
                    >
                      Load More
                    </Button>
                  </Flex>
                )}
              </>
            )}
          </GridItem>
          {/* {userIsLoading && (
            <>
              <GridItem colSpan={[12, 12, 12, 8]}>
                <UserHeaderSkeleton mb={4} />
                <Text variant="subtle-bold" mb={4}>
                  Recent Activity
                </Text>
                <RecentActivitySkeleton />
              </GridItem>
            </>
          )}
          {userData && (
            <>
              <GridItem colSpan={[12, 12, 12, 8]}>
                <UserHeader
                  user={userData}
                  onShowEditUserButtonClick={onEditUserModalOpen}
                  mb={4}
                />
                <Text variant="subtle-bold" mb={4}>
                  Recent Activity
                </Text>
                <Spinner isShowing={recentActivityIsRefetching} />
                {recentActivityIsLoading && <RecentActivitySkeleton />}
                {recentActivityData && (
                  <>
                    <RecentActivity recentActivity={recentActivityData} />
                    {hasMoreRecentActivity && (
                      <Flex justify="center">
                        <Button
                          colorScheme="brand"
                          isLoading={isLoadingMoreRecentActivity}
                          loadingText="Loading More..."
                          isDisabled={isLoadingMoreRecentActivity}
                          onClick={loadMoreRecentActivity}
                        >
                          Load More
                        </Button>
                      </Flex>
                    )}
                  </>
                )}
              </GridItem>
            </>
          )} */}
          {!userData && !userIsLoading && (
            <GridItem>
              <EmptyState />
            </GridItem>
          )}
        </Grid>
      </PageContainer>
      <EditUserModal
        isOpen={isEditUserModalOpen}
        userToBeEdited={userToBeEdited}
        setUserToBeEdited={setUserToBeEdited}
        onClose={() => {
          onEditUserModalClose();
          setUserToBeEdited(userData);
        }}
      />
    </>
  );
};

export default UserDetail;
