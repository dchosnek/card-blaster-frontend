import React, { useEffect, useState } from 'react';
import { Alert, Button, Col, Container, Modal, ModalBody, ModalHeader, ModalTitle, Row, Table } from 'react-bootstrap';
import { BoxArrowUpRight, Copy } from 'react-bootstrap-icons';
import ImageUpload from '../ImageUpload';

function ImageTable({ show, setShow, sendAlert }) {

    const [imageList, setImageList] = useState([]);

    // change the state of the the visibility of the modal
    const handleClose = () => setShow(false);

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

    // open a link in a new window
    const openNewTab = (link) => {
        window.open(link, "_blank");
    }

    // copy link to clipboard
    const copyToClipboard = (link) => {
        navigator.clipboard.writeText(link);
    }

    // function to retrieve a list of uploaded images from API
    const fetchImages = () => {
        fetch('api/v1/images', {
            credentials: 'include',
        })
            .then((response) => {
                if (response.status === 200) {
                    return response.json();
                } else {
                    sendAlert('Error attempting to get list of images. Try refreshing your browser.', false);
                    return [];
                }
            })
            .then((mylist) => {
                setImageList(mylist);
            });
    };

    // load images from backend database, but only when the modal is shown
    useEffect(() => {
        if (show) {
            fetchImages();
        }
    }, [show]);

    return (
        <Modal size="xl" show={show} onHide={handleClose}>
            <ModalHeader closeButton>
                <ModalTitle>Your uploaded images</ModalTitle>
            </ModalHeader>
            <ModalBody>
                <Container>
                    <Row>
                        <Alert
                            variant="info"
                            dismissible="true"
                            show={!imageList.length}
                            >When building cards, any images you include in that card must have a <b>public</b> URL. 
                            Card Blaster enables you to upload your images and provides you with a public URL for each
                            image. You can then use that public URL in the adaptive card designer.
                        </Alert>
                    </Row>
                    <Row className="align-items-center d-flex">
                        <Col className="text-wrap d-flex align-items-center">
                            <div><p>To upload images, use the button to the right. Images can be no larger than <b>10MB</b>.</p>
                                <p><b>Uploaded images will be publicly visible on the internet to anyone with the link! Do not upload confidential information!</b></p></div>
                        </Col>
                        <Col xs="auto" className="d-flex">
                            <ImageUpload sendAlert={sendAlert} fetchImages={fetchImages} />
                        </Col>
                    </Row>
                    <Row>
                        <Table striped hover className="mt-4" hidden={!imageList.length}>
                            <thead>
                                <tr>
                                    <th>Timestamp</th>
                                    <th>Filename</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {imageList.map((image, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{formatDate(image.timestamp)}</td>
                                            <td>{image.filename}</td>
                                            <td>
                                                <Button
                                                    className="me-2"    // padding
                                                    variant="outline-secondary"
                                                    onClick={() => openNewTab(image.link)}
                                                    size="sm">
                                                    <BoxArrowUpRight />
                                                </Button>
                                                <Button
                                                    variant="outline-secondary"
                                                    onClick={() => copyToClipboard(image.link)}
                                                    size="sm">
                                                    <Copy />
                                                </Button>
                                            </td>
                                        </tr>)
                                })}
                            </tbody>
                        </Table>
                    </Row>
                </ Container>
            </ModalBody>
        </Modal>
    );
}

export default ImageTable;