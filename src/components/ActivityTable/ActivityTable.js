import React, { useEffect, useState } from 'react';
import { Modal, Table } from 'react-bootstrap';
import './ActivityTable.css'

function ActivityTable({ show, setShow }) {

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

  // Function to split a string in half
  const splitStringInHalf = (str) => {
    let firstHalf, secondHalf;
    if (str) {
      const middleIndex = Math.floor(str.length / 2);
      firstHalf = str.substring(0, middleIndex);
      secondHalf = str.substring(middleIndex);
    } else {
      firstHalf = null;
      secondHalf = null;
    }
    return { firstHalf, secondHalf };
  };

  // data is the list of maps to display in the table
  const [data, setData] = useState([]);

  // change the state of the the visibility of the modal
  const handleClose = () => setShow(false);

  useEffect(() => {
    // only retrieve history on show = true
    if (show) {
      fetch('/api/v1/user/history', {
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
              <th className="nowrap-column">Timestamp</th>
              <th className="nowrap-column">Activity</th>
              <th className="nowrap-column">Type</th>
              <th className="nowrap-column">Result</th>
              <th className="wrap-column">Message Id</th>
            </tr>
          </thead>
          <tbody>
            {data.map((entry, index) => {
              const splitMessage = splitStringInHalf(entry.messageId);
              return (
                <tr key={index}>
                  <td className="nowrap-column">{formatDate(entry.timestamp)}</td>
                  <td className="nowrap-column">{entry.activity}</td>
                  <td className="nowrap-column">{entry.type}</td>
                  {/* display success or failure only if that is a valid state */}
                  <td className="nowrap-column">{entry.success === undefined ? "" : entry.success ? "success" : "fail"}</td>
                  {/* display messageId split in half so as to make the table readable */}
                  <td>
                    <span className="split-text">
                      {splitMessage.firstHalf}
                    </span>
                    {splitMessage.secondHalf}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </Table>
      </Modal.Body>
    </Modal>
  );
}

export default ActivityTable;