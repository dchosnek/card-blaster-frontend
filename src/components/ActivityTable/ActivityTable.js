import React, { useEffect, useState } from 'react';
import { Modal, Table } from 'react-bootstrap';

function ActivityTable({show, setShow}) {

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

  // data is the list of maps to display in the table
  const [data, setData] = useState([]);

  // change the state of the the visibility of the modal
  const handleClose = () => setShow(false);

  useEffect(() => {
    // only retrieve history on show = true
    if (show) {
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
    }
  }, [show]);

  return (
    <Modal size="xl" show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Your recent activity</Modal.Title>
      </Modal.Header>
      <Modal.Body>

        <Table striped hover className="mt-4">
          <thead>
            <tr>
              <th>Timestamp</th>
              <th>Activity</th>
              <th>Type</th>
              <th>Result</th>
            </tr>
          </thead>
          <tbody>
            {data.map((entry, index) => (
              <tr key={index}>
                <td>{formatDate(entry.timestamp)}</td>
                <td>{entry.activity}</td>
                <td>{entry.type}</td>
                {/* display success or failure only if that is a valid state */}
                <td>{entry.success === undefined ? "" : entry.success ? "success" : "fail"}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Modal.Body>
    </Modal>
  );
}

export default ActivityTable;