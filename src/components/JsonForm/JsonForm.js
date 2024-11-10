import React, { useEffect, useState } from 'react';
import { Button, Form, Spinner } from 'react-bootstrap';
import { Typeahead } from 'react-bootstrap-typeahead'; // ES2015
import 'react-bootstrap-typeahead/css/Typeahead.css';
import './JsonForm.css'; // Import the CSS file for additional styling
const Joi = require('joi');

function cardForm({ roomList, sendAlert }) {

    // State variables for each form field
    const [roomId, setRoomId] = useState('');
    const [roomType, setRoomType] = useState('');
    const [card, setCard] = useState('');
    const [hideSubmit, setHideSubmit] = useState(false);

    // State to store the selected room from typeahead
    const [selected, setSelected] = useState([]);

    // State to track whether the card is valid JSON format
    const [validJson, setValidJson] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();         // Prevent default form submission
        
        setHideSubmit(true);

        // Perform a POST request to send the card
        fetch('api/v1/card', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                roomId: roomId,         // Set the "roomId" field in the payload
                card: JSON.parse(card), // Convert the card payload string to an object
                type: roomType,
                roomTitle: selected[0].title,
                roomId: roomId,
            }),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to send card.');
                }
                return response.json();
            })
            .then((data) => {
                const roomName = selected[0].title;
                sendAlert(`Card sent successfully to ${roomName}.`, true);
                setHideSubmit(false);
            })
            .catch((error) => {
                sendAlert(`Failed to send card! ${error}`, false);
                setHideSubmit(false);
            });
    };

    // Handler to capture the selected typeahead item and set roomId
    const handleSelection = (selectedRoom) => {
        setSelected(selectedRoom);

        if (selectedRoom.length > 0) {
            const selectedOption = selectedRoom[0];
            setRoomId(selectedOption.id);
            setRoomType(selectedOption.type);
        } else {
            setRoomId('');
        }
    };

    const schema = Joi.object({
        $schema: Joi.string().uri().required(),
        type: Joi.string().valid("AdaptiveCard").required(),
        version: Joi.number().min(1.2).max(1.3).required(),
        body: Joi.array().min(1).required(),
        actions: Joi.array().optional(),
      });       // can add .unknown(true) here to allow for more fields

    useEffect(() => {
        if (card) {
            try {
                const parsedCard = JSON.parse(card);
                const { error } = schema.validate(parsedCard);
                setValidJson(!error);
            } catch (error) {
                setValidJson(false);
            }
        }
    }, [card])

    return (
        <div>
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
                    isInvalid={!validJson && card.length}   // highlight in red
                    isValid={validJson && card.length}      // highlight in green
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>Choose a recipient from these {roomList.length ? roomList.length : ""} rooms/spaces</Form.Label>
                <Typeahead
                    id="room-selector"      // id is required for typeahead
                    options={roomList}
                    placeholder="Choose a room or person (start typing)..."
                    labelKey="title"
                    minLength={1}           // characters typed before displaying dropdown
                    selected={selected}     // control the selected option
                    onChange={handleSelection} // triggered when an option is selected
                />
            </Form.Group>
            <Button 
                variant={validJson && roomId.length ? "outline-primary" : "outline-secondary" } 
                size="lg" 
                type="submit" 
                className="mt-3" 
                disabled={!validJson || !roomId.length || hideSubmit}>
                    {
                        hideSubmit ? (
                            <Spinner animation="border" role="status" aria-hidden="true"/>
                        ) : (
                            'Submit'
                        )
                    }
            </Button>
        </Form >
        </div>
    );
}

export default cardForm;
