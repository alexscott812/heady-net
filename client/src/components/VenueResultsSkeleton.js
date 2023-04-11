import React from "react";
import ListCard from "./ListCard.js";
import ListItemSkeleton from "./ListItemSkeleton.js";

const VenueResultsSkeleton = ({ ...props }) => {
  return (
    <ListCard {...props}>
      {[...Array(12)].map((_, i) => (
        <ListItemSkeleton key={i} />
      ))}
    </ListCard>
  );
};

export default VenueResultsSkeleton;
