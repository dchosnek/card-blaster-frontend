import React, { useEffect, useState, useRef } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import JsonForm from './components/JsonForm/JsonForm';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import ActivityTable from './components/ActivityTable/ActivityTable';
import ImageTable from './components/ImageTable';
import ToastManager from './components/ToastManager';
import BotModeForm from './components/BotModeForm/BotModeForm';

import './App.css';

function App() {

  const toastRef = useRef(); // Create a ref to access ToastManager's methods

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // State to store the avatar URL, starting with a default value
  const [avatarUrl, setAvatarUrl] = useState('');
  const [nickName, setNickName] = useState('');
  const [roomList, setRoomList] = useState([]);
  const [showRecentActivity, setShowRecentActivity] = useState(false);
  const [showUploadedImages, setShowUploadedImages] = useState(false);
  const [showBotForm, setShowBotForm] = useState(false);
  const [botMode, setBotMode] = useState(false);

  // handler shared with navbar component
  const handleLoginClick = () => {
    const loginUrl =
      process.env.NODE_ENV === 'development'
        ? 'http://localhost:3000/auth/login'
        : 'auth/login';
    window.location.href = loginUrl;
  };

  // get list of rooms the user is currently in
  const fetchRooms = async () => {
    try {
      const response = await fetch('api/v1/user/rooms', { credentials: 'include' });
      const result = await response.json();
      setRoomList(result);
    } catch (error) {
      console.error('Error fetching groups:', error);
    }
  };

  // retrieve session data on page load
  useEffect(() => {
    fetch('api/v1/user/details', {
      credentials: 'include',
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        }
        return null;
      })
      .then((data) => {
        if (data) {
          setAvatarUrl(data.avatarUrl);
          setIsAuthenticated(data.isAuthenticated);
          setNickName(data.nickName);
          setBotMode(data.isBot);
        }
      })
      .catch((error) => console.error('Fetch error:', error));
  }, []);

  // retrieve list of groups when authenticated
  useEffect(() => {
    if (isAuthenticated) { fetchRooms(); }
  }, [isAuthenticated]);

  return (
    <div className="d-flex flex-column min-vh-100">
      {/* Navbar inside a Container */}
      <Container>
        {/* Navbar Component */}
        <Navbar 
          isAuthenticated={isAuthenticated} 
          avatarUrl={avatarUrl} 
          nickName={nickName} 
          setShowRecentActivity={setShowRecentActivity} 
          setShowUploadedImages={setShowUploadedImages}
          setShowBotForm={setShowBotForm} 
          handleLoginClick={handleLoginClick}
          botMode={botMode} />
      </Container>

      {/* Main Container */}
      <Container className="flex-grow-1 mt-4">
        <Row className="justify-content-md-center">
          <Col md="8">
            {
              isAuthenticated ?
                <div>
                  <h1>Send a card</h1>
                  <JsonForm roomList={roomList} sendAlert={(msg,success) => toastRef.current.addToast(msg,success)}/>
                </div> :

                <div>
                  <h1>Welcome to Card Blaster for Webex</h1>
                  This is the app that will send Adaptive Cards in Webex on your behalf.
                  <hr width="100%" size="4" color="blue"></hr>

                  <Row><Col>
                    <Card className="h-100">
                      <Card.Header className="muted-primary py-3 fw-bold">Step 1</Card.Header>
                      <Card.Body>
                        Design your card using the Webex Adaptive Card Designer.
                        You don't have to <b>understand</b> the JSON that the Designer creates.
                        You just have to paste it into Card Blaster!
                      </Card.Body>
                      <Card.Footer className="d-flex justify-content-end">
                        <Button variant="outline-primary" href="https://developer.webex.com/buttons-and-cards-designer" target="_blank">Open Designer</Button>
                      </Card.Footer>
                    </Card>
                  </Col>
                    <Col>
                      <Card className="h-100">
                        <Card.Header className="muted-primary py-3 fw-bold">Step 2</Card.Header>
                        <Card.Body>
                          Paste the contents from the Designer into this tool and choose the Webex room/space to send it to. You can send cards to individuals or group spaces!
                        </Card.Body>
                        <Card.Footer className="d-flex justify-content-end">
                          <Button variant="outline-primary" onClick={handleLoginClick}>Login to Card Blaster</Button>
                        </Card.Footer>
                      </Card>
                    </Col>
                  </Row>
                </div>
            }
          </Col>
        </Row>
      </Container>
      <Container>
        <ActivityTable show={showRecentActivity} setShow={setShowRecentActivity} sendAlert={(msg,success) => toastRef.current.addToast(msg,success)}/>
      </Container>
      <Container>
        <ImageTable show={showUploadedImages} setShow={setShowUploadedImages} sendAlert={(msg,success) => toastRef.current.addToast(msg,success)}/>
      </Container>
      <Container>
        <BotModeForm show={showBotForm} setShow={setShowBotForm} nickName={nickName} sendAlert={(msg,success) => toastRef.current.addToast(msg,success)}/>
      </Container>
      <Container>
      <ToastManager ref={toastRef} />
      </Container>
      {/* Footer at the bottom */}
      <Container>
        <Footer />
      </Container>
    </div>
  );
}

export default App;