import React, { useRef } from 'react';
import { Button } from 'react-bootstrap';
import { ExclamationTriangle, Person, People, Trash } from 'react-bootstrap-icons';
import './ActivityRow.css';

function ActivityRow({ entry, deletedMessages, setDeletedMessages }) {

    // Perform a DELETE request to delete the card
    const handleDelete = (messageId) => {
        fetch(`api/v1/card/${messageId}`, {method: 'DELETE'})
        .then((response) => {
            if (response.ok) {
                setDeletedMessages([...deletedMessages, messageId]);
                toastRef.current.addToast('Card deleted successfully!', true);
            } else {
                toastRef.current.addToast('Failed to delete card!', false);
            }
        })
        .catch((error) => {
            console.log(error);
            // toastRef.current.addToast(`Failed to delete card! ${error}`, false);
        })
    };

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

    const getActivityCell = (entry) => {
        if (entry.success === undefined) {
            return <span>{entry.activity}</span>
        } else {
            return (
                <div className="d-flex align-items-center">
                    <span>{entry.activity}</span>
                    { entry.type === 'direct' ? <Person className="ms-2" /> : ""}
                    { entry.type === 'group' ? <People className="ms-2" /> : ""}
                    { entry.success === false ? <ExclamationTriangle className="ms-2" /> : "" }
                </div>
            )
        }
    }

    return (
        <tr>
            <td className="nowrap-column">{formatDate(entry.timestamp)}</td>
            <td className="nowrap-column">{getActivityCell(entry)}</td>
            <td>{entry.roomTitle}</td>
            <td className="nowrap-column">
                {entry.activity === 'send card' && entry.success && !deletedMessages.includes(entry.messageId) 
                    ? 
                <Button variant="outline-danger" size="sm" onClick={() => handleDelete(entry.messageId)}><Trash /></Button> 
                    : 
                ""}
            </td>
        </tr>
    );
};

export default ActivityRow;