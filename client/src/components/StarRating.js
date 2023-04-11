import React, { useState } from "react";
import { Flex, HStack, Icon, useColorModeValue } from "@chakra-ui/react";
import { FaStar, FaStarHalf } from "react-icons/fa";

const StarRating = ({
  name = "rating",
  editable = false,
  numberOfStars = 5,
  rating = 0,
  onRatingChange = null,
  ...restProps
}) => {
  const starRatedColor = "gold.400";
  const starDefaultColor = useColorModeValue("gray.300", "whiteAlpha.400");
  // const starDefaultColor = useColorModeValue('gray.200', 'whiteAlpha.300');
  const [hoverRating, setHoverRating] = useState(null);

  const roundNearestHalf = (num) => {
    return Math.round(num * 2) / 2;
  };

  return (
    <HStack spacing={1} {...restProps}>
      {editable ? (
        <>
          {[...Array(numberOfStars)].map((_, i) => (
            <label
              key={i}
              onMouseEnter={() => setHoverRating(i + 1)}
              onMouseLeave={() => setHoverRating(null)}
              style={{ cursor: "pointer", position: "relative" }}
            >
              <Icon
                as={FaStar}
                style={{ transition: "color 200ms" }}
                color={
                  i + 1 <= (hoverRating || rating)
                    ? starRatedColor
                    : starDefaultColor
                }
              />
              <input
                id={`star-${i + 1}`}
                aria-label={`star-${i + 1}`}
                type="radio"
                name={name}
                style={{
                  position: "absolute",
                  overflow: "hidden",
                  clip: "rect(0 0 0 0)",
                  height: "1px",
                  width: "1px",
                  whiteSpace: "nowrap",
                  border: "0",
                }}
                value={i + 1}
                onClick={onRatingChange}
                onKeyPress={onRatingChange}
                tabIndex={i}
              />
            </label>
          ))}
        </>
      ) : (
        <>
          {[...Array(numberOfStars)].map((_, i) =>
            i < roundNearestHalf(rating) && i + 1 > roundNearestHalf(rating) ? (
              <Flex key={i} position="relative">
                <Icon as={FaStar} color={starDefaultColor} />
                <Icon
                  as={FaStarHalf}
                  color={starRatedColor}
                  position="absolute"
                  top={0}
                  left={0}
                />
              </Flex>
            ) : (
              <Icon
                key={i}
                as={FaStar}
                color={
                  i + 1 <= roundNearestHalf(rating)
                    ? starRatedColor
                    : starDefaultColor
                }
              />
            )
          )}
        </>
      )}
    </HStack>
  );
};

export default StarRating;

// [...Array(numberOfStars)].map((star, i) => (
//     <span key={ i } className='me-1'>
//       {
//         ((i+0 < roundNearestHalf(rating)) &&
//          (roundNearestHalf(rating) < i+1))
//           ? <span className='fa-layers fa-fw'>
//               <FontAwesomeIcon
//                 icon={ faStarHalf }
//                 color={ starRatedColor }
//               />
//               <FontAwesomeIcon
//                 className='fa-flip-horizontal'
//                 icon={ faStarHalf }
//                 color={ starDefaultColor }
//               />
//             </span>
//           : <span>
//               <FontAwesomeIcon
//                 icon={ faStar }
//                 color={
//                   (i+1 <= roundNearestHalf(rating))
//                     ? starRatedColor
//                     : starDefaultColor
//                 }
//               />
//             </span>
//       }
//     </span>
//   ))

// [...Array(props.numberOfStars)].map((star, i) => (
//     <FontAwesomeIcon
//       key={ i }
//       className='me-2'
//       icon={ faStar }
//       color={
//         (i+1 <= props.rating)
//           ? props.starRatedColor
//           : props.starDefaultColor
//       }
//     />
//   ))
