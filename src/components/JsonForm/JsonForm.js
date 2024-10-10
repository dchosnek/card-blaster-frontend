import React, { useState } from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';
import { Typeahead } from 'react-bootstrap-typeahead'; // ES2015
import 'react-bootstrap-typeahead/css/Typeahead.css';
import './JsonForm.css'; // Import the CSS file for additional styling

function cardForm({ roomList }) {

    // State variables for each form field
    const [roomId, setRoomId] = useState('');
    const [roomType, setRoomType] = useState('');
    const [card, setCard] = useState('');

    // State to store the selected room from typeahead
    const [selected, setSelected] = useState([]);

    const handleSubmit = (event) => {
        event.preventDefault();         // Prevent default form submission

        // Perform a POST request to /sendcard
        fetch('/sendcard', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                roomId: roomId,         // Set the "roomId" field in the payload
                card: JSON.parse(card), // Convert the card payload string to an object
                type: roomType,
            }),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to send card.');
                }
                return response.json();
            })
            .then((data) => {
                alert('Card sent successfully!');
            })
            .catch((error) => {
                alert('Failed to send the card.');
            });
    };

    // Handler to capture the selected typeahead item and set roomId
    const handleSelection = (selectedRoom) => {
        setSelected(selectedRoom);

        if (selectedRoom.length > 0) {
            const selectedOption = selectedRoom[0];
            setRoomId(selectedOption.id);
            setRoomType(selectedOption.type);
            console.log(selectedOption.title, ':', selectedOption.id);
        }
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="Textarea1">
                <Form.Label>Enter your adaptive card payload below. Use the Webex Adaptive Card <a href="https://developer.webex.com/buttons-and-cards-designer" target="_blank" rel="noreferrer">Designer</a> to create your card.</Form.Label>
                <Form.Control
                    as="textarea"
                    rows={5}
                    placeholder="Card Payload"
                    className="form-control-monospace"
                    value={card} // Controlled component binding
                    onChange={(e) => setCard(e.target.value)} // Update state on change
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>Choose a destination for the card to be sent ({roomList.length})</Form.Label>
                <Typeahead
                    id="room-selector"      // id is required for typeahead
                    options={roomList}
                    placeholder="Choose a room or person..."
                    labelKey="title"
                    // minLength={2}        // characters typed before displaying dropdown
                    selected={selected}     // control the selected option
                    onChange={handleSelection} // triggered when an option is selected
                />
            </Form.Group>
            <Button variant="primary" type="submit" className="mt-3">Send</Button>
        </Form >
    );
}

export default cardForm;
