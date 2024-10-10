import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';

function ActivityTable() {

  // convert the timestamp to local timezone and format it
  const formatDate = (timestamp) => {
    if (!timestamp) return 'N/A'; // Handle missing timestamps

    const dateObj = new Date(timestamp); // convert to JavaScript Date object
    return dateObj.toLocaleString([], {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true // use AM/PM
    });
  };

  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('/history', {
      credentials: 'include',
    })
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      }
      return null;
    })
    .then((mylist) => {
      setData(mylist);

    })
  },[]);

  return (
    <Table striped hover className="mt-4">
      <thead>
        <tr>
          <th>Timestamp</th>
          <th>Activity</th>
          <th>Result</th>
        </tr>
      </thead>
      <tbody>
        {data.map((entry, index) => (
          <tr key={index}>
            <td>{formatDate(entry.timestamp)}</td>
            <td>{entry.activity}</td>
            <td>{entry.success ? "success" : ""}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default ActivityTable;