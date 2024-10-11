import React from 'react';
import { Container } from 'react-bootstrap';
import './Footer.css';

function Footer() {
  return (
    <Container>
      <footer className="footer bg-dark text-white mb-1 rounded px-4 d-flex flex-grow-1">
        <Container className="d-flex justify-content-center">
          Written and maintained by Doron Chosnek
        </Container>
      </footer>
    </Container>
  );
}

export default Footer;