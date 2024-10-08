import { Button, Form, InputGroup } from 'react-bootstrap';
import './JsonForm.css'; // Import the CSS file for additional styling


function cardForm() {

    return (
        <Form>
            <Form.Group className="mb-3" controlId="Textarea1">
                <Form.Label>Enter your adaptive card payload below. Use the Webex Adaptive Card <a href="https://developer.webex.com/buttons-and-cards-designer" target="_blank">Designer</a> to create your card.</Form.Label>
                <Form.Control
                    as="textarea"
                    rows={5}
                    placeholder="Card Payload"
                    className="form-control-monospace"
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="SearchText1">
                <Form.Label>Choose the destination space for the card.</Form.Label>
                <InputGroup>
                    <Form.Control
                        type="text"
                        placeholder="destination"
                    />
                </InputGroup>
            </Form.Group>
            <Button variant="primary" type="submit">Send</Button>
        </Form >
    );
}

export default cardForm;
