import React, { useEffect, useState } from 'react';
import { Button, Form, Spinner } from 'react-bootstrap';
import { Typeahead } from 'react-bootstrap-typeahead'; // ES2015
import 'react-bootstrap-typeahead/css/Typeahead.css';
import './JsonForm.css'; // Import the CSS file for additional styling
const Joi = require('joi');

function cardForm({ roomList, sendAlert }) {

    // State variables for each form field
    const [card, setCard] = useState('');
    const [hideSubmit, setHideSubmit] = useState(false);

    // State to store the selected room from typeahead
    const [selected, setSelected] = useState([]);

    // State to track whether the card is valid JSON format
    const [validJson, setValidJson] = useState(false);

    const sendOneCard = (room, card) => {
        return new Promise((resolve, reject) =>

            // Perform a POST request to send the card
            fetch('api/v1/card', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    roomId: room.id,
                    card: JSON.parse(card), // Convert the card payload string to an object
                    type: room.type,
                    roomTitle: room.title,
                }),
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('Failed to send card.');
                    }
                    return response.json();
                })
                .then((data) => {
                    sendAlert(`Card sent successfully to ${room.title}.`, true);
                    resolve();  // resolve the promise without returning any data
                })
                .catch((error) => {
                    sendAlert(`Failed to send card to ${room.title}! ${error}`, false);
                    console.error(`Failed to send card to ${room.title}! ${error}`);
                    resolve();  // resolve the promise without returning any data
                })
        );
    }

    const handleSubmit = async (event) => {
        event.preventDefault();         // Prevent default form submission

        // disable the submit button while cards are being sent        
        setHideSubmit(true);

        console.table(selected);

        // send each card individually but asynchronously
        const promises = selected.map(async (room) => sendOneCard(room, card));

        // wait for all the cards to be sent successfully or fail
        await Promise.all(promises);

        // reenable the submit button now that cards have been sent
        setHideSubmit(false);
    };

    // We *control* the selection of the typeahead box in order to enable
    // features like initializing the selection box with some values or
    // only allowing a certain number of rooms to be selected.
    // The argument to this function is an array, so it can be checked
    // for length to limit the number of selected rooms.
    const handleSelection = (mySelections) => {
        setSelected(mySelections);
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
                        multiple
                        id="room-selector"      // id is required for typeahead
                        options={roomList}
                        placeholder="Choose a room or person (start typing)..."
                        labelKey="title"
                        // minLength={1}           // characters typed before displaying dropdown
                        selected={selected}     // control the selected option
                        onChange={handleSelection} // triggered when an option is selected
                        clearButton
                    />
                </Form.Group>
                <Button
                    variant={validJson && selected.length ? "outline-primary" : "outline-secondary"}
                    size="lg"
                    type="submit"
                    className="mt-3"
                    disabled={!validJson || !selected.length || hideSubmit}>
                    {
                        hideSubmit ? (
                            <Spinner animation="border" role="status" aria-hidden="true" />
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
