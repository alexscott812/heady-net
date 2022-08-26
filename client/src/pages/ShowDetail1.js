import React, { useState } from 'react';
import { useClipboard, useDisclosure } from "@chakra-ui/react";
import useToast from '../hooks/useToast.js';
import { useParams } from 'react-router-dom';
import Grid from '../components/Grid.js';
import GridItem from '../components/GridItem.js';
import EmptyState from '../components/EmptyState.js';
import ShowImageHeader from '../components/ShowImageHeader.js';
import ShowHeaderCard from '../components/ShowHeaderCard.js';
import ShowHeaderCardSkeleton from '../components/ShowHeaderCardSkeleton.js';
import ImageGalleryCard from '../components/ImageGalleryCard.js';
import ImageGalleryCardSkeleton from '../components/ImageGalleryCardSkeleton.js';
import SetlistCard from '../components/SetlistCard.js';
import SetlistCardSkeleton from '../components/SetlistCardSkeleton.js';
import ReviewsCard from '../components/ReviewsCard.js';
import ReviewsCardSkeleton from '../components/ReviewsCardSkeleton.js';
import WriteReviewModal from '../components/WriteReviewModal.js';
import EditReviewModal from '../components/EditReviewModal.js';
import DeleteReviewModal from '../components/DeleteReviewModal.js';
import ShareModal from '../components/ShareModal.js';
import ListenModal from '../components/ListenModal.js';
import ImageModal from '../components/ImageModal.js';
import SignUpCard from '../components/SignUpCard.js';
import RelatedShowsCard from '../components/RelatedShowsCard.js';
import PageContainer from '../components/PageContainer.js';
import useDocumentTitle from '../hooks/useDocumentTitle.js';
import { useAuth } from '../lib/auth';
import useShow from '../hooks/queries/useShow.js';
import useReviews from '../hooks/queries/useReviews.js';
import pad from '../utils/pad.js';
import ShowImageHeaderSkeleton from '../components/ShowImageHeaderSkeleton.js';

const ShowDetail = () => {
  const { id } = useParams();
  const { isAuthenticated } = useAuth();
  const createToast = useToast();
  const [url] = useState(window.location.href);
  const { onCopy } = useClipboard(url);
  const [imageModalIndex, setImageModalIndex] = useState(0);
  const [reviewToBeEdited, setReviewToBeEdited] = useState(null);
  const [reviewToBeDeleted, setReviewToBeDeleted] = useState(null);

  const {
    isOpen: isShareModalOpen,
    onOpen: onShareModalOpen,
    onClose: onShareModalClose
  } = useDisclosure();
  const {
    isOpen: isListenModalOpen,
    onOpen: onListenModalOpen,
    onClose: onListenModalClose
  } = useDisclosure();
  const {
    isOpen: isImageModalOpen,
    onOpen: onImageModalOpen,
    onClose: onImageModalClose
  } = useDisclosure();
  const {
    isOpen: isWriteReviewModalOpen,
    onOpen: onWriteReviewModalOpen,
    onClose: onWriteReviewModalClose
  } = useDisclosure();
  const {
    isOpen: isEditReviewModalOpen,
    onOpen: onEditReviewModalOpen,
    onClose: onEditReviewModalClose
  } = useDisclosure();
  const {
    isOpen: isDeleteReviewModalOpen,
    onOpen: onDeleteReviewModalOpen,
    onClose: onDeleteReviewModalClose
  } = useDisclosure();

  const {
    data: showData,
    isLoading: showIsLoading
  } = useShow(id);

  const {
    data: reviewsData,
    isLoading: reviewsIsLoading,
    hasMore: hasMoreReviews,
    loadMore: loadMoreReviews,
    isLoadingMore: isLoadingMoreReviews
  } = useReviews({ show_id: id, sort: '-created_at' });

  useDocumentTitle(`${showData ? showData.title : 'Show Detail'} | HeadyNet`);

  const getDateString = ( m = 1, d = 1, y = 1965 ) => {
    return `${pad(y, 2)}-${pad(m, 2)}-${pad(d, 2)}`;
  };

  const handleCopyLink = () => {
    onCopy();
    onShareModalClose();
    createToast({
      id: 'copy-show-link-success',
      status: 'success',
      message: 'Link copied!'
    });
  };

  return (
    <>
      {showIsLoading && <ShowImageHeaderSkeleton h={48} />}
      {showData?.images.length > 0 && (
        <ShowImageHeader imageUrl={showData.images[0].url} h={48} />
      )}
      <PageContainer pt={(showIsLoading || showData?.images.length > 0) && 36}>
        <Grid>
          {showIsLoading && (
            <GridItem colSpan={[12,12,12,8]}>
              <ShowHeaderCardSkeleton mb={4} />
              <SetlistCardSkeleton mb={4} />
              <ImageGalleryCardSkeleton mb={4} />
              <ReviewsCardSkeleton />
            </GridItem>
          )}
          {showData && (
            <>
              <GridItem colSpan={[12,12,12,8]}>
                <ShowHeaderCard
                  mb={4}
                  show={showData}
                  onWriteReviewButtonClick={onWriteReviewModalOpen}
                  onShareButtonClick={onShareModalOpen}
                  onListenButtonClick={onListenModalOpen}
                />
                <SetlistCard mb={4} sets={showData.sets} />
                <ImageGalleryCard
                  mb={4}
                  images={showData.images}
                  onImageClick={(newImageModalIndex) => {
                    setImageModalIndex(newImageModalIndex);
                    onImageModalOpen();
                  }}
                />
                {reviewsIsLoading && <ReviewsCardSkeleton mb={4} />}
                {reviewsData &&
                  <ReviewsCard
                    reviews={reviewsData}
                    // handleShowWriteReviewModal={onWriteReviewModalOpen}
                    handleShowEditReviewModal={(review) => {
                      setReviewToBeEdited(review);
                      onEditReviewModalOpen();
                    }}
                    handleShowDeleteReviewModal={(review) => {
                      setReviewToBeDeleted(review);
                      onDeleteReviewModalOpen();
                    }}
                    fetchMore={loadMoreReviews}
                    hasMore={hasMoreReviews}
                    isFetchingMore={isLoadingMoreReviews}
                  />
                }
              </GridItem>
              <GridItem d={['none', 'none', 'none', 'block']} colSpan={[0,0,0,4]}>
                <RelatedShowsCard
                  month={showData?.month}
                  day={showData?.day}
                  year={showData?.year}
                  mb={4}
                />
                {!isAuthenticated && <SignUpCard />}
              </GridItem>
            </>
          )}
          {(!showData && !showIsLoading) && (
            <GridItem>
              <EmptyState />
            </GridItem>
          )}
        </Grid>
      </PageContainer>
      <WriteReviewModal
        isOpen={isWriteReviewModalOpen}
        showId={showData?._id}
        onClose={onWriteReviewModalClose}
      />
      <ShareModal
        isOpen={isShareModalOpen}
        url={url}
        onClose={onShareModalClose}
        onCopyLink={handleCopyLink}
      />
      <ListenModal
        isOpen={isListenModalOpen}
        dateString={getDateString(showData?.month, showData?.day, showData?.year)}
        onClose={onListenModalClose}
      />
      <ImageModal
        isOpen={isImageModalOpen}
        images={showData?.images}
        currentIndex={imageModalIndex}
        setCurrentIndex={setImageModalIndex}
        onClose={onImageModalClose}
      />
      <EditReviewModal
        isOpen={isEditReviewModalOpen}
        review={reviewToBeEdited}
        setReview={setReviewToBeEdited}
        onClose={onEditReviewModalClose}
      />
      <DeleteReviewModal
        isOpen={isDeleteReviewModalOpen}
        review={reviewToBeDeleted}
        setReview={setReviewToBeDeleted}
        onClose={onDeleteReviewModalClose}
      />
    </>
  );
}

export default ShowDetail;
