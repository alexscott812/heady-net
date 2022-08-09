import React from 'react';
import { Card } from 'react-bootstrap';
import { useHistory } from "react-router-dom";
import { Bar } from 'react-chartjs-2';
import qs from "query-string";


const SongOccurenceChart = (props) => {

  const history = useHistory();

  const graphClickEvent = (e,i) => {
    if (i[0]) {
      const year = i[0]['_model']['label'];
      const song = props.name;
      const query = {
        song: song,
        year: year
      };
      const queryString = qs.stringify(query);
      history.push(`/shows?${queryString}`);
    } else {
      return;
    };
  };

  const data = {
    labels: props.occurencesByYear.map(x => x._id),
    datasets: [
      {
        label: "Occurence Count",
        data: props.occurencesByYear.map(x => x.count),
        fill: true,
        backgroundColor: "#007bff",
        borderColor: "#007bff"
      }
    ]
  };

  const legend = {
    display: false
  };

  const options = {
    onClick: graphClickEvent,
    hover: {
      onHover: function(e) {
         var point = this.getElementAtEvent(e);
         if (point.length) e.target.style.cursor = 'pointer';
         else e.target.style.cursor = 'default';
      }
    },
    scales: {
      xAxes: [{
        barPercentage: 1,
        categoryPercentage: 0.7,
        gridLines: {
          display: false,
          drawBorder: false
        }
      }],
      yAxes: [{
        gridLines: {
          display: false,
          drawBorder: false
        }
      }]
    }
  };



  return (
    <Card className="text-left mb-4">
      <Card.Body>
        <Card.Title>Live Occurences By Year</Card.Title>
        <hr />
        <Bar
          data={data}
          legend={legend}
          height={100}
          options={options}
        />
      </Card.Body>
    </Card>
  );
}

export default SongOccurenceChart;
