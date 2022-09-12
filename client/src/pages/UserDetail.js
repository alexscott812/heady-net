import React, { useState } from 'react';
import { Container, Row, Col, Button, Spinner } from 'react-bootstrap';
import Alert from '../components/Alert.js';
import Toast from '../components/Toast.js';
import { useParams } from 'react-router-dom';
import RecentActivity from '../components/RecentActivity.js';
import RecentActivitySkeleton from '../components/RecentActivitySkeleton.js';
import UserHeader from '../components/UserHeader.js';
import UserHeaderSkeleton from '../components/UserHeaderSkeleton.js';
import EditUserModal from '../components/EditUserModal.js';
import ChangePasswordModal from '../components/ChangePasswordModal.js';
import DeleteUserModal from '../components/DeleteUserModal.js';
import useAuth from '../hooks/useAuth.js';
import useDocumentTitle from '../hooks/useDocumentTitle.js';
import { useQuery, useInfiniteQuery } from 'react-query';
import { getUserById } from '../services/userService.js';
import { getReviews } from '../services/reviewService.js';
// import { initialState, reducer } from '../state/reducers/userDetailReducer.js';
// import {
//   fetchUserInit,
//   fetchUserSuccess,
//   fetchUserError,
//   fetchRecentActivityInit,
//   fetchRecentActivitySuccess,
//   fetchRecentActivityError,
//   incrementRecentActivityPage,
//   resetRecentActivity
// } from '../state/actions/userDetailActions.js';

const UserDetail = () => {

  const { id } = useParams();
  const { user } = useAuth();

  // const [{
  //   user,
  //   isUserLoading,
  //   userError,
  //   recentActivity,
  //   recentActivityPage,
  //   recentActivityHasMore,
  //   isRecentActivityLoading,
  //   recentActivityError
  // }, dispatch] = useReducer(reducer, initialState);

  //const [recentActivityPage, setRecentActivityPage] = useState(1);
  //const [recentActivityHasMore, setRecentActivityHasMore] = useState(false);

  const [showRecentActivityErrorToast, setShowRecentActivityErrorToast] = useState(false);
  const [showEditUserModal, setShowEditUserModal] = useState(false);
  const [showDeleteUserModal, setShowDeleteUserModal] = useState(false);
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);

  const {
    data: userData,
    isLoading: userIsLoading,
    isError: userIsError,
    error: userError
  } = useQuery(['users', id], () => getUserById(id));

  const {
    data: recentActivityData,
    isLoading: recentActivityIsLoading,
    isRefetching: recentActivityIsRefetching,
    isError: recentActivityIsError,
    error: recentActivityError,
    hasNextPage: hasNextRecentActivityPage,
    fetchNextPage: fetchNextRecentActivityPage,
    isFetchingNextPage: isFetchingNextRecentActivityPage
  } = useInfiniteQuery(
    ['reviews', { user_id: id, sort: '-created_at' }],
    ({ pageParam = 1 }) => getReviews({
      user_id: id,
      page: pageParam,
      sort: '-created_at'
    }), {
      getNextPageParam: (lastPage, pages) => {
        return (lastPage.meta.current_page < lastPage.meta.total_pages)
          ? lastPage.meta.current_page + 1
          : false;
      },
      onError: () => {
        setShowRecentActivityErrorToast(true);
      }
    }
  );

  useDocumentTitle(
    userData
      ? (userData._id === user?._id)
        ? `${userData.first_name} ${userData.last_name} (you) | HeadyNet`
        : `${userData.first_name} ${userData.last_name.charAt(0)}. | HeadyNet`
      : 'User Detail | HeadyNet'
  );

  // useEffect(() => {
  //   dispatch(resetRecentActivity());
  // }, [id]);

  // useEffect(() => {
  //   let isSubscribed = true;
  //   const fetchUser = async () => {
  //     dispatch(fetchUserInit());
  //     try {
  //       const res = await getUserById(id);
  //       const user = await res.data;
  //       if (!isSubscribed) return;
  //       dispatch(fetchUserSuccess(user));
  //     } catch (err) {
  //       if (!isSubscribed) return;
  //       dispatch(fetchUserError(handleError(err)));
  //     }
  //   };
  //   fetchUser();
  //
  //   return () => isSubscribed = false;
  //
  // }, [id]);

  // useEffect(() => {
  //   let isSubscribed = true;
  //   const fetchRecentActivity = async () => {
  //     dispatch(fetchRecentActivityInit());
  //     try {
  //       const res = await getReviews({
  //         user_id: id,
  //         page: recentActivityPage,
  //         sort: '-created_at'
  //       });
  //       const { data, meta } = await res.data;
  //       if (isSubscribed) {
  //         dispatch(fetchRecentActivitySuccess(data, meta.current_page < meta.total_pages));
  //       }
  //     } catch (err) {
  //       if (isSubscribed) {
  //         dispatch(fetchRecentActivityError(handleError(err)));
  //       }
  //     }
  //   };
  //   fetchRecentActivity();
  //
  //   return () => isSubscribed = false;
  //
  // }, [id, recentActivityPage]);

  // const handleLoadMoreRecentActivity = () => {
  //   //dispatch(incrementRecentActivityPage());
  //   // setRecentActivityPage(recentActivityPage => recentActivityPage + 1);
  //   //setRecentActivityPage(recentActivityPage + 1);
  //   //incrementRecentActivityPage();
  //   fetchNextRecentActivityPage();
  // };

  // const handleShowEditUserModal = () => {
  //   setShowEditUserModal(true);
  // };
  //
  // const handleCloseEditUserModal = () => {
  //   setShowEditUserModal(false);
  // };

  const handleToggleEditUserModal = () => {
    setShowEditUserModal(!showEditUserModal);
  };

  // const handleShowChangePasswordModal = () => {
  //   setShowChangePasswordModal(true);
  // };
  //
  // const handleCloseChangePasswordModal = () => {
  //   setShowChangePasswordModal(false);
  // };

  const handleToggleChangePasswordModal = () => {
    setShowChangePasswordModal(!showChangePasswordModal);
  };

  // const handleShowDeleteUserModal = () => {
  //   setShowDeleteUserModal(true);
  // };
  //
  // const handleCloseDeleteUserModal = () => {
  //   setShowDeleteUserModal(false);
  // };

  const handleToggleDeleteUserModal = () => {
    setShowDeleteUserModal(!showDeleteUserModal);
  };

  const handleCloseRecentActivityErrorToast = () => {
    setShowRecentActivityErrorToast(false);
  };

  return (
    <>
      <Container className='py-3'>
        {
          userIsLoading &&
            <Row>
              <Col lg={4}>
                <UserHeaderSkeleton />
              </Col>
              <Col lg={8}>
                <div className="mb-3 d-flex align-items-center">
                  <div>
                    <h6 className='m-0 text-muted fw-bold'>{ 'RECENT ACTIVITY' }</h6>
                  </div>
                  <div className="ps-2 flex-grow-1"><hr className='m-0'/></div>
                </div>
                {/*<h6 className='mb-3 text-muted fw-bold'>{ 'RECENT ACTIVITY' }</h6>*/}
                <RecentActivitySkeleton />
              </Col>
            </Row>
        }
        {/*
          userIsError &&
            <Alert variant='danger'>
              { userError }
            </Alert>
        */}
        {
          userData &&
            <Row>
              <Col lg={4}>
                <UserHeader
                  user={ userData }
                  handleShowEditUserModal={ handleToggleEditUserModal }
                  handleShowChangePasswordModal={ handleToggleChangePasswordModal }
                  handleShowDeleteUserModal={ handleToggleDeleteUserModal }
                />
              </Col>
              <Col lg={8}>
                <div className="mb-3 d-flex align-items-center">
                  <div>
                    <h6 className='m-0 text-muted fw-bold'>{ 'RECENT ACTIVITY' }</h6>
                  </div>
                  <div className="ps-2 flex-grow-1"><hr className='m-0'/></div>
                </div>
                {/*<h6 className='mb-3 text-muted fw-bold'>{ 'RECENT ACTIVITY' }</h6>*/}
                {
                  recentActivityIsRefetching &&
                    <div className='d-flex justify-content-center mb-4'>
                      <Spinner animation="border" />
                    </div>
                }
                {
                  recentActivityData &&
                    <>
                      <RecentActivity
                        recentActivity={
                          recentActivityData.pages.reduce((allData, data) => {
                            return [...allData, ...data.data];
                          }, [])
                        }
                      />
                      {
                        hasNextRecentActivityPage &&
                          <div className='d-grid mb-4'>
                            <Button
                              disabled={ isFetchingNextRecentActivityPage }
                              onClick={
                                !isFetchingNextRecentActivityPage
                                  ? fetchNextRecentActivityPage
                                  : null
                              }
                            >
                              {
                                !isFetchingNextRecentActivityPage
                                  ? 'Load More'
                                  : 'Loading More...'
                              }
                            </Button>
                          </div>
                      }
                    </>
                }
                {
                  recentActivityIsLoading &&
                    <RecentActivitySkeleton />
                }
                {/*
                  recentActivityIsError &&
                    <Alert variant='danger'>
                      { recentActivityError }
                    </Alert>
                */}
              </Col>
            </Row>
        }
      </Container>
      <Toast
        show={ showRecentActivityErrorToast }
        onClose={ handleCloseRecentActivityErrorToast }
      >
        { recentActivityError }
      </Toast>
      <EditUserModal
        show={ showEditUserModal }
        user={ userData }
        onHide={ handleToggleEditUserModal }
      />
      <ChangePasswordModal
        show={ showChangePasswordModal }
        user={ userData }
        onHide={ handleToggleChangePasswordModal }
      />
      <DeleteUserModal
        show={ showDeleteUserModal }
        user={ userData }
        onHide={ handleToggleDeleteUserModal }
      />
    </>
  );
};

export default UserDetail;
