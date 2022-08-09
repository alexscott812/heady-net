import React from 'react';
import { Table } from 'react-bootstrap';
import { useHistory } from "react-router-dom";

const SongTable = (props) => {

  const history = useHistory();

  const handleRowClick = ( id ) => {
    history.push(`/songs/${id}`);
  };

  return (
    <Table responsive className="text-left">
      <thead>
        <tr>
          <th>Name</th>
          <th>Live Performances</th>
        </tr>
      </thead>
      <tbody>
        {props.songs.map(song => (
          <tr key={song._id} onClick={ () => handleRowClick(song._id) } style={{cursor:'pointer'}}>
            <td>{song.name}</td>
            <td>0</td>
          </tr>
        ))}
      </tbody>
    </Table>

  );
}

export default SongTable;
