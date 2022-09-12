// import React, { useState, useEffect, useReducer } from 'react';
// import { Container, Row, Col } from 'react-bootstrap';
// import { useParams, useHistory, useLocation } from 'react-router-dom';
//
// import ShowHeaderNew from '../components/ShowHeaderNew.js';
// import ShowHeaderNewSkeleton from '../components/ShowHeaderNewSkeleton.js';
// import ImageGallery from '../components/ImageGallery.js';
// import ImageGallerySkeleton from '../components/ImageGallerySkeleton.js';
// import Setlistv2 from '../components/Setlistv2.js';
// import Setlistv2Skeleton from '../components/Setlistv2Skeleton.js';
// import Reviews from '../components/Reviews.js';
// import ReviewsSkeleton from '../components/ReviewsSkeleton.js';
//
// import Alert from '../components/Alert.js';
// import WriteReviewModal from '../components/WriteReviewModal.js';
// import ShareModal from '../components/ShareModal.js';
//
// import useAuth from '../hooks/useAuth.js';
// import useQuery from '../hooks/useQuery.js';
// import { getShowById } from '../services/showService.js';
// import { initialState, reducer } from '../state/reducers/showDetailReducer.js';
// import {
//   fetchShowInit,
//   fetchShowSuccess,
//   fetchShowError
// } from '../state/actions/showDetailActions.js';
//
// const ShowDetail = () => {
//
//   const history = useHistory();
//   const location = useLocation();
//   const { id } = useParams();
//   const { user } = useAuth();
//   const [showWriteReviewModal, setShowWriteReviewModal] = useState(false);
//   const [showShareModal, setShowShareModal] = useState(false);
//
//   // const [{ show, isLoading, error }, dispatch] = useReducer(reducer, initialState);
//   const { data, isLoading, isError } = useQuery();
//
//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, []);
//
//   useEffect(() => {
//     let isSubscribed = true;
//     const fetchShow = async () => {
//       dispatch(fetchShowInit());
//       try {
//         const res = await getShowById(id);
//         const show = await res.data;
//         if (isSubscribed) {
//           dispatch(fetchShowSuccess(show));
//         }
//       } catch (err) {
//         if (isSubscribed) {
//           dispatch(fetchShowError(err.response ? err.response.data.msg : err.message));
//         }
//       }
//     };
//     fetchShow();
//
//     return () => isSubscribed = false;
//
//   }, [id]);
//
//
//   const pad = (n) => {
//     return n.toString().padStart(2, '0');
//   };
//
//   const onListenButtonClick = () => {
//     const dateString = `${pad(show.year)}-${pad(show.month)}-${pad(show.day)}`;
//     const url = `https://archive.org/search.php?query=title%3A%28Grateful%20Dead%29%20AND%20date%3A${dateString}&sort=-downloads`;
//     window.open(url, '_blank');
//   };
//
//   const calculateNewAverage = ( oldAvg, oldCount, newVal ) => {
//     let newAvg = ( ( (oldAvg * oldCount) + newVal ) / (oldCount + 1) );
//     let newAvgRounded = Math.round((newAvg + Number.EPSILON) * 10) / 10;
//     return newAvgRounded;
//   };
//
//   const handleReviewPost = ( newReview ) => {
//     let tempShow = { ...show };
//     let newReviews = [newReview, ...show.reviews].slice(0,5);
//     let newReviewCount = show.review_count + 1;
//     let newAverageRating = calculateNewAverage(show.avg_rating, show.review_count, newReview.rating);
//     tempShow.reviews = newReviews;
//     tempShow.review_count = newReviewCount;
//     tempShow.avg_rating = newAverageRating;
//     //setShow(tempShow);
//   };
//
//   const handlePhotoPost = ( newPhoto ) => {
//     let tempShow = { ...show };
//     let newPhotos = [newPhoto, ...show.photos].slice(0,5);
//     let newPhotoCount = show.photo_count + 1;
//     tempShow.photos = newPhotos;
//     tempShow.photo_count = newPhotoCount;
//   };
//
//   const handleShowWriteReviewModal = () => {
//     if (user) {
//       setShowWriteReviewModal(true);
//     } else {
//       history.push(`/login?redirect=${encodeURIComponent(location.pathname + location.search)}`);
//     }
//   };
//
//   const handleCloseWriteReviewModal = () => {
//     setShowWriteReviewModal(false);
//   };
//
//   const handleShowShareModal = () => {
//     setShowShareModal(true);
//   };
//
//   const handleCloseShareModal = () => {
//     setShowShareModal(false);
//   };
//
//   return (
//     <>
//       <Container className='py-4'>
//         {
//           isLoading
//             ? <Row>
//                 <Col lg={5} xl={4}>
//                   <ShowHeaderNewSkeleton />
//                   <ImageGallerySkeleton />
//                 </Col>
//                 <Col lg={7} xl={8}>
//                   <Setlistv2Skeleton />
//                   <ReviewsSkeleton />
//                 </Col>
//               </Row>
//             : error
//               ? <Alert variant='danger'>
//                   { error }
//                 </Alert>
//               : <Row>
//                   <Col lg={5} xl={4}>
//                     <ShowHeaderNew
//                       show={ show }
//                       onListenButtonClick={ onListenButtonClick }
//                       onWriteReviewButtonClick={ handleShowWriteReviewModal }
//                       onViewPhotosButtonClick={ null }
//                       onShareButtonClick={ handleShowShareModal }
//                     />
//                     <ImageGallery
//                       photos={ show.images }
//                     />
//                   </Col>
//                   <Col lg={7} xl={8}>
//                     <Setlistv2
//                       sets={ show.sets }
//                     />
//                     <Reviews
//                       reviewCount={ show.review_count }
//                       averageRating={ show.avg_rating }
//                       reviews={ show.reviews }
//                       handleShowWriteReviewModal={ handleShowWriteReviewModal }
//                     />
//                   </Col>
//                 </Row>
//         }
//       </Container>
//       <WriteReviewModal
//         show={ showWriteReviewModal }
//         showId={ show ? show._id : null }
//         onHide={ handleCloseWriteReviewModal }
//         handleReviewPost={ handleReviewPost }
//       />
//       <ShareModal
//         show={ showShareModal }
//         showId={ show ? show._id : null }
//         onHide={ handleCloseShareModal }
//         handlePhotoPost={ handlePhotoPost }
//       />
//     </>
//   );
// }
//
// export default ShowDetail;

import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import ShowHeaderNew from '../components/ShowHeaderNew.js';
import ShowHeaderNewSkeleton from '../components/ShowHeaderNewSkeleton.js';
import ImageGallery from '../components/ImageGallery.js';
import ImageGallerySkeleton from '../components/ImageGallerySkeleton.js';
import Setlist from '../components/Setlist.js';
import SetlistSkeleton from '../components/SetlistSkeleton.js';
import Reviews from '../components/Reviews.js';
import ReviewsSkeleton from '../components/ReviewsSkeleton.js';
import Alert from '../components/Alert.js';
import WriteReviewModal from '../components/WriteReviewModal.js';
import EditReviewModal from '../components/EditReviewModal.js';
import DeleteReviewModal from '../components/DeleteReviewModal.js';
import ShareModal from '../components/ShareModal.js';
import ListenModal from '../components/ListenModal.js';
import ImageModal from '../components/ImageModal.js';
import useDocumentTitle from '../hooks/useDocumentTitle.js';
import { useQuery, useInfiniteQuery } from 'react-query';
import { getShowById } from '../services/showService.js';
import { getReviews } from '../services/reviewService.js';
import pad from '../utils/pad.js';

const ShowDetail = () => {

  const { id } = useParams();
  const [showWriteReviewModal, setShowWriteReviewModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showListenModal, setShowListenModal] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [imageModalIndex, setImageModalIndex] = useState(0);
  const [showEditReviewModal, setShowEditReviewModal] = useState(false);
  const [reviewToBeEdited, setReviewToBeEdited] = useState(null);
  const [showDeleteReviewModal, setShowDeleteReviewModal] = useState(false);
  const [reviewToBeDeleted, setReviewToBeDeleted] = useState(null);

  const {
    data: showData,
    isLoading: showIsLoading,
    isError: showIsError,
    error: showError
  } = useQuery(['shows', id], () => getShowById(id));

  const {
    data: reviewsData,
    isLoading: reviewsIsLoading,
    isError: reviewsIsError,
    error: reviewsError,
    hasNextPage: hasNextReviewsPage,
    fetchNextPage: fetchNextReviewsPage,
    isFetchingNextPage: isFetchingNextReviewsPage
  } = useInfiniteQuery(
    ['reviews', { show_id: id, sort: '-created_at' }],
    ({ pageParam = 1 }) => getReviews({
      show_id: id,
      page: pageParam,
      sort: '-created_at'
    }), {
      getNextPageParam: (lastPage, pages) => {
        return (lastPage.meta.current_page < lastPage.meta.total_pages)
          ? lastPage.meta.current_page + 1
          : false;
      }
    }
  );

  useDocumentTitle(`${ showData ? showData.title : 'Show Detail' } | HeadyNet`);

  const getDateString = ( m = 1, d = 1, y = 1965 ) => {
    return `${pad(y, 2)}-${pad(m, 2)}-${pad(d, 2)}`;
  };

  const handleShowWriteReviewModal = () => {
    setShowWriteReviewModal(true);
  };

  const handleCloseWriteReviewModal = () => {
    setShowWriteReviewModal(false);
  };

  const handleShowListenModal = () => {
    setShowListenModal(true);
  };

  const handleCloseListenModal = () => {
    setShowListenModal(false);
  };

  const handleShowShareModal = () => {
    setShowShareModal(true);
  };

  const handleCloseShareModal = () => {
    setShowShareModal(false);
  };

  const handleShowImageModal = ( newImageModalIndex ) => {
    setImageModalIndex(newImageModalIndex);
    setShowImageModal(true);
  };

  const handleCloseImageModal = () => {
    setShowImageModal(false);
    //setImageModalIndex(0);
  };

  const handleShowEditReviewModal = ( review ) => {
    setReviewToBeEdited(review);
    setShowEditReviewModal(true);
  };

  const handleCloseEditReviewModal = () => {
    setReviewToBeEdited(null);
    setShowEditReviewModal(false);
  };

  const handleShowDeleteReviewModal = ( review ) => {
    setReviewToBeDeleted(review);
    setShowDeleteReviewModal(true);
  };

  const handleCloseDeleteReviewModal = () => {
    setReviewToBeDeleted(null);
    setShowDeleteReviewModal(false);
  };

  return (
    <>
      <Container className='py-3'>
        {showIsLoading && (
          <Row>
            <Col lg={5} xl={4}>
              <ShowHeaderNewSkeleton />
              <ImageGallerySkeleton />
            </Col>
            <Col lg={7} xl={8}>
              <SetlistSkeleton />
              <ReviewsSkeleton />
            </Col>
          </Row>
        )}
        {showIsError && <Alert variant='danger'>{showError}</Alert>}
        {showData && (
          <Row>
            <Col lg={5} xl={4}>
              <ShowHeaderNew
                show={showData}
                onWriteReviewButtonClick={handleShowWriteReviewModal}
                onShareButtonClick={handleShowShareModal}
                onListenButtonClick={handleShowListenModal}
              />
              <ImageGallery
                images={showData.images}
                onImageClick={handleShowImageModal}
              />
            </Col>
            <Col lg={7} xl={8}>
              <Setlist sets={showData.sets} />
              {reviewsIsLoading && <ReviewsSkeleton />}
              {reviewsIsError && <Alert variant='danger'>{reviewsError}</Alert>}
              {reviewsData &&
                  <Reviews
                    reviews={ reviewsData.pages.reduce((allData, data) => {
                        return [...allData, ...data.data];
                      }, [])
                    }
                    handleShowWriteReviewModal={ handleShowWriteReviewModal }
                    handleShowEditReviewModal={ handleShowEditReviewModal }
                    handleShowDeleteReviewModal={ handleShowDeleteReviewModal }
                    fetchMore={ fetchNextReviewsPage }
                    hasMore={ hasNextReviewsPage }
                    isFetchingMore={ isFetchingNextReviewsPage }
                  />
              }
            </Col>
          </Row>
        )}
      </Container>
      <WriteReviewModal
        show={ showWriteReviewModal }
        showId={ showData?._id }
        onHide={ handleCloseWriteReviewModal }
      />
      <ShareModal
        show={ showShareModal }
        showId={ showData?._id }
        onHide={ handleCloseShareModal }
      />
      <ListenModal
        show={ showListenModal }
        dateString={ getDateString(showData?.month, showData?.day, showData?.year) }
        onHide={ handleCloseListenModal }
      />
      <ImageModal
        show={ showImageModal }
        images={ showData?.images }
        currentIndex={ imageModalIndex }
        setCurrentIndex={ setImageModalIndex }
        onHide={ handleCloseImageModal }
      />
      <EditReviewModal
        show={ showEditReviewModal }
        review={ reviewToBeEdited }
        onHide={ handleCloseEditReviewModal }
      />
      <DeleteReviewModal
        show={ showDeleteReviewModal }
        review={ reviewToBeDeleted }
        onHide={ handleCloseDeleteReviewModal }
      />
    </>
  );
};

export default ShowDetail;
