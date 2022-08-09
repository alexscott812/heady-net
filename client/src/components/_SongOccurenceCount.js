import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { useHistory } from "react-router-dom";
import qs from "query-string";

const SongOccurenceCount = (props) => {

  const history = useHistory();

  const onButtonClick = (song) => {
    const query = {
      song: song
    };
    const queryString = qs.stringify(query);
    history.push(`/shows?${queryString}`);
  };

  return (
    <Card className="text-left mb-4">
      <Card.Body>
        <Card.Title>Total Live Occurences</Card.Title>
        <hr />
        <div className="text-center">
          <h1 className="mb-3">{props.totalOccurences}</h1>
          <Button onClick={() => { onButtonClick(props.name) }}>
            See All Shows
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}

export default SongOccurenceCount;
