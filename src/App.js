import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import JsonForm from './components/JsonForm/JsonForm';
import Navbar from './components/Navbar/Navbar';

function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // State to store the avatar URL, starting with a default value
  const [avatarUrl, setAvatarUrl] = useState('');
  const [nickName, setNickName] = useState('');

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


  return (
    <div>
      {/* Navbar inside a Container */}
      <Container>
        {/* Navbar Component */}
        <Navbar isAuthenticated={isAuthenticated} avatarUrl={avatarUrl} nickName={nickName} />
      </Container>

      {/* Main Container */}
      <Container className="mt-4">
        <Row className="justify-content-md-center">
          <Col md="8">
            <h1>Welcome to Webex Blaster</h1>
            This is the app that will send Adaptive Cards in Webex on your behalf.
            <hr width="100%" size="4" color="blue"></hr>
            {/* Form Component */}
            <JsonForm isAuthenticated={isAuthenticated} />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;