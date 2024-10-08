import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import JsonForm from './components/JsonForm/JsonForm';
import Navbar from './components/Navbar/Navbar';

function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // State to store the avatar URL, starting with a default value
  const [avatarUrl, setAvatarUrl] = useState('');
  
  // useEffect to extract the query parameter on component mount
  useEffect(() => {
    // Get the current URL query parameters
    const queryParams = new URLSearchParams(window.location.search);
    
    // Check if `avatarUrl` exists in the URL and update the state if it does
    const urlAvatar = queryParams.get('avatarUrl');
    if (urlAvatar) {
      setAvatarUrl(urlAvatar);
      
      setIsAuthenticated(true);

      // Use history.replaceState to update the URL without reloading
      window.history.replaceState({}, '', `${window.location.pathname}`);
    }
  }, []); // Empty dependency array ensures this effect only runs once on mount


  return (
    <div>
      {/* Navbar inside a Container */}
      <Container>
        {/* Navbar Component */}
        <Navbar isAuthenticated={isAuthenticated} avatarUrl={avatarUrl}/>
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