import React, { useState } from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';
import { Typeahead } from 'react-bootstrap-typeahead'; // ES2015
import 'react-bootstrap-typeahead/css/Typeahead.css';
import './JsonForm.css'; // Import the CSS file for additional styling

function cardForm({ isAuthenticated, roomList }) {

    const handleSubmit = (event) => {
        event.preventDefault(); // Prevent default form submission
    
        // Get values from the form fields
        const roomId = event.target.elements.SearchText1.value;
        const card = event.target.elements.Textarea1.value;
    
        // Perform a POST request to /sendcard
        fetch('/sendcard', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            roomId: roomId, // Set the "roomId" field in the payload
            card: JSON.parse(card), // Convert the card payload string to an object
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

    // State to store the selected option
    const [selected, setSelected] = useState([]);

    // Handler to capture the selected item and log the ID
    const handleSelection = (selectedOptions) => {
        setSelected(selectedOptions);

        if (selectedOptions.length > 0) {
            const selectedOption = selectedOptions[0];
            console.log('Selected ID:', selectedOption.id);
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
                    disabled={!isAuthenticated}
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>Choose a destination for the card to be sent ({roomList.length})</Form.Label>
                <Typeahead
                    id="room-selector"
                    options={roomList}
                    placeholder="Choose a room or person..."
                    labelKey="title"
                    // minLength={2}       // characters typed before displaying dropdown
                    selected={selected} // control the selected option
                    onChange={handleSelection} // triggered when an option is selected
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="SearchText1">
                <Form.Label>roomId</Form.Label>
                <InputGroup>
                    <Form.Control
                        type="text"
                        disabled={!isAuthenticated}
                    />
                </InputGroup>
            </Form.Group>
            <Button variant="primary" type="submit" disabled={!isAuthenticated}>Send</Button>
        </Form >
    );
}

export default cardForm;
