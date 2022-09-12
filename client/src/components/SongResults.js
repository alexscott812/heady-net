import React from 'react';
import ListCard from './ListCard.js';
import ListItemLink from './ListItemLink.js';

const SongResults = ({ songs = [], ...restProps }) => {
  return (
    <>
      {songs.length > 0 && (
        <ListCard {...restProps}>
          {songs.map(song => (
            <ListItemLink
              key={song._id}
              name={song.name}
              to={`/songs/${song._id}`}
            />
          ))}
        </ListCard>
      )}
    </>
  );
};

export default SongResults;
