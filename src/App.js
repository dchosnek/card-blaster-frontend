import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import JsonForm from './components/JsonForm/JsonForm';
import Navbar from './components/Navbar/Navbar';

function App() {

  const avatarUrl = 'https://i.pravatar.cc/50';

  return (
    <div>
      {/* Navbar inside a Container */}
      <Container>
        {/* <Navbar bg="dark" variant="dark" className="mt-3 rounded">
          <Navbar.Brand href="#home">Webex Blaster</Navbar.Brand>
        </Navbar> */}
        <Navbar avatarUrl={avatarUrl} />
      </Container>
      
      {/* Main Container */}
      <Container className="mt-4">
        <Row className="justify-content-md-center">
          <Col md="8">
            <h1>Welcome to Webex Blaster</h1>
            This is the app that will send Adaptive Cards in Webex on your behalf.
            <hr width="100%" size="4" color="blue"></hr>
            {/* Form Component */}
            <JsonForm />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;