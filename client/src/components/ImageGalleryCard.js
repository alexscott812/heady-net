import React from "react";
// import { Row, Col, Image } from 'react-bootstrap';
import Card from "./Card.js";
import CardBody from "./CardBody.js";
import CardTitle from "./CardTitle.js";
import { Text, Image, SimpleGrid, Skeleton } from "@chakra-ui/react";

const ImageGalleryCard = ({
  images = [],
  onShowImageModal = null,
  setImageModalIndex = null,
  ...restProps
}) => {
  const handleImageClick = (e) => {
    const newIndex = images.findIndex(
      (image) => image.thumbnail_md_url === e.target.src
    );
    setImageModalIndex(newIndex);
    onShowImageModal();
  };

  return (
    <Card {...restProps}>
      <CardBody>
        <CardTitle>Images</CardTitle>
        {images.length > 0 ? (
          <SimpleGrid columns={[3, 4, 5, 5]} spacing={2}>
            {images.map((image) => (
              <Image
                key={image._id}
                objectFit="cover"
                src={image.thumbnail_md_url}
                onClick={handleImageClick}
                role="button"
                tabIndex={0}
                borderRadius="md"
                fallback={
                  <Skeleton pt="100%" h={0} width="100%" borderRadius="md" />
                }
              />
            ))}
          </SimpleGrid>
        ) : (
          <Text>There are no images.</Text>
        )}
      </CardBody>
    </Card>
  );
};

export default ImageGalleryCard;
