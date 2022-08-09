import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from "react-router-dom";

const Setlist = (props) => {

  return (
    <Card className="text-left shadow-sm">
      <Card.Body>
        <Card.Title>Setlist</Card.Title>
        <hr />
        {
          (props.sets.length > 0)
            ? <ul style={{listStyleType:'none',padding:'0'}}>
                {
                  props.sets.map((set, i) => (
                    <div key={set._id}>
                      {
                        set.songs.map((song, j) => (
                          <li key={song._id}>
                            <Link
                              to={`/songs/${song.song_id}`}
                              className="text-dark text-underline-hover"
                            >
                              <span>{song.name}</span>
                            </Link>
                            {
                              (set.songs[j + 1]) &&
                                <span>{song.segued && ' > '}</span>
                            }
                          </li>
                        ))
                      }
                    </div>
                  ))
                }
              </ul>
            : <div>There is no setlist data.</div>
        }
      </Card.Body>
    </Card>
  );
}

export default Setlist;
