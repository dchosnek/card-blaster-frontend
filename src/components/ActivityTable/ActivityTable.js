import React, { useEffect, useState } from 'react';
import { Modal, Table } from 'react-bootstrap';
import ActivityRow from '../ActivityRow/ActivityRow';
import './ActivityTable.css'

function ActivityTable({ show, setShow, sendAlert }) {

  // history is the list of maps to display in the table
  const [history, setHistory] = useState([]);

  const [deletedMessages, setDeletedMessages] = useState([]);

  // change the state of the the visibility of the modal
  const handleClose = () => setShow(false);

  const fetchHistory = () => {
    fetch('api/v1/user/history', {
      credentials: 'include',
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        }
        return null;
      })
      .then((mylist) => {
        setHistory(mylist);
        // create list containing messageId for deleted messages
        setDeletedMessages(mylist.filter(x => x.activity==='delete card').map(y => y.messageId));
      })
  }

  useEffect(() => {
    // only retrieve history on show = true
    if (show) {
      fetchHistory();
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
              <th className="wrap-column">Recipient</th>
              <th className="nowrap-column">Action</th>
            </tr>
          </thead>
          <tbody>
            {history.map((entry, index) => {
              return (
                <ActivityRow key={index} entry={entry} deletedMessages={deletedMessages} sendAlert={sendAlert} fetchHistory={fetchHistory}/>
              )
            })}
          </tbody>
        </Table>
      </Modal.Body>
    </Modal>
  );
}

export default ActivityTable;