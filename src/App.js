import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import JsonForm from './components/JsonForm/JsonForm';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import ActivityTable from './components/ActivityTable/ActivityTable';

function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // State to store the avatar URL, starting with a default value
  const [avatarUrl, setAvatarUrl] = useState('');
  const [nickName, setNickName] = useState('');
  const [roomList, setRoomList] = useState([]);
  const [showRecentActivity, setShowRecentActivity] = useState(false);

  // get list of rooms the user is currently in
  const fetchRooms = async () => {
    try {
      const response = await fetch('/rooms', { credentials: 'include' });
      const result = await response.json();
      setRoomList(result);
    } catch (error) {
      console.error('Error fetching groups:', error);
    }
  };

  // retrieve session data on page load
  useEffect(() => {
    fetch('/status', {
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
        }
      })
      .catch((error) => console.error('Fetch error:', error));
  }, []);

  // retrieve list of groups when authenticated
  useEffect(() => {
    if (isAuthenticated) { fetchRooms(); }
  }, [isAuthenticated]);


  return (
    <div>
      {/* Navbar inside a Container */}
      <Container>
        {/* Navbar Component */}
        <Navbar isAuthenticated={isAuthenticated} avatarUrl={avatarUrl} nickName={nickName} setShowRecentActivity={setShowRecentActivity} />
      </Container>

      {/* Main Container */}
      <Container className="mt-4">
        <Row className="justify-content-md-center">
          <Col md="8">
            {
              isAuthenticated ? 
                <div>
                  <h1>Send a card</h1>
                  <JsonForm roomList={roomList} />
                </div> : 
                
                <div>
                  <h1>Welcome to Card Blaster for Webex</h1>
                  This is the app that will send Adaptive Cards in Webex on your behalf.
                  <hr width="100%" size="4" color="blue"></hr>
                  <p>Design your card using the Webex Adaptive Card <a href="https://developer.webex.com/buttons-and-cards-designer" target="_blank" rel="noreferrer">Designer</a>. You don't have to understand the JSON that the Designer creates. You just have to copy the JSON from the Designer and paste it into this site to send the card to a person or space in Webex.</p>
                  <p>Once you've designed a card and are ready to send it, log in via the menu in the navigation bar.</p>
                </div>
            }
          </Col>
        </Row>
      </Container>
      <Container>
      <ActivityTable show={showRecentActivity} setShow={setShowRecentActivity} />
      </Container>
      {/* Footer at the bottom */}
      <Container>
        <Footer />
      </Container>
    </div>
  );
}

export default App;