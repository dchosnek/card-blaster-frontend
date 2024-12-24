import React, { useEffect, useState } from 'react';
import { Alert, Button, Container, Form, Modal, ModalBody, ModalHeader, ModalTitle, Row, Spinner } from 'react-bootstrap';

const BotModeForm = ({ show, setShow, sendAlert, nickName }) => {

    const [botToken, setBotToken] = useState('');
    const [showSpinner, setShowSpinner] = useState(false);

    // change the state of the the visibility of the modal
    const handleClose = () => setShow(false);

    const handleSubmit = async (event) => {
        event.preventDefault();         // Prevent default form submission

        setShowSpinner(true);

        // Perform a GET to retrieve bot details
        try {
            // API will return *some* JSON either way... it will either be data
            // or a message if there is an error
            const response = await fetch(`auth/bot/${botToken}`, { credentials: 'include' });
            const result = await response.json();

            // If the response is okay, then the backend has changed this
            // session to the specified bot and we just need to refresh
            // the page... 
            // If the resposne is not okay, then display an error and
            // clean up the UI.
            if (response.ok) {
                window.location.href = `${process.env.PUBLIC_URL}`;
            } else {
                throw new Error(result.message);
            }
        } catch (error) {
            // clean up the user interface for the next time it is displayed
            setShow(false);
            setShowSpinner(false);
            setBotToken('');
            sendAlert(`Cannot switch to bot mode. ${error}`, false);
        }
    };

    return (
        <Modal size="xl" show={show} onHide={handleClose}>
            <ModalHeader closeButton>
                <ModalTitle>Switch to bot mode</ModalTitle>
            </ModalHeader>
            <ModalBody>
                <Container>
                    <Row>
                        <Alert
                            variant="info"
                        >Once in bot mode, all cards you send will be sent on behalf of that bot. To
                            send cards as <b>{nickName}</b> again, you will need to switch back to human mode from the menu.
                            You can also log out and log back in.
                        </Alert>
                    </Row>
                    <Row>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3" controlId="TextBotToken">
                                <Form.Label>Enter your bot's Webex API token.</Form.Label>
                                <Form.Control
                                    type="password"
                                    className="form-control-monospace"
                                    value={botToken} // Controlled component binding
                                    onChange={(e) => setBotToken(e.target.value)} // Update state on change
                                />
                            </Form.Group>
                            <Button
                                variant="outline-primary"
                                size="lg"
                                disabled={!botToken.length}
                                type="submit">
                                {
                                    showSpinner ? (
                                        <Spinner animation="border" role="status" aria-hidden="true" />
                                    ) : (
                                        'Submit'
                                    )
                                }
                            </Button>
                        </Form>
                    </Row>
                </ Container>
            </ModalBody>
        </Modal>
    );
};

export default BotModeForm;